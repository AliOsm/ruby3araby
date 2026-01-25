"use client";

import { DefaultRubyVM } from "@ruby/wasm-wasi/dist/browser";
import type { RubyVM } from "@ruby/wasm-wasi";

/**
 * Result of executing Ruby code
 */
export interface ExecutionResult {
  output: string;
  error?: string;
}

/**
 * Result of syntax checking
 */
export interface SyntaxCheckResult {
  valid: boolean;
  error?: {
    message: string;
    line: number;
    column: number;
  };
}

// Cache name and WASM URL constants
const WASM_CACHE_NAME = "ruby3araby-wasm-cache-v1";
const WASM_URL =
  "https://cdn.jsdelivr.net/npm/@ruby/3.4-wasm-wasi@2.7.1/dist/ruby+stdlib.wasm";

/**
 * Fetch the WASM module with caching support
 * Uses the Cache API to store the WASM binary for faster subsequent loads
 */
async function fetchWasmWithCache(): Promise<Response> {
  // Check if Cache API is available
  if (typeof caches === "undefined") {
    // Fall back to regular fetch if Cache API is not available
    return fetch(WASM_URL);
  }

  try {
    // Try to open the cache
    const cache = await caches.open(WASM_CACHE_NAME);

    // Check if we have a cached response
    const cachedResponse = await cache.match(WASM_URL);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fetch from network
    const networkResponse = await fetch(WASM_URL);

    if (networkResponse.ok) {
      // Clone the response before caching (response can only be consumed once)
      cache.put(WASM_URL, networkResponse.clone());
    }

    return networkResponse;
  } catch {
    // If caching fails, fall back to regular fetch
    return fetch(WASM_URL);
  }
}

/**
 * RubyRunner service class for executing Ruby code in the browser via ruby.wasm
 *
 * Usage:
 *   const runner = RubyRunner.getInstance();
 *   await runner.initialize();
 *   const result = await runner.executeCode('puts "Hello"');
 *
 * Features:
 *   - Lazy loading: WASM is only loaded when initialize() is called
 *   - Caching: WASM binary is cached using the Cache API for faster subsequent loads
 *   - Singleton: Only one instance is created and shared across the application
 */
export class RubyRunner {
  private static instance: RubyRunner | null = null;
  private vm: RubyVM | null = null;
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  private constructor() {}

  /**
   * Get the singleton instance of RubyRunner
   */
  static getInstance(): RubyRunner {
    if (!RubyRunner.instance) {
      RubyRunner.instance = new RubyRunner();
    }
    return RubyRunner.instance;
  }

  /**
   * Check if the runner is initialized
   */
  get initialized(): boolean {
    return this.isInitialized;
  }

  /**
   * Initialize the Ruby VM by loading the WASM module
   * This is idempotent - calling multiple times is safe
   * The WASM binary is cached using Cache API for faster subsequent loads
   */
  async initialize(): Promise<void> {
    // Return existing promise if initialization is in progress
    if (this.initPromise) {
      return this.initPromise;
    }

    // Return immediately if already initialized
    if (this.isInitialized) {
      return;
    }

    this.initPromise = this.doInitialize();
    return this.initPromise;
  }

  private async doInitialize(): Promise<void> {
    try {
      // Fetch the Ruby WASM module with caching
      const response = await fetchWasmWithCache();

      if (!response.ok) {
        throw new Error(`Failed to fetch Ruby WASM: ${response.statusText}`);
      }

      // Compile the WASM module
      const wasmModule = await WebAssembly.compileStreaming(response);

      // Create the Ruby VM with console output disabled (we'll capture it ourselves)
      const { vm } = await DefaultRubyVM(wasmModule, {
        consolePrint: false,
      });

      this.vm = vm;
      this.isInitialized = true;
    } catch (err) {
      this.initPromise = null;
      throw err;
    }
  }

  /**
   * Execute Ruby code and return the output
   *
   * @param code - The Ruby code to execute
   * @param input - Optional simulated input for gets calls (newline-separated values)
   * @param timeoutMs - Timeout in milliseconds (default: 60000)
   * @returns ExecutionResult with output and optional error
   */
  async executeCode(
    code: string,
    input?: string,
    timeoutMs: number = 60000
  ): Promise<ExecutionResult> {
    if (!this.isInitialized || !this.vm) {
      throw new Error(
        "RubyRunner not initialized. Call initialize() first."
      );
    }

    // Capture vm reference to ensure it's not null within the promise
    const vm = this.vm;

    return new Promise<ExecutionResult>((resolve) => {
      // Set up timeout
      const timeoutId = setTimeout(() => {
        resolve({
          output: "",
          error: "Execution timed out after 60 seconds. Your code may have an infinite loop.",
        });
      }, timeoutMs);

      try {
        // Prepare input lines for gets simulation
        const inputLines = input ? input.split("\n") : [];
        const inputLinesJson = JSON.stringify(inputLines);

        // Build the wrapper code that:
        // 1. Sets up output capture
        // 2. Sets up input simulation for gets
        // 3. Executes the user code
        // 4. Returns captured output
        const wrapperCode = `
          require 'js'
          require 'stringio'

          # Capture output
          __output = StringIO.new
          __original_stdout = $stdout
          __original_stderr = $stderr
          $stdout = __output
          $stderr = __output

          # Set up input simulation
          __input_lines = ${inputLinesJson}
          __input_index = 0

          # Override gets to use simulated input
          define_method(:gets) do
            if __input_index < __input_lines.length
              line = __input_lines[__input_index]
              __input_index += 1
              line + "\\n"
            else
              nil
            end
          end

          # Override Kernel.gets as well
          module Kernel
            alias_method :__original_gets, :gets rescue nil
            def gets
              if $__input_lines && $__input_index < $__input_lines.length
                line = $__input_lines[$__input_index]
                $__input_index += 1
                line + "\\n"
              else
                nil
              end
            end
          end

          $__input_lines = __input_lines
          $__input_index = __input_index

          begin
            ${this.escapeRubyCode(code)}
          rescue => e
            $stderr.puts "\\n\#{e.class}: \#{e.message}"
            e.backtrace.first(5).each { |line| $stderr.puts "  \#{line}" }
          ensure
            $stdout = __original_stdout
            $stderr = __original_stderr
          end

          __output.string
        `;

        // Execute the code
        const result = vm.eval(wrapperCode);
        const output = result.toString();

        clearTimeout(timeoutId);
        resolve({ output });
      } catch (err) {
        clearTimeout(timeoutId);
        resolve({
          output: "",
          error: this.formatError(err),
        });
      }
    });
  }

  /**
   * Check Ruby code for syntax errors without executing it
   * Uses Ruby's parser to validate the code
   *
   * @param code - The Ruby code to check
   * @returns SyntaxCheckResult with validity and error details if invalid
   */
  checkSyntax(code: string): SyntaxCheckResult {
    if (!this.isInitialized || !this.vm) {
      // Can't check syntax without VM - assume valid
      return { valid: true };
    }

    try {
      // Use RubyVM::InstructionSequence.compile to parse without executing
      // This will throw a SyntaxError if the code is invalid
      const checkCode = `
        begin
          RubyVM::InstructionSequence.compile(${JSON.stringify(code)}, "<code>")
          "valid"
        rescue SyntaxError => e
          # Parse the error message to extract line and column
          msg = e.message
          # Format: "<code>:LINE: syntax error, ..."
          if msg =~ /<code>:(\\d+):/
            line = $1.to_i
            # Remove the file prefix from the message
            clean_msg = msg.sub(/<code>:\\d+:\\s*/, "")
            "error:#{line}:1:#{clean_msg}"
          else
            "error:1:1:#{msg}"
          end
        end
      `;

      const result = this.vm.eval(checkCode).toString();

      if (result === "valid") {
        return { valid: true };
      }

      // Parse error result: "error:LINE:COLUMN:MESSAGE"
      // Use [\s\S] instead of . with /s flag for ES5 compatibility
      const match = result.match(/^error:(\d+):(\d+):([\s\S]+)$/);
      if (match) {
        return {
          valid: false,
          error: {
            message: match[3].trim(),
            line: parseInt(match[1], 10),
            column: parseInt(match[2], 10),
          },
        };
      }

      return { valid: true };
    } catch {
      // If checking fails for any reason, assume valid
      // (better to not show false positives)
      return { valid: true };
    }
  }

  /**
   * Escape Ruby code for embedding in a heredoc-style string
   */
  private escapeRubyCode(code: string): string {
    // We don't need to escape because we're not using string interpolation
    // The code is directly embedded in the wrapper
    return code;
  }

  /**
   * Format an error into a user-friendly message
   */
  private formatError(err: unknown): string {
    if (err instanceof Error) {
      const message = err.message;

      // Handle common Ruby errors with Arabic-friendly messages
      if (message.includes("SyntaxError")) {
        return `Syntax Error: ${message}`;
      }
      if (message.includes("NameError")) {
        return `Name Error: ${message}`;
      }
      if (message.includes("TypeError")) {
        return `Type Error: ${message}`;
      }
      if (message.includes("NoMethodError")) {
        return `No Method Error: ${message}`;
      }
      if (message.includes("ArgumentError")) {
        return `Argument Error: ${message}`;
      }
      if (message.includes("ZeroDivisionError")) {
        return `Division by Zero Error: ${message}`;
      }
      if (message.includes("RuntimeError")) {
        return `Runtime Error: ${message}`;
      }

      return message;
    }

    return String(err);
  }

  /**
   * Reset the Ruby VM state
   * Note: This creates a new VM instance which can be slow
   */
  async reset(): Promise<void> {
    this.isInitialized = false;
    this.initPromise = null;
    this.vm = null;
    await this.initialize();
  }

  /**
   * Preload the Ruby WASM binary without blocking
   * Reduces first-run latency by starting fetch early
   */
  preload(): void {
    if (this.initPromise || this.isInitialized) {
      return;
    }
    this.initialize().catch(() => {
      // Silently ignore - will retry on actual use
    });
  }
}

/**
 * Convenience function to get the RubyRunner singleton
 */
export function getRubyRunner(): RubyRunner {
  return RubyRunner.getInstance();
}

/**
 * Preload the Ruby WASM binary without blocking
 * Call early to reduce first-run latency
 */
export function preloadRubyWasm(): void {
  getRubyRunner().preload();
}
