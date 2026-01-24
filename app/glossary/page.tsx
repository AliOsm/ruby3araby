"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import glossaryData from "@/content/glossary.json";

interface GlossaryTerm {
  id: string;
  english: string;
  arabic: string;
  definition: string;
}

type SortOrder = "arabic" | "english";

/**
 * Glossary page displaying Arabic programming terms with definitions
 * Features:
 * - Alphabetical organization with Arabic/English toggle
 * - Search/filter functionality
 * - Responsive grid layout
 */
export default function GlossaryPage() {
  const [sortOrder, setSortOrder] = useState<SortOrder>("arabic");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      setTimeout(() => setMounted(true), 0);
    }
  }, []);

  const terms: GlossaryTerm[] = glossaryData.terms;

  // Filter terms based on search query
  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return terms;
    const query = searchQuery.toLowerCase();
    return terms.filter(
      (term) =>
        term.english.toLowerCase().includes(query) ||
        term.arabic.includes(searchQuery) ||
        term.definition.includes(searchQuery)
    );
  }, [terms, searchQuery]);

  // Sort and group terms by first letter
  const groupedTerms = useMemo(() => {
    const sorted = [...filteredTerms].sort((a, b) => {
      if (sortOrder === "arabic") {
        return a.arabic.localeCompare(b.arabic, "ar");
      } else {
        return a.english.localeCompare(b.english, "en");
      }
    });

    // Group by first letter
    const groups: Record<string, GlossaryTerm[]> = {};
    for (const term of sorted) {
      const firstChar =
        sortOrder === "arabic"
          ? term.arabic.charAt(0)
          : term.english.charAt(0).toUpperCase();
      if (!groups[firstChar]) {
        groups[firstChar] = [];
      }
      groups[firstChar].push(term);
    }

    return groups;
  }, [filteredTerms, sortOrder]);

  // Get sorted letter keys
  const sortedLetters = useMemo(() => {
    const letters = Object.keys(groupedTerms);
    if (sortOrder === "arabic") {
      return letters.sort((a, b) => a.localeCompare(b, "ar"));
    }
    return letters.sort((a, b) => a.localeCompare(b, "en"));
  }, [groupedTerms, sortOrder]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-ruby-primary">
                قاموس المصطلحات البرمجية
              </h1>
              <p className="mt-2 text-gray-400">
                مصطلحات البرمجة بالعربية والإنجليزية مع شرح مفصل
              </p>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
            >
              <svg
                className="h-5 w-5 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن مصطلح..."
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 pr-10 text-white placeholder-gray-500 focus:border-ruby-primary focus:outline-none focus:ring-1 focus:ring-ruby-primary"
              />
              <svg
                className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Sort Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">ترتيب حسب:</span>
              <div className="flex rounded-lg bg-gray-800 p-1">
                <button
                  onClick={() => setSortOrder("arabic")}
                  className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                    sortOrder === "arabic"
                      ? "bg-ruby-primary text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  عربي
                </button>
                <button
                  onClick={() => setSortOrder("english")}
                  className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                    sortOrder === "english"
                      ? "bg-ruby-primary text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          {mounted && (
            <p className="mt-3 text-sm text-gray-500">
              {filteredTerms.length === terms.length
                ? `${terms.length} مصطلح`
                : `${filteredTerms.length} نتيجة من ${terms.length} مصطلح`}
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {!mounted ? (
          // Loading skeleton
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="mb-4 h-8 w-16 rounded bg-gray-800" />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-32 rounded-lg bg-gray-800" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : filteredTerms.length === 0 ? (
          // No results
          <div className="py-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-300">
              لم يتم العثور على نتائج
            </h3>
            <p className="mt-2 text-gray-500">
              جرب البحث بكلمات مختلفة أو تصفح جميع المصطلحات
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 rounded-lg bg-ruby-primary px-4 py-2 text-white transition-colors hover:bg-ruby-secondary"
            >
              عرض جميع المصطلحات
            </button>
          </div>
        ) : (
          // Grouped terms
          <div className="space-y-8">
            {sortedLetters.map((letter) => (
              <section key={letter}>
                {/* Letter header */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ruby-primary text-xl font-bold text-white">
                    {letter}
                  </span>
                  <div className="h-px flex-1 bg-gray-800" />
                  <span className="text-sm text-gray-500">
                    {groupedTerms[letter].length} مصطلح
                  </span>
                </div>

                {/* Terms grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {groupedTerms[letter].map((term) => (
                    <TermCard key={term.id} term={term} sortOrder={sortOrder} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        <p>
          المصطلحات مستوحاة من{" "}
          <a
            href="https://wiki.hsoub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ruby-primary hover:underline"
          >
            موسوعة حسوب
          </a>
        </p>
      </footer>
    </div>
  );
}

interface TermCardProps {
  term: GlossaryTerm;
  sortOrder: SortOrder;
}

function TermCard({ term, sortOrder }: TermCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group rounded-lg border border-gray-800 bg-gray-900/50 p-4 transition-colors hover:border-ruby-primary/50 hover:bg-gray-900">
      {/* Term names */}
      <div className="mb-3">
        {sortOrder === "arabic" ? (
          <>
            <h3 className="text-lg font-bold text-ruby-primary">{term.arabic}</h3>
            <p className="text-sm text-gray-400" dir="ltr">
              {term.english}
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold text-ruby-primary" dir="ltr">
              {term.english}
            </h3>
            <p className="text-sm text-gray-400">{term.arabic}</p>
          </>
        )}
      </div>

      {/* Definition */}
      <p
        className={`text-sm text-gray-300 leading-relaxed ${
          !isExpanded && "line-clamp-3"
        }`}
      >
        {term.definition}
      </p>

      {/* Expand button for long definitions */}
      {term.definition.length > 100 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-xs text-ruby-primary hover:text-ruby-secondary"
        >
          {isExpanded ? "عرض أقل" : "عرض المزيد"}
        </button>
      )}
    </div>
  );
}
