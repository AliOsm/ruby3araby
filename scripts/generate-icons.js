#!/usr/bin/env node
/**
 * Generate PWA icons from the source SVG file
 * Run: node scripts/generate-icons.js
 */

const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

const SOURCE_SVG = path.join(__dirname, '../app/icon.svg');
const OUTPUT_DIR = path.join(__dirname, '../public/icons');

const ICONS = [
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-512x512.png', size: 512 },
  { name: 'icon-maskable-512x512.png', size: 512, maskable: true },
  { name: 'apple-touch-icon.png', size: 180 },
];

// Create a simplified Ruby logo SVG without inkscape namespaces
const CLEAN_RUBY_SVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#CC0000;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#8B0000;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#CC0000;stop-opacity:1" />
    </linearGradient>
  </defs>
  <g transform="translate(0, 0)">
    <!-- Ruby gem shape -->
    <polygon points="16,2 28,10 28,22 16,30 4,22 4,10" fill="url(#grad1)" />
    <polygon points="16,2 4,10 16,16" fill="#FF8888" />
    <polygon points="16,2 28,10 16,16" fill="#FF6666" />
    <polygon points="28,10 28,22 16,16" fill="url(#grad2)" />
    <polygon points="4,10 4,22 16,16" fill="#AA0000" />
    <polygon points="4,22 16,30 16,16" fill="#880000" />
    <polygon points="28,22 16,30 16,16" fill="#990000" />
    <!-- Center highlight -->
    <circle cx="16" cy="14" r="3" fill="#FFFFFF" opacity="0.3" />
  </g>
</svg>`;

function generateIcon(size, maskable = false) {
  if (maskable) {
    // For maskable icons, add background with padding
    const padding = Math.floor(size * 0.15);
    const innerSize = size - padding * 2;
    const offset = padding;

    const maskableSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#dc2743"/>
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#CC0000;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#8B0000;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#CC0000;stop-opacity:1" />
    </linearGradient>
  </defs>
  <g transform="translate(${offset}, ${offset})">
    <svg width="${innerSize}" height="${innerSize}" viewBox="0 0 32 32">
      <polygon points="16,2 28,10 28,22 16,30 4,22 4,10" fill="url(#grad1)" />
      <polygon points="16,2 4,10 16,16" fill="#FF8888" />
      <polygon points="16,2 28,10 16,16" fill="#FF6666" />
      <polygon points="28,10 28,22 16,16" fill="url(#grad2)" />
      <polygon points="4,10 4,22 16,16" fill="#AA0000" />
      <polygon points="4,22 16,30 16,16" fill="#880000" />
      <polygon points="28,22 16,30 16,16" fill="#990000" />
      <circle cx="16" cy="14" r="3" fill="#FFFFFF" opacity="0.3" />
    </svg>
  </g>
</svg>`;

    const resvg = new Resvg(maskableSvg, {
      fitTo: { mode: 'width', value: size },
    });
    return resvg.render().asPng();
  }

  const resvg = new Resvg(CLEAN_RUBY_SVG, {
    fitTo: { mode: 'width', value: size },
  });
  return resvg.render().asPng();
}

async function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const icon of ICONS) {
    try {
      const pngBuffer = generateIcon(icon.size, icon.maskable);
      fs.writeFileSync(path.join(OUTPUT_DIR, icon.name), pngBuffer);
      console.log(`✓ Generated ${icon.name} (${icon.size}x${icon.size})`);
    } catch (error) {
      console.error(`✗ Failed to generate ${icon.name}:`, error.message);
    }
  }

  console.log('\nDone! Icons saved to public/icons/');
}

main().catch(console.error);
