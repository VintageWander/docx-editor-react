# docx-editor-react

A React WYSIWYG editor for `.docx` files. 

## Install

Consume it straight from GitHub — no published npm release needed:

```bash
bun add https://github.com/VintageWander/docx-editor-react
```

## Use it

```tsx
import { DocxEditor } from 'docx-editor-react';
import 'docx-editor-react/styles.css';

export function App() {
  return <DocxEditor documentBuffer={buffer} />;
}
```

### Entry points

| Import | What it is |
| --- | --- |
| `docx-editor-react` | `DocxEditor`, `renderAsync`, locale provider, document factories |
| `docx-editor-react/ui` | lower-level UI primitives (toolbar, pickers, rulers) |
| `docx-editor-react/dialogs` | standalone dialog components |
| `docx-editor-react/hooks` | editor hooks |
| `docx-editor-react/plugin-api` | plugin host + plugin authoring API |
| `docx-editor-react/styles.css` | the single stylesheet (import once) |

## Develop

```bash
bun install        # installs deps and runs the prepare build
bun run typecheck  # tsc --noEmit
bun run build      # tsup (CJS + ESM + d.ts) then postcss -> dist/styles.css
```

Source layout (everything resolves through the `@/*` → `src/*` alias):

```
src/core   framework-agnostic parsing / layout / rendering engine
src/i18n   UI locale strings + JSON locale data
src/react  the React adapter (the thing you import)
```
