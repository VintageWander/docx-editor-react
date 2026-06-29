import path from 'path';
import { fileURLToPath } from 'url';

const __configDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * Single Tailwind config for the flattened package. Shared color/theme palette
 * lives in the core preset (single source of truth); this config adds the
 * library content glob + `.ep-root` scoping so utilities never clash with the
 * host app's CSS.
 * @type {import('tailwindcss').Config}
 */
export default {
  presets: [require('./tailwind-preset.cjs')],
  important: '.ep-root',
  content: [path.join(__configDir, 'src/**/*.{ts,tsx}')],
};
