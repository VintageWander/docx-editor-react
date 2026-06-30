import { defineConfig } from 'tsup';

// Single build for the flattened package. The former core + i18n sources are
// bundled in (imported via the `@/*` alias); only React, ReactDOM and the
// ProseMirror peers stay external. Anything listed in package.json
// `dependencies` / `peerDependencies` is auto-externalized by tsup.
export default defineConfig({
  entry: {
    index: 'src/react/index.ts',
    ui: 'src/react/ui.ts',
    dialogs: 'src/react/components/dialogs/index.ts',
    hooks: 'src/react/hooks/index.ts',
    'plugin-api': 'src/react/plugin-api/index.ts',
    styles: 'src/react/styles/index.ts',
    headless: 'src/core/headless.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: false,
  clean: true,
  treeshake: true,
  minify: true,
  external: [
    'react',
    'react-dom',
    'prosemirror-commands',
    'prosemirror-dropcursor',
    'prosemirror-history',
    'prosemirror-keymap',
    'prosemirror-model',
    'prosemirror-state',
    'prosemirror-tables',
    'prosemirror-transform',
    'prosemirror-view',
  ],
  injectStyle: false,
});
