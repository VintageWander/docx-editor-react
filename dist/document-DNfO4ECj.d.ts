import { T as TextFormatting, d as ParagraphFormatting, y as TableFormatting, z as TableRowFormatting, A as TableCellFormatting, D as DocumentBody, N as NumberingDefinitions, F as Footnote, E as Endnote, t as HeaderFooter } from './run-DQbevRIu.js';

/**
 * Styles, Theme, Font Table, Relationships & Media Types
 *
 * Types for document-level definitions that don't form the content tree.
 */

/**
 * Style type
 */
type StyleType = 'paragraph' | 'character' | 'numbering' | 'table';
/**
 * Style definition from `styles.xml` — a named, reusable bundle of
 * paragraph and/or character formatting. Word's "Heading 1", "Normal",
 * "Title", and "List Bullet" are styles; user-defined styles look the
 * same. `basedOn` chains styles for inheritance; `link` pairs a paragraph
 * style with a matching character style.
 *
 * See ECMA-376 §17.7.4.
 */
interface Style {
    /** Style ID */
    styleId: string;
    /** Style type */
    type: StyleType;
    /** Display name */
    name?: string;
    /** Based on style ID */
    basedOn?: string;
    /** Next style after Enter (for paragraph styles) */
    next?: string;
    /** Linked style (paragraph/character pair) */
    link?: string;
    /** UI sort priority */
    uiPriority?: number;
    /** Hidden from UI */
    hidden?: boolean;
    /** Semi-hidden from UI */
    semiHidden?: boolean;
    /** Unhide when used */
    unhideWhenUsed?: boolean;
    /** Quick format in gallery */
    qFormat?: boolean;
    /** Is default style */
    default?: boolean;
    /** Personal style (custom) */
    personal?: boolean;
    /** Paragraph properties (for paragraph/table styles) */
    pPr?: ParagraphFormatting;
    /** Run properties */
    rPr?: TextFormatting;
    /** Table properties (for table styles) */
    tblPr?: TableFormatting;
    /** Table row properties */
    trPr?: TableRowFormatting;
    /** Table cell properties */
    tcPr?: TableCellFormatting;
    /** Conditional table style parts */
    tblStylePr?: Array<{
        type: 'band1Horz' | 'band1Vert' | 'band2Horz' | 'band2Vert' | 'firstCol' | 'firstRow' | 'lastCol' | 'lastRow' | 'neCell' | 'nwCell' | 'seCell' | 'swCell';
        pPr?: ParagraphFormatting;
        rPr?: TextFormatting;
        tblPr?: TableFormatting;
        trPr?: TableRowFormatting;
        tcPr?: TableCellFormatting;
    }>;
}
/**
 * Document defaults (w:docDefaults)
 */
interface DocDefaults {
    /** Default run properties */
    rPr?: TextFormatting;
    /** Default paragraph properties */
    pPr?: ParagraphFormatting;
}
/**
 * Style definitions from styles.xml
 */
interface StyleDefinitions {
    /** Document defaults */
    docDefaults?: DocDefaults;
    /** Latent styles */
    latentStyles?: {
        defLockedState?: boolean;
        defUIPriority?: number;
        defSemiHidden?: boolean;
        defUnhideWhenUsed?: boolean;
        defQFormat?: boolean;
        count?: number;
    };
    /** Style definitions */
    styles: Style[];
}
/**
 * Theme color scheme (a:clrScheme)
 */
interface ThemeColorScheme {
    /** Dark 1 color (usually black) */
    dk1?: string;
    /** Light 1 color (usually white) */
    lt1?: string;
    /** Dark 2 color */
    dk2?: string;
    /** Light 2 color */
    lt2?: string;
    /** Accent colors 1-6 */
    accent1?: string;
    accent2?: string;
    accent3?: string;
    accent4?: string;
    accent5?: string;
    accent6?: string;
    /** Hyperlink color */
    hlink?: string;
    /** Followed hyperlink color */
    folHlink?: string;
}
/**
 * Theme font (with script variants)
 */
interface ThemeFont {
    /** Latin font */
    latin?: string;
    /** East Asian font */
    ea?: string;
    /** Complex script font */
    cs?: string;
    /** Script-specific fonts */
    fonts?: Record<string, string>;
}
/**
 * Theme font scheme (a:fontScheme)
 */
interface ThemeFontScheme {
    /** Major font (headings) */
    majorFont?: ThemeFont;
    /** Minor font (body text) */
    minorFont?: ThemeFont;
}
/**
 * Theme (from theme1.xml)
 */
interface Theme {
    /** Theme name */
    name?: string;
    /** Color scheme */
    colorScheme?: ThemeColorScheme;
    /** Font scheme */
    fontScheme?: ThemeFontScheme;
    /** Format scheme (fills, lines, effects) - simplified */
    formatScheme?: {
        name?: string;
    };
}
/**
 * Font info from fontTable.xml
 */
interface FontInfo {
    /** Font name */
    name: string;
    /** Alternate names */
    altName?: string;
    /** Panose-1 classification */
    panose1?: string;
    /** Character set */
    charset?: string;
    /** Font family type */
    family?: 'decorative' | 'modern' | 'roman' | 'script' | 'swiss' | 'auto';
    /** Pitch (fixed or variable) */
    pitch?: 'default' | 'fixed' | 'variable';
    /** Signature */
    sig?: {
        usb0?: string;
        usb1?: string;
        usb2?: string;
        usb3?: string;
        csb0?: string;
        csb1?: string;
    };
    /** Embedded regular face (`w:embedRegular`) */
    embedRegular?: FontEmbed;
    /** Embedded bold face (`w:embedBold`) */
    embedBold?: FontEmbed;
    /** Embedded italic face (`w:embedItalic`) */
    embedItalic?: FontEmbed;
    /** Embedded bold-italic face (`w:embedBoldItalic`) */
    embedBoldItalic?: FontEmbed;
}
/**
 * A single embedded font face referenced from `fontTable.xml`. The font binary
 * lives at the relationship target (an obfuscated `.odttf` under `word/fonts/`)
 * and is descrambled with `fontKey`. See `utils/fontDeobfuscation.ts`.
 */
interface FontEmbed {
    /** Relationship ID (`r:id`) resolved via `word/_rels/fontTable.xml.rels`. */
    relId: string;
    /** Obfuscation key GUID (`w:fontKey`), e.g. `{XXXXXXXX-....}`. */
    fontKey?: string;
    /** Whether the embedded face is subsetted (`w:subsetted`). */
    subsetted?: boolean;
}
/**
 * Font table from fontTable.xml
 */
interface FontTable {
    fonts: FontInfo[];
}
/**
 * Relationship type
 */
type RelationshipType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image' | 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink' | 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/header' | 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer' | 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes' | 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes' | 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles' | 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering' | 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable' | 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme' | 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings' | 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings' | 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/oleObject' | 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart' | 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/diagramData' | string;
/**
 * Relationship entry
 */
interface Relationship {
    /** Relationship ID (e.g., "rId1") */
    id: string;
    /** Relationship type URI */
    type: RelationshipType;
    /** Target path or URL */
    target: string;
    /** Target mode */
    targetMode?: 'External' | 'Internal';
}
/**
 * Relationship map (keyed by rId)
 */
type RelationshipMap = Map<string, Relationship>;
/**
 * Media file from word/media/
 */
interface MediaFile {
    /** File path in ZIP */
    path: string;
    /** Original filename */
    filename?: string;
    /** MIME type */
    mimeType: string;
    /** Binary data */
    data: ArrayBuffer;
    /** Base64 encoded data for rendering */
    base64?: string;
    /** Data URL for direct use in src attributes */
    dataUrl?: string;
}

/**
 * settings.xml parser
 *
 * Extracts document-wide settings the layout pipeline needs at render time.
 * We only read what's currently consumed; most of settings.xml (compatibility
 * flags, view state, autoformat) is irrelevant to layout.
 */
/** Document-wide settings parsed from `word/settings.xml`. */
interface DocumentSettings {
    /**
     * `w:defaultTabStop` (§17.6.13) — interval in twips between default tab
     * stops applied when a paragraph has no custom `w:tabs`. Word's default
     * if unspecified is 720 twips (0.5 inch).
     */
    defaultTabStop: number;
    /**
     * `w:defaultTableStyle` (§17.15.1.44) — the styleId applied to every
     * newly created table in this document. Distinct from the type-default
     * table style (`w:default="1"`), which is what tables inherit from when
     * they carry no `w:tblStyle`. Absent in most documents; a template author
     * sets it so inserted tables pick up the template's table look.
     */
    defaultTableStyle?: string;
    /**
     * `w:themeFontLang` (§17.15.1.88) — the language Word uses to pick the
     * concrete typeface for the *EastAsian* (`w:eastAsia`) and *complex-script*
     * (`w:bidi`) theme font slots when the theme's `<a:ea>`/`<a:cs>` typeface is
     * empty (the common case for Office's default theme). The script-specific
     * `<a:font script="…">` entries are selected by this language. Without it a
     * CJK document whose runs reference `minorEastAsia` resolves to an empty
     * font, which breaks both measurement and painting (text overflows the
     * right margin).
     */
    themeFontLang?: {
        eastAsia?: string;
        bidi?: string;
    };
}

/**
 * Comprehensive TypeScript types for full DOCX document representation
 *
 * This barrel file re-exports all types from the split modules.
 * Existing imports from './types/document' continue to work unchanged.
 *
 * Module structure:
 * - colors.ts      — Color primitives, borders, shading
 * - formatting.ts  — Text, paragraph, and table formatting properties
 * - lists.ts       — Numbering and list definitions
 * - content.ts     — Content model (runs, images, shapes, tables, paragraphs, sections)
 * - styles.ts      — Styles, theme, fonts, relationships, media
 * @packageDocumentation
 * @public
 */

/**
 * Complete DOCX package structure
 */
interface DocxPackage {
    /** Document body */
    document: DocumentBody;
    /** Style definitions */
    styles?: StyleDefinitions;
    /** Theme */
    theme?: Theme;
    /** Numbering definitions */
    numbering?: NumberingDefinitions;
    /** Document-wide settings from `word/settings.xml` */
    settings?: DocumentSettings;
    /** Font table */
    fontTable?: FontTable;
    /** Footnotes (normal notes only — separators live in `footnoteSeparators`) */
    footnotes?: Footnote[];
    /** Endnotes (normal notes only — separators live in `endnoteSeparators`) */
    endnotes?: Endnote[];
    /**
     * Separator footnotes (`w:type="separator"` / `"continuationSeparator"` /
     * `"continuationNotice"`) kept out of `footnotes` so rendering/layout only
     * sees real notes. Retained for round-trip: Word rejects a footnotes part
     * whose separator notes are missing, so the serializer re-emits these ahead
     * of the normal notes.
     */
    footnoteSeparators?: Footnote[];
    /** Separator endnotes — see `footnoteSeparators`. */
    endnoteSeparators?: Endnote[];
    /** Headers by relationship ID */
    headers?: Map<string, HeaderFooter>;
    /** Footers by relationship ID */
    footers?: Map<string, HeaderFooter>;
    /** Document relationships */
    relationships?: RelationshipMap;
    /** Media files */
    media?: Map<string, MediaFile>;
    /** Document properties */
    properties?: {
        title?: string;
        subject?: string;
        creator?: string;
        keywords?: string;
        description?: string;
        lastModifiedBy?: string;
        revision?: number;
        created?: Date;
        modified?: Date;
    };
}
/**
 * Top-level parsed DOCX document — the result of `parseDocx(buffer)`.
 *
 * Wraps the unzipped DOCX package (`document.xml`, `styles.xml`, etc.),
 * the original buffer for round-trip saves, and any template variables /
 * parse warnings detected during ingestion.
 *
 * @example
 * ```ts
 * import { parseDocx } from '@/core/headless';
 * const doc = await parseDocx(buffer);
 * console.log(doc.package.document.content.length);
 * ```
 */
interface Document {
    /** Parsed DOCX package — body, styles, numbering, theme, media, headers/footers. */
    package: DocxPackage;
    /** Original DOCX buffer. Kept for round-trip saves that preserve untouched parts. */
    originalBuffer?: ArrayBuffer;
    /** Detected docxtemplater variables (e.g. `{name}`, `{address}`). Populated when the document is recognized as a template. */
    templateVariables?: string[];
    /** Non-fatal parser diagnostics — malformed parts, unsupported features, fallbacks. */
    warnings?: string[];
}

export type { Document as D, Relationship as R, StyleDefinitions as S, Theme as T, DocxPackage as a, Style as b, StyleType as c };
