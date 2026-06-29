import * as React from 'react';
import { ReactNode, CSSProperties } from 'react';
import * as prosemirror_view from 'prosemirror-view';
import { EditorView } from 'prosemirror-view';
import * as prosemirror_state from 'prosemirror-state';
import { EditorState, Transaction } from 'prosemirror-state';
import { D as Document, T as Theme } from './document-K1bSRvse.js';
import { S as StyleInfo, A as AgentContext, P as Position, R as Range, a as AgentCommand, F as FontOption, b as PrintOptions } from './print-B1NO4dft.js';
import { R as RenderedDomContext, a as ReactSidebarItem } from './types-BAzM4Rty.js';
import { a as TextFormatting, P as ParagraphFormatting, b as SdtType, c as SdtProperties, d as SdtDataBinding, H as HeaderFooter, C as Comment } from './run-DndcHMrf.js';
import { T as Translations, a as TFunction } from './index-DHTYI3R-.js';
import { E as EditorHandle } from './types-DqtNRM-R.js';
import 'prosemirror-model';

/**
 * Create Document Utility
 *
 * Provides functions to create new documents programmatically.
 */

/**
 * Options for creating an empty document
 */
interface CreateEmptyDocumentOptions {
    /** Page width in twips (default: 12240 = 8.5 inches) */
    pageWidth?: number;
    /** Page height in twips (default: 15840 = 11 inches) */
    pageHeight?: number;
    /** Page orientation (default: 'portrait') */
    orientation?: 'portrait' | 'landscape';
    /** Top margin in twips (default: 1440 = 1 inch) */
    marginTop?: number;
    /** Bottom margin in twips (default: 1440 = 1 inch) */
    marginBottom?: number;
    /** Left margin in twips (default: 1440 = 1 inch) */
    marginLeft?: number;
    /** Right margin in twips (default: 1440 = 1 inch) */
    marginRight?: number;
    /** Initial text content (default: empty string) */
    initialText?: string;
}
/**
 * Create an empty document with a single paragraph
 *
 * @param options - Optional configuration for the document
 * @returns A new empty Document object
 *
 * @example
 * ```ts
 * // Create a blank document
 * const doc = createEmptyDocument();
 *
 * // Create with custom margins
 * const doc = createEmptyDocument({
 *   marginTop: 720,  // 0.5 inch
 *   marginBottom: 720,
 * });
 *
 * // Create with initial text
 * const doc = createEmptyDocument({
 *   initialText: 'Hello, World!'
 * });
 * ```
 */
declare function createEmptyDocument(options?: CreateEmptyDocumentOptions): Document;
/**
 * Create a document with a single paragraph containing the given text
 *
 * @param text - The text content for the document
 * @param options - Optional configuration for the document
 * @returns A new Document object with the specified text
 */
declare function createDocumentWithText(text: string, options?: Omit<CreateEmptyDocumentOptions, 'initialText'>): Document;

/**
 * Flexible input types for DOCX documents.
 *
 * Accepts any common binary format so consumers don't need to manually
 * convert before passing data to the editor or parser.
 */
/**
 * Any binary representation of a DOCX file that the editor can consume.
 *
 * - `ArrayBuffer` — from `FileReader.readAsArrayBuffer()` or `fetch().arrayBuffer()`
 * - `Uint8Array` — from Node.js `fs.readFile()` or streaming APIs
 * - `Blob` — from drag-and-drop or `<input type="file">`
 * - `File` — subclass of Blob, from `<input type="file">`
 */
type DocxInput = ArrayBuffer | Uint8Array | Blob | File;

/**
 * Declarative description of a single font face to register with the editor.
 *
 * Each entry injects one `@font-face` rule pointing at a URL. Multiple
 * entries can share `family` to register distinct weights as separate faces.
 *
 * For Google Fonts, call `loadFont(family)` directly — the `fonts` prop is
 * for fonts the consumer hosts themselves. For raw bytes already in memory
 * (DOCX-embedded fonts, user uploads), call `loadFontFromBuffer(family, buf)`.
 *
 * @public
 */
interface FontDefinition {
    /**
     * CSS `font-family` name to expose. Match the family name your documents
     * reference; the browser uses this to look up glyphs when text is rendered.
     */
    family: string;
    /**
     * URL to the font file (woff2, woff, ttf, or otf). The loader injects an
     * `@font-face` rule and lets the browser fetch on demand.
     */
    src: string;
    /**
     * CSS `font-weight` for this face. Defaults to `'normal'` (≈400). Pass a
     * number (`400`, `700`) or a CSS keyword (`'bold'`). Required when one
     * `family` registers multiple weights as separate entries.
     */
    weight?: number | string;
}

/**
 * Option shapes for `scrollToParaId(paraId, { highlight })`.
 *
 * Kept in a DOM-free module (no imports, no browser globals) so non-browser
 * consumers like `the agents add-on` can type-import them without
 * pulling `paragraphFlash`'s DOM code into their type-check surface.
 */
/**
 * Customization for the transient paragraph flash applied by
 * `scrollToParaId(paraId, { highlight })`.
 *
 * @public
 */
interface ParagraphHighlightOptions {
    /** CSS color used for the transient paragraph flash. Defaults to yellow. */
    color?: string;
    /** How long the flash remains visible before it is removed. Defaults to 1200ms. */
    durationMs?: number;
}
/**
 * Optional reveal behavior for `scrollToParaId`.
 *
 * @public
 */
interface ScrollToParaIdOptions {
    /** Flash rendered paragraph fragments after scrolling to the paragraph. */
    highlight?: ParagraphHighlightOptions;
}

/**
 * Selective Save Module
 *
 * Orchestrates selective XML patching for the save flow.
 * Serializes full document.xml, validates patch safety, builds patched XML,
 * and calls applyUpdatesToZip() to produce the final DOCX.
 *
 * Returns null on any failure, signaling the caller to fall back to full repack.
 */

interface SelectiveSaveOptions {
    /** Changed paragraph IDs to selectively patch */
    changedParaIds: Set<string>;
    /** Whether structural changes occurred (paragraph add/delete) */
    structuralChange: boolean;
    /** Whether any changes affected paragraphs without paraId */
    hasUntrackedChanges: boolean;
}

/**
 * DocumentAgent - High-level fluent API for programmatic document manipulation
 *
 * Provides a convenient interface for:
 * - Reading document content and metadata
 * - Editing text with formatting
 * - Inserting tables, images, and hyperlinks
 * - Managing template variables
 * - Exporting to DOCX buffer
 *
 * All operations are immutable - they return a new DocumentAgent instance
 * or don't modify the underlying document.
 */

/**
 * Options for inserting text
 */
interface InsertTextOptions {
    /** Text formatting */
    formatting?: TextFormatting;
}
/**
 * Options for inserting table
 */
interface InsertTableOptions {
    /** Table data (2D array of strings) */
    data?: string[][];
    /** Whether first row is a header */
    hasHeader?: boolean;
}
/**
 * Options for inserting image
 */
interface InsertImageOptions {
    /** Image width in pixels */
    width?: number;
    /** Image height in pixels */
    height?: number;
    /** Alt text for accessibility */
    alt?: string;
}
/**
 * Options for inserting hyperlink
 */
interface InsertHyperlinkOptions {
    /** Display text (overrides selected text) */
    displayText?: string;
    /** Tooltip on hover */
    tooltip?: string;
}
/**
 * Formatted text segment
 */
interface FormattedTextSegment {
    /** Text content */
    text: string;
    /** Applied formatting */
    formatting?: TextFormatting;
    /** Is part of a hyperlink */
    isHyperlink?: boolean;
    /** Hyperlink URL if applicable */
    hyperlinkUrl?: string;
}
/**
 * DocumentAgent provides a fluent API for document manipulation
 *
 * @example
 * ```ts
 * const agent = new DocumentAgent(buffer);
 *
 * // Read operations
 * const text = agent.getText();
 * const wordCount = agent.getWordCount();
 * const variables = agent.getVariables();
 *
 * // Write operations (returns new agent)
 * const newAgent = agent
 *   .insertText({ paragraphIndex: 0, offset: 0 }, 'Hello ', { formatting: { bold: true } })
 *   .applyStyle({ paragraphIndex: 0, offset: 0 }, { paragraphIndex: 0, offset: 5 }, 'Heading1');
 *
 * // Export
 * const newBuffer = await newAgent.toBuffer();
 * ```
 */
declare class DocumentAgent {
    private _document;
    private _pendingVariables;
    /**
     * Create a new DocumentAgent
     *
     * @param source - Document object or ArrayBuffer to parse
     */
    constructor(source: Document | ArrayBuffer);
    /**
     * Create a DocumentAgent from a DOCX buffer (async)
     *
     * @param buffer - DOCX file as ArrayBuffer, Uint8Array, Blob, or File
     * @returns Promise resolving to DocumentAgent
     */
    static fromBuffer(buffer: DocxInput): Promise<DocumentAgent>;
    /**
     * Create a DocumentAgent from a Document object
     *
     * @param document - Parsed Document
     * @returns DocumentAgent
     */
    static fromDocument(document: Document): DocumentAgent;
    /**
     * Get the underlying document
     */
    getDocument(): Document;
    /**
     * Get plain text content of the document
     *
     * @returns All document text concatenated
     */
    getText(): string;
    /**
     * Get formatted text segments
     *
     * @returns Array of text segments with formatting info
     */
    getFormattedText(): FormattedTextSegment[];
    /**
     * Get detected template variables
     *
     * @returns Array of variable names (without braces)
     */
    getVariables(): string[];
    /**
     * Get available styles from the document
     *
     * @returns Array of style info
     */
    getStyles(): StyleInfo[];
    /**
     * Get approximate page count
     *
     * Note: This is an estimate based on content length.
     * Actual page count requires full layout computation.
     *
     * @returns Estimated page count
     */
    getPageCount(): number;
    /**
     * Get word count
     *
     * @returns Number of words in the document
     */
    getWordCount(): number;
    /**
     * Get character count
     *
     * @param includeSpaces - Whether to include whitespace
     * @returns Number of characters
     */
    getCharacterCount(includeSpaces?: boolean): number;
    /**
     * Get paragraph count
     *
     * @returns Number of paragraphs
     */
    getParagraphCount(): number;
    /**
     * Get table count
     *
     * @returns Number of tables
     */
    getTableCount(): number;
    /**
     * Get document context for AI agents
     *
     * @param outlineMaxChars - Max characters per paragraph in outline
     * @returns Agent context
     */
    getAgentContext(outlineMaxChars?: number): AgentContext;
    /**
     * Insert text at a position
     *
     * @param position - Where to insert
     * @param text - Text to insert
     * @param options - Insert options
     * @returns New DocumentAgent with text inserted
     */
    insertText(position: Position, text: string, options?: InsertTextOptions): DocumentAgent;
    /**
     * Replace text in a range
     *
     * @param range - Range to replace
     * @param text - Replacement text
     * @param options - Replace options
     * @returns New DocumentAgent with text replaced
     */
    replaceRange(range: Range, text: string, options?: InsertTextOptions): DocumentAgent;
    /**
     * Delete text in a range
     *
     * @param range - Range to delete
     * @returns New DocumentAgent with text deleted
     */
    deleteRange(range: Range): DocumentAgent;
    /**
     * Apply text formatting to a range
     *
     * @param range - Range to format
     * @param formatting - Formatting to apply
     * @returns New DocumentAgent with formatting applied
     */
    applyFormatting(range: Range, formatting: Partial<TextFormatting>): DocumentAgent;
    /**
     * Apply a named style to a paragraph
     *
     * @param paragraphIndex - Index of the paragraph
     * @param styleId - Style ID to apply
     * @returns New DocumentAgent with style applied
     */
    applyStyle(paragraphIndex: number, styleId: string): DocumentAgent;
    /**
     * Apply paragraph formatting
     *
     * @param paragraphIndex - Index of the paragraph
     * @param formatting - Formatting to apply
     * @returns New DocumentAgent with formatting applied
     */
    applyParagraphFormatting(paragraphIndex: number, formatting: Partial<ParagraphFormatting>): DocumentAgent;
    /**
     * Insert a table at a position
     *
     * @param position - Where to insert the table
     * @param rows - Number of rows
     * @param cols - Number of columns
     * @param options - Table options
     * @returns New DocumentAgent with table inserted
     */
    insertTable(position: Position, rows: number, cols: number, options?: InsertTableOptions): DocumentAgent;
    /**
     * Insert an image at a position
     *
     * @param position - Where to insert the image
     * @param src - Image source (base64 data URL or URL)
     * @param options - Image options
     * @returns New DocumentAgent with image inserted
     */
    insertImage(position: Position, src: string, options?: InsertImageOptions): DocumentAgent;
    /**
     * Insert a hyperlink
     *
     * @param range - Range to make into a hyperlink
     * @param url - URL of the hyperlink
     * @param options - Hyperlink options
     * @returns New DocumentAgent with hyperlink inserted
     */
    insertHyperlink(range: Range, url: string, options?: InsertHyperlinkOptions): DocumentAgent;
    /**
     * Remove a hyperlink but keep the text
     *
     * @param range - Range containing the hyperlink
     * @returns New DocumentAgent with hyperlink removed
     */
    removeHyperlink(range: Range): DocumentAgent;
    /**
     * Insert a paragraph break
     *
     * @param position - Where to break the paragraph
     * @returns New DocumentAgent with paragraph broken
     */
    insertParagraphBreak(position: Position): DocumentAgent;
    /**
     * Merge consecutive paragraphs
     *
     * @param startParagraphIndex - First paragraph index
     * @param count - Number of paragraphs to merge with the first
     * @returns New DocumentAgent with paragraphs merged
     */
    mergeParagraphs(startParagraphIndex: number, count: number): DocumentAgent;
    /**
     * Set a template variable value
     *
     * Note: Variables are not applied until `applyVariables()` is called
     *
     * @param name - Variable name (without braces)
     * @param value - Variable value
     * @returns This DocumentAgent (for chaining)
     */
    setVariable(name: string, value: string): DocumentAgent;
    /**
     * Set multiple template variables
     *
     * @param variables - Map of variable names to values
     * @returns This DocumentAgent (for chaining)
     */
    setVariables(variables: Record<string, string>): DocumentAgent;
    /**
     * Get pending variable values
     *
     * @returns Map of pending variable values
     */
    getPendingVariables(): Record<string, string>;
    /**
     * Clear pending variables
     *
     * @returns This DocumentAgent (for chaining)
     */
    clearPendingVariables(): DocumentAgent;
    /**
     * Apply all pending template variables
     *
     * Uses docxtemplater to substitute variables while preserving formatting.
     *
     * @param variables - Optional additional variables (merged with pending)
     * @returns New DocumentAgent with variables applied
     */
    applyVariables(variables?: Record<string, string>): Promise<DocumentAgent>;
    /**
     * Export document to DOCX ArrayBuffer
     *
     * @returns Promise resolving to DOCX file as ArrayBuffer
     */
    toBuffer(options?: {
        selective?: SelectiveSaveOptions;
    }): Promise<ArrayBuffer>;
    /**
     * Export document to Blob
     *
     * @param mimeType - MIME type for the blob
     * @returns Promise resolving to DOCX file as Blob
     */
    toBlob(mimeType?: string): Promise<Blob>;
    /**
     * Execute multiple commands in sequence
     *
     * @param commands - Commands to execute
     * @returns New DocumentAgent with all commands applied
     */
    executeCommands(commands: AgentCommand[]): DocumentAgent;
    /**
     * Execute a single command and return new agent
     */
    private _executeCommand;
    /**
     * Get plain text from document body
     */
    private _getBodyText;
    /**
     * Get plain text from a paragraph
     */
    private _getParagraphText;
    /**
     * Get plain text from a run
     */
    private _getRunText;
    /**
     * Get plain text from a hyperlink
     */
    private _getHyperlinkText;
    /**
     * Get plain text from a table
     */
    private _getTableText;
    /**
     * Extract formatted text segments from a paragraph
     */
    private _extractParagraphSegments;
    /**
     * Parse heading level from style ID
     */
    private _parseHeadingLevel;
    /**
     * Check if document has images
     */
    private _hasImages;
    /**
     * Check if document has hyperlinks
     */
    private _hasHyperlinks;
}

/**
 * Unique identifier for a block in the document.
 * Format: typically `${index}-${type}` or just the block index.
 */
type BlockId = string | number;
/**
 * Base fragment properties common to all fragment types.
 */
type FragmentBase = {
    /** Block ID this fragment belongs to. */
    blockId: BlockId;
    /** X position on page (relative to page left). */
    x: number;
    /** Y position on page (relative to page top). */
    y: number;
    /** Width of the fragment. */
    width: number;
    /** ProseMirror start position (for click mapping). */
    pmStart?: number;
    /** ProseMirror end position (for click mapping). */
    pmEnd?: number;
};
/**
 * A paragraph fragment positioned on a page.
 * May span only part of the paragraph's lines if split across pages.
 */
type ParagraphFragment = FragmentBase & {
    kind: 'paragraph';
    /** First line index (inclusive) from the measure. */
    fromLine: number;
    /** Last line index (exclusive) from the measure. */
    toLine: number;
    /** Height of this fragment. */
    height: number;
    /** True if this continues from a previous page. */
    continuesFromPrev?: boolean;
    /** True if this continues onto the next page. */
    continuesOnNext?: boolean;
};
/**
 * A table fragment positioned on a page.
 * May span only part of the table's rows if split across pages.
 */
type TableFragment = FragmentBase & {
    kind: 'table';
    /** First row index (inclusive). */
    fromRow: number;
    /** Last row index (exclusive). */
    toRow: number;
    /** Height of this fragment. */
    height: number;
    /** True if this is a floating table. */
    isFloating?: boolean;
    /** True if this continues from a previous page. */
    continuesFromPrev?: boolean;
    /** True if this continues onto the next page. */
    continuesOnNext?: boolean;
    /** Number of header rows prepended to this continuation fragment (0 or undefined for first fragment). */
    headerRowCount?: number;
    /**
     * Pixels to skip from the top of `fromRow`. Non-zero when this fragment's
     * first row is the continuation of a row that broke across a page boundary
     * (Word's "allow row to break across pages"). The painter renders the row
     * shifted up by this amount so the already-shown top slice is clipped.
     */
    topClip?: number;
    /**
     * Visible height (px) measured from the top of the LAST row (`toRow - 1`).
     * Set when that row breaks mid-content onto the next page; `undefined`
     * means the last row is fully visible. When `fromRow === toRow - 1`, the
     * visible band of that single row is `[topClip, bottomClip)`.
     */
    bottomClip?: number;
};
/**
 * An image fragment positioned on a page.
 */
type ImageFragment = FragmentBase & {
    kind: 'image';
    /** Height of the image. */
    height: number;
    /** True if this is an anchored/floating image. */
    isAnchored?: boolean;
    /** Z-index for layering. */
    zIndex?: number;
};
/**
 * A text box fragment positioned on a page.
 */
type TextBoxFragment = FragmentBase & {
    kind: 'textBox';
    /** Height of the text box. */
    height: number;
    /** True when positioned outside normal document flow. */
    isFloating?: boolean;
    /** Stack order hint for anchored text boxes. */
    zIndex?: number;
};
/**
 * Union of all fragment types.
 */
type Fragment = ParagraphFragment | TableFragment | ImageFragment | TextBoxFragment;
/**
 * Page margin configuration.
 */
type PageMargins = {
    top: number;
    right: number;
    bottom: number;
    left: number;
    /** Distance from page top to header content. */
    header?: number;
    /** Distance from page bottom to footer content. */
    footer?: number;
};
/**
 * A rendered page containing positioned fragments.
 */
type Page = {
    /** Page number (1-indexed). */
    number: number;
    /** Fragments positioned on this page. */
    fragments: Fragment[];
    /** Page margins. */
    margins: PageMargins;
    /** Page size (width, height). */
    size: {
        w: number;
        h: number;
    };
    /** Page orientation. */
    orientation?: 'portrait' | 'landscape';
    /** Section index this page belongs to. */
    sectionIndex?: number;
    /** Header/footer references for this page. */
    headerFooterRefs?: {
        headerDefault?: string;
        headerFirst?: string;
        headerEven?: string;
        footerDefault?: string;
        footerFirst?: string;
        footerEven?: string;
    };
    /** Footnote IDs that appear on this page (for rendering). */
    footnoteIds?: number[];
    /** Height reserved for the footnote area at page bottom (pixels). */
    footnoteReservedHeight?: number;
    /** Footnote-area columns (`w15:footnoteColumns`); absent/1 = single column. */
    footnoteColumns?: number;
    /** Column layout for this page (if multi-column). */
    columns?: ColumnLayout;
};
/**
 * Column layout configuration.
 */
type ColumnLayout = {
    count: number;
    gap: number;
    equalWidth?: boolean;
    /** Draw vertical separator line between columns (w:sep). */
    separator?: boolean;
};
/**
 * Header/footer layout for a specific type.
 */
type HeaderFooterLayout = {
    height: number;
    fragments: Fragment[];
};
/**
 * Final layout output ready for rendering/painting.
 */
type Layout = {
    /** Default page size for the document. */
    pageSize: {
        w: number;
        h: number;
    };
    /** All rendered pages with positioned fragments. */
    pages: Page[];
    /** Column configuration (if multi-column). */
    columns?: ColumnLayout;
    /** Header layouts by type (default, first, even). */
    headers?: Record<string, HeaderFooterLayout>;
    /** Footer layouts by type (default, first, even). */
    footers?: Record<string, HeaderFooterLayout>;
    /** Gap between pages in pixels (for rendering). */
    pageGap?: number;
};

/**
 * Content-control (SDT) addressing for the document model.
 *
 * Content controls (`w:sdt`) are the natural anchor for template logic and
 * agent edits: they survive the round trip (see the parser + serializer) and
 * carry a stable `tag`/`alias`/`id`. This module discovers and edits them
 * without a DOM or an editor instance, so server-side pipelines and AI agents
 * can find an anchor by tag and act on it.
 *
 * Both **block-level** (`w:sdt` wrapping paragraphs/tables) and **inline**
 * (`w:sdt` inside a paragraph) controls are addressed, including inline
 * controls inside table cells (and nested tables). With
 * `{ includeHeadersFooters: true }` the walk also covers header/footer parts.
 *
 * Not surfaced (model limitations): a block SDT placed directly inside a table
 * cell (`TableCell.content` cannot hold one), an inline SDT inside a hyperlink
 * (`Hyperlink.children` excludes it), and controls inside tracked-change
 * wrappers.
 */

/** Filter for {@link findContentControls}. All provided fields must match (AND). */
interface ContentControlFilter {
    /** Developer identifier (`w:tag`), exact match. */
    tag?: string;
    /** Friendly name (`w:alias`), exact match. */
    alias?: string;
    /** Numeric id (`w:id`), exact match. */
    id?: number;
    /** Control type projection (`richText`, `dropDownList`, …). */
    type?: SdtType;
}

/**
 * Typed value setters for block-level content controls — set a dropdown
 * selection, toggle a checkbox, or set a date. These produce both the visible
 * content (the run text Word shows) and the structured state inside the
 * captured raw `w:sdtPr` (dropdown `w:lastValue`, `w14:checked`, `w:date`'s
 * `w:fullDate`), patched in place so the rest of the control round-trips
 * verbatim. Use these instead of {@link setContentControlContent} for typed
 * controls, which that function refuses by design.
 *
 * Raw `w:sdtPr` is patched with targeted string edits (not a full re-serialize)
 * to preserve the `CT_SdtPr` element order and any unmodeled properties — the
 * same capture-and-replay contract used everywhere else for SDTs.
 */

/** A typed value to apply to a content control. */
type ContentControlValue = {
    kind: 'dropdown';
    value: string;
} | {
    kind: 'checkbox';
    checked: boolean;
} | {
    kind: 'date';
    date: string;
};

/**
 * Selection State Utilities
 *
 * Extracts selection state from ProseMirror for toolbar integration.
 */

/**
 * Selection state for toolbar integration
 */
interface SelectionState {
    /** Whether there's an active selection (not just cursor) */
    hasSelection: boolean;
    /** Whether selection spans multiple paragraphs */
    isMultiParagraph: boolean;
    /** Current text formatting at selection/cursor */
    textFormatting: TextFormatting;
    /** Current paragraph formatting */
    paragraphFormatting: ParagraphFormatting;
    /** Current paragraph style ID (e.g., 'Heading1', 'Normal') */
    styleId: string | null;
    /** Start paragraph index */
    startParagraphIndex: number;
    /** End paragraph index */
    endParagraphIndex: number;
}

/**
 * ProseMirror-level content-control (SDT) addressing for the live editor.
 *
 * The headless equivalents in `agent/contentControls` operate on the parsed
 * Document model; these operate on the editor's PM state so the editor adapters
 * (React/Vue) can discover and edit a control by tag without a full reload and
 * with normal undo. Shared by both adapters to keep them in lockstep.
 */

/** A control discovered in the PM doc, with its PM position for scroll/edit. */
interface PMContentControl {
    tag?: string;
    alias?: string;
    id?: number;
    sdtType: SdtType;
    lock?: SdtProperties['lock'];
    /** Whether the control is currently showing placeholder text. */
    showingPlaceholder?: boolean;
    /** Checkbox state, for checkbox controls. */
    checked?: boolean;
    /** Date format, for date controls. */
    dateFormat?: string;
    /** Dropdown/combobox list items, if modeled. */
    listItems?: {
        displayText: string;
        value: string;
    }[];
    /** XML data binding (`w:dataBinding`), if the control is bound. */
    dataBinding?: SdtDataBinding;
    /** Current date value (ISO `yyyy-mm-dd`) for a date control, from `w:fullDate`. */
    dateValue?: string;
    /** Plain text of the control's content. */
    text: string;
    /** PM position of the `blockSdt` or inline `sdt` node (its `before` position). */
    pos: number;
    /** Nesting depth among content controls (0 = not inside another control). */
    depth: number;
}

interface PagedEditorRef {
    /** Get the current document. */
    getDocument(): Document | null;
    /** Get the ProseMirror EditorState. */
    getState(): EditorState | null;
    /** Get the ProseMirror EditorView. */
    getView(): EditorView | null;
    /** Focus the editor. */
    focus(): void;
    /** Blur the editor. */
    blur(): void;
    /** Check if focused. */
    isFocused(): boolean;
    /** Dispatch a transaction. */
    dispatch(tr: Transaction): void;
    /** Undo. */
    undo(): boolean;
    /** Redo. */
    redo(): boolean;
    /** Set selection by PM position. */
    setSelection(anchor: number, head?: number): void;
    /** Get current layout. */
    getLayout(): Layout | null;
    /** Force re-layout. */
    relayout(): void;
    /** Scroll the visible pages to bring a PM position into view. */
    scrollToPosition(pmPos: number): void;
    /**
     * Scroll to the paragraph identified by Word `w14:paraId` / PM `paraId`.
     * Pass `options.highlight` to briefly flash rendered paragraph fragments.
     * @returns whether a matching paragraph was found
     */
    scrollToParaId(paraId: string, options?: ScrollToParaIdOptions): boolean;
    /**
     * Scroll the paginated view so `pageNumber` (1-indexed) is in view.
     * No-op if the layout isn't ready yet or pageNumber is out of range.
     */
    scrollToPage(pageNumber: number): void;
    /**
     * Scroll to the comment identified by `commentId` and select its range so
     * the selection overlay highlights it. Resolves the id → PM range via the
     * live comment marks; returns `false` (not a throw, not a silent no-op)
     * when the id no longer resolves so the caller can surface a "location no
     * longer exists" affordance.
     */
    scrollToCommentId(commentId: number): boolean;
    /**
     * Scroll to the tracked change identified by `revisionId` and select its
     * range so the selection overlay highlights it. Resolves the id → PM range
     * via the live tracked-change marks; returns `false` when the id no longer
     * resolves (the change was accepted/rejected/deleted).
     */
    scrollToChangeId(revisionId: number): boolean;
    /**
     * Select the PM position range `[from, to]` so the selection overlay
     * highlights it, and scroll its start into view. No-op for a malformed
     * range or a `from` past the document end; `to` is clamped to the document
     * size (raw caller positions, so out-of-range must not throw).
     */
    highlightRange(from: number, to: number): void;
    /**
     * Look up the persistent hidden HF PM EditorView for a given HeaderFooter
     * instance. Returns null when none is mounted (no document, or `hf` is not
     * present in `Document.package.headers/footers`). Phase 2 of the HF
     * unification: the inline overlay uses this to replicate edits into the
     * persistent PM so the painter — which reads from the persistent PM per
     * phase 1 — re-renders live during typing. Phase 5 deletes the inline
     * overlay's PM and this method's only remaining caller is the click /
     * focus router (phase 3).
     */
    getHfPmView(hf: HeaderFooter): EditorView | null;
    /** Get all active header/footer EditorViews mapped by rId. */
    getHfPmViews(): Map<string, EditorView>;
}

/**
 * EditorMode union + the catalog the editing-mode dropdown renders.
 * Lives next to DocxEditor.tsx so the dropdown component and the parent
 * forwardRef body share one source of truth.
 */

type EditorMode = 'editing' | 'suggesting' | 'viewing';

/**
 * DocxEditor props
 */
interface DocxEditorProps {
    /** Document data — ArrayBuffer, Uint8Array, Blob, or File */
    documentBuffer?: DocxInput | null;
    /** Pre-parsed document (alternative to documentBuffer) */
    document?: Document | null;
    /** Callback when document is saved */
    onSave?: (buffer: ArrayBuffer) => void;
    /**
     * Callback when a DOCX file is selected through `File > Open` or Cmd/Ctrl+O.
     * Pass it to route the picked file through your own import pipeline. Omit it
     * to keep the built-in local document load behavior.
     */
    onOpen?: (file: File) => void | Promise<void>;
    /** Author name used for comments and track changes */
    author?: string;
    /** Callback when document changes */
    onChange?: (document: Document) => void;
    /** Callback when selection changes */
    onSelectionChange?: (state: SelectionState | null) => void;
    /** Callback on error */
    onError?: (error: Error) => void;
    /** Callback when fonts are loaded */
    onFontsLoaded?: () => void;
    /** External ProseMirror plugins (from PluginHost) */
    externalPlugins?: prosemirror_state.Plugin[];
    /**
     * When true, the editor treats the `document` prop as a schema seed only and
     * does not load it into ProseMirror on mount. Content is expected to come from
     * external sources — typically `externalPlugins` such as `ySyncPlugin` from
     * `y-prosemirror`, but also any code that dispatches transactions directly.
     *
     * You must still pass a `document` prop (e.g., `createEmptyDocument()`) so the
     * editor can build its schema and render the shell.
     */
    externalContent?: boolean;
    /** Callback when editor view is ready (for PluginHost) */
    onEditorViewReady?: (view: prosemirror_view.EditorView) => void;
    /** Color theme mode for UI styling. `'system'` follows the OS preference. */
    colorMode?: 'light' | 'dark' | 'system';
    /** Document theme schema object */
    theme?: Theme | null;
    /** Whether to show toolbar (default: true) */
    showToolbar?: boolean;
    /**
     * Whether to show `File > Open` and enable Cmd/Ctrl+O (default: true).
     * Set false when you provide your own open action elsewhere.
     */
    showFileOpen?: boolean;
    /** Whether to show the Help menu in the menu bar (default: true) */
    showHelpMenu?: boolean;
    /** Whether to show zoom control (default: true) */
    showZoomControl?: boolean;
    /** Whether to show page margin guides/boundaries (default: false) */
    showMarginGuides?: boolean;
    /** Color for margin guides (default: '#c0c0c0') */
    marginGuideColor?: string;
    /** Whether to show horizontal ruler (default: false) */
    showRuler?: boolean;
    /** Unit for ruler display (default: 'inch') */
    rulerUnit?: 'inch' | 'cm';
    /** Initial zoom level (default: 1.0) */
    initialZoom?: number;
    /** Whether the editor is read-only. When true, hides toolbar and rulers */
    readOnly?: boolean;
    /**
     * When true, the editor does not intercept Cmd/Ctrl+F or Cmd/Ctrl+H.
     * This lets the browser or host app handle native find/history shortcuts.
     */
    disableFindReplaceShortcuts?: boolean;
    /** Custom toolbar actions */
    toolbarExtra?: ReactNode;
    /** Additional CSS class name */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
    /** Placeholder when no document */
    placeholder?: ReactNode;
    /** Loading indicator */
    loadingIndicator?: ReactNode;
    /** Whether to show the document outline sidebar (default: false) */
    showOutline?: boolean;
    /** Whether to show the floating outline toggle button (default: true) */
    showOutlineButton?: boolean;
    /**
     * Custom list of fonts shown in the toolbar's font-family dropdown.
     * Strings render in the "Other" group; pass `FontOption[]` for category
     * grouping and CSS fallback chains. Omit to use the built-in 12-font
     * default. An empty array renders an empty (but enabled) dropdown.
     *
     * Pass a stable reference (memoized or module-level) — inline arrays
     * create a new identity per render and invalidate the picker's memo.
     *
     * @example fontFamilies={['Arial', 'Roboto']}
     * @example fontFamilies={[{ name: 'Roboto', fontFamily: 'Roboto, sans-serif', category: 'sans-serif' }]}
     */
    fontFamilies?: ReadonlyArray<string | FontOption>;
    /**
     * Custom font faces to register with the browser before the editor measures
     * text. Each entry injects an `@font-face` rule. Pass a URL (woff2/woff/
     * ttf/otf), an ArrayBuffer, or omit `src` to load by name from Google Fonts.
     * Multiple entries can share `family` to register different weights/styles.
     *
     * Pass a stable reference — inline arrays re-register faces on each render
     * (the loader dedupes by `family|weight|style`, so it's harmless but wastes
     * work).
     *
     * @example
     * fonts={[
     *   { family: 'Custom Sans', src: '/fonts/CustomSans-Regular.woff2' },
     *   { family: 'Custom Sans', src: '/fonts/CustomSans-Bold.woff2', weight: 700 },
     * ]}
     */
    fonts?: ReadonlyArray<FontDefinition>;
    /**
     * Text-watermark presets shown in the watermark dialog's preset dropdown.
     * Omit to use the built-in MS Word phrases (`DEFAULT_WATERMARK_PRESETS`:
     * CONFIDENTIAL, DRAFT, DO NOT COPY, SAMPLE, URGENT, ASAP). Pass an empty
     * array to hide the preset dropdown and require custom text.
     *
     * @example watermarkPresets={['INTERNAL', 'PROPRIETARY', 'COPY']}
     */
    watermarkPresets?: readonly string[];
    /** Print options for print preview */
    printOptions?: PrintOptions;
    /**
     * Callback when print is triggered. Pass it to enable the `File > Print`
     * menu entry; omit to hide. The imperative `ref.current.print()` also
     * invokes this callback.
     */
    onPrint?: () => void;
    /** Callback when content is copied */
    onCopy?: () => void;
    /** Callback when content is cut */
    onCut?: () => void;
    /** Callback when content is pasted */
    onPaste?: () => void;
    /** Editor mode: 'editing' (direct edits), 'suggesting' (track changes), or 'viewing' (read-only). Default: 'editing' */
    mode?: EditorMode;
    /** Callback when the editing mode changes */
    onModeChange?: (mode: EditorMode) => void;
    /** Callback when a comment is added via the UI */
    onCommentAdd?: (comment: Comment) => void;
    /** Callback when a comment is resolved via the UI */
    onCommentResolve?: (comment: Comment) => void;
    /** Callback when a comment is deleted via the UI */
    onCommentDelete?: (comment: Comment) => void;
    /** Callback when a reply is added to a comment via the UI */
    onCommentReply?: (reply: Comment, parent: Comment) => void;
    /**
     * Controlled comments array. When provided, the editor reads comment thread
     * metadata (text, author, replies, resolved status) from this prop instead
     * of internal state, and emits every change through `onCommentsChange`.
     *
     * Use this with collaboration backends (Yjs, Liveblocks, Automerge, …) so
     * comment threads sync across peers — the PM document only carries the
     * range markers; thread metadata lives outside the doc and needs its own
     * sync channel.
     *
     * If omitted, the editor falls back to internal state (current behavior).
     * The granular `onCommentAdd`/`onCommentResolve`/`onCommentDelete`/
     * `onCommentReply` callbacks fire in both modes.
     */
    comments?: Comment[];
    /** Fires whenever the comments array changes (controlled mode). */
    onCommentsChange?: (comments: Comment[]) => void;
    /** Controlled comments-sidebar visibility; source of truth when set. Pair with `onCommentsSidebarOpenChange`; omit for the default self-managed behavior. */
    commentsSidebarOpen?: boolean;
    /** Fires with the next open state whenever the editor wants to show or hide the comments sidebar. Fires in both controlled and uncontrolled modes. */
    onCommentsSidebarOpenChange?: (open: boolean) => void;
    /**
     * Callback when rendered DOM context is ready (for plugin overlays).
     * Used by PluginHost to get access to the rendered page DOM for positioning.
     */
    onRenderedDomContextReady?: (context: RenderedDomContext) => void;
    /**
     * Plugin overlays to render inside the editor viewport.
     * Passed from PluginHost to render plugin-specific overlays.
     */
    pluginOverlays?: ReactNode;
    /** Sidebar items from plugins (passed from PluginHost). */
    pluginSidebarItems?: ReactSidebarItem[];
    /** Rendered DOM context from PluginHost (for sidebar position resolution). */
    pluginRenderedDomContext?: RenderedDomContext | null;
    /** Custom logo/icon for the title bar */
    renderLogo?: () => ReactNode;
    /** Document name shown in the title bar */
    documentName?: string;
    /** Callback when document name changes */
    onDocumentNameChange?: (name: string) => void;
    /** Whether the document name is editable (default: true) */
    documentNameEditable?: boolean;
    /** Custom right-side actions for the title bar */
    renderTitleBarRight?: () => ReactNode;
    /** Translation overrides. Import a locale JSON file and pass it directly. */
    i18n?: Translations;
}
/**
 * DocxEditor ref interface
 */
interface DocxEditorRef {
    /** Get the DocumentAgent for programmatic access */
    getAgent: () => DocumentAgent | null;
    /** Get the current document */
    getDocument: () => Document | null;
    /** Get the editor ref */
    getEditorRef: () => PagedEditorRef | null;
    /** Save the document to buffer. Pass { selective: false } to force full repack. */
    save: (options?: {
        selective?: boolean;
    }) => Promise<ArrayBuffer | null>;
    /** Set zoom level */
    setZoom: (zoom: number) => void;
    /** Get current zoom level */
    getZoom: () => number;
    /** Focus the editor */
    focus: () => void;
    /** Get current page number */
    getCurrentPage: () => number;
    /** Get total page count */
    getTotalPages: () => number;
    /**
     * Scroll the paginated view so the given page is in view.
     * Page numbers are 1-indexed (matches `getCurrentPage` / `getTotalPages`).
     * No-op for out-of-range or non-integer values.
     * @example ref.current?.scrollToPage(2)
     */
    scrollToPage: (pageNumber: number) => void;
    /**
     * Scroll the paginated view to the paragraph with the given Word `w14:paraId`.
     * Pass `options.highlight` to briefly flash it in a custom color.
     * @returns whether a matching paragraph exists in the ProseMirror document
     * @example ref.current?.scrollToParaId('1A2B3C4D', { highlight: { color: 'rgba(255, 235, 59, 0.55)' } })
     */
    scrollToParaId: (paraId: string, options?: ScrollToParaIdOptions) => boolean;
    /**
     * Scroll the paginated view to a specific ProseMirror document position.
     * Use this when you have a raw PM offset; for Word `w14:paraId` use
     * `scrollToParaId` instead.
     * @example ref.current?.scrollToPosition(42)
     */
    scrollToPosition: (pmPos: number) => void;
    /**
     * Scroll the paginated view to the comment with the given id and select its
     * anchored range so the selection overlay highlights it. Resolves the id
     * against the live comment marks at call time.
     * @returns `false` when the id no longer resolves (the comment was deleted
     *   or its anchored text removed between render and click), so the caller
     *   can surface a "location no longer exists" affordance rather than
     *   silently no-op'ing.
     * @example ref.current?.scrollToCommentId(3)
     */
    scrollToCommentId: (commentId: number) => boolean;
    /**
     * Scroll the paginated view to the tracked change with the given Word
     * revision `w:id` and select its range so the selection overlay highlights
     * it. Resolves the id against the live tracked-change marks at call time
     * (matching coalesced revisions the way the changes sidebar does).
     * @returns `false` when the id no longer resolves (the change was
     *   accepted, rejected, or deleted between render and click).
     * @example ref.current?.scrollToChangeId(42)
     */
    scrollToChangeId: (revisionId: number) => boolean;
    /**
     * Select the ProseMirror position range `[from, to]` so the selection
     * overlay highlights it, and scroll its start into view. The selection
     * persists until it next changes (there is no auto-clearing flash). No-op
     * for a malformed range or a `from` past the document end; `to` is clamped
     * to the document size.
     * @example ref.current?.highlightRange(10, 24)
     */
    highlightRange: (from: number, to: number) => void;
    /** Open print preview */
    openPrintPreview: () => void;
    /** Print the document directly */
    print: () => void;
    /** Load a pre-parsed document programmatically */
    loadDocument: (doc: Document) => void;
    /** Load a DOCX buffer programmatically (ArrayBuffer, Uint8Array, Blob, or File) */
    loadDocumentBuffer: (buffer: DocxInput) => Promise<void>;
    /** Add a comment programmatically. Anchored by Word `w14:paraId` so
     * it survives unrelated edits. Returns the comment ID, or null if
     * the paraId is unknown or the search text isn't found / is ambiguous. */
    addComment: (options: {
        paraId: string;
        text: string;
        author: string;
        /** Optional: anchor to a specific phrase within the paragraph (must be unique). */
        search?: string;
    }) => number | null;
    /** Reply to an existing comment. Returns the reply comment ID. */
    replyToComment: (commentId: number, text: string, author: string) => number | null;
    /** Resolve (mark as done) a comment. */
    resolveComment: (commentId: number) => void;
    /** Suggest a tracked change. Pass `replaceWith: ''` to delete the matched text;
     * pass `search: ''` to insert at paragraph end. Returns false on missing paraId,
     * missing/ambiguous search, or attempt to layer on an existing tracked change. */
    proposeChange: (options: {
        paraId: string;
        search: string;
        replaceWith: string;
        author: string;
    }) => boolean;
    /** Locate every paragraph containing `query` (case-insensitive substring).
     * Returns a stable handle (paraId + the matched phrase) the agent can pass
     * back to `addComment` / `proposeChange`. */
    findInDocument: (query: string, options?: {
        caseSensitive?: boolean;
        limit?: number;
    }) => Array<{
        paraId: string;
        match: string;
        before: string;
        after: string;
    }>;
    /**
     * Apply character formatting (bold / italic / color / size / font / etc.)
     * to a paragraph or to a unique phrase within it. This is a direct edit,
     * not a tracked change. Returns false on missing paraId or ambiguous search.
     */
    applyFormatting: (options: {
        paraId: string;
        search?: string;
        marks: {
            bold?: boolean;
            italic?: boolean;
            underline?: boolean | {
                style?: string;
            };
            strike?: boolean;
            color?: {
                rgb?: string;
                themeColor?: string;
            };
            highlight?: string;
            fontSize?: number;
            fontFamily?: {
                ascii?: string;
                hAnsi?: string;
            };
        };
    }) => boolean;
    /**
     * Apply a paragraph style by styleId (e.g. `'Heading1'`, `'Quote'`).
     * Direct edit, not a tracked change. Returns false if paraId is unknown.
     */
    setParagraphStyle: (options: {
        paraId: string;
        styleId: string;
    }) => boolean;
    /**
     * Insert a page or section break after the paragraph identified by `paraId`.
     * `'page'` adds a page break; `'sectionNextPage'` / `'sectionContinuous'`
     * start a new section on a new page / the same page. Direct edit, not a
     * tracked change. Returns false if paraId is unknown.
     */
    insertBreak: (options: {
        paraId: string;
        type: 'page' | 'sectionNextPage' | 'sectionContinuous';
    }) => boolean;
    /**
     * Read the contents of a single page. 1-indexed; returns null if the page
     * does not exist. Each paragraph is returned with its stable paraId so the
     * agent can comment on or modify it without an extra round-trip.
     */
    getPageContent: (pageNumber: number) => {
        pageNumber: number;
        text: string;
        paragraphs: Array<{
            paraId: string;
            text: string;
            styleId?: string;
        }>;
    } | null;
    /** Read the user's current cursor / selection — what's highlighted right now. */
    getSelectionInfo: () => {
        paraId: string | null;
        selectedText: string;
        paragraphText: string;
        before: string;
        after: string;
    } | null;
    /** Get all comments. */
    getComments: () => Comment[];
    /**
     * List block-level content controls (SDTs) in the live document, optionally
     * filtered by `tag`/`alias`/`id`/`type`. Each result includes the control's
     * text and PM position. Anchors for templates and document automation.
     */
    getContentControls: (filter?: ContentControlFilter) => PMContentControl[];
    /** Scroll the first content control matching `filter` into view. Returns false if none. */
    scrollToContentControl: (filter: ContentControlFilter) => boolean;
    /**
     * Replace the content of the first control matching `filter` with `text`
     * (newlines become paragraphs). Returns false if no match. Throws if the
     * control is content-locked unless `{ force: true }`.
     */
    setContentControlContent: (filter: ContentControlFilter, text: string, options?: {
        force?: boolean;
    }) => boolean;
    /**
     * Remove the first control matching `filter`. With `{ keepContent: true }`
     * the inner blocks are unwrapped in place. Returns false if no match. Throws
     * if the control is deletion-locked unless `{ force: true }`.
     */
    removeContentControl: (filter: ContentControlFilter, options?: {
        force?: boolean;
        keepContent?: boolean;
    }) => boolean;
    /**
     * Set a typed value on the first control matching `filter`: a dropdown
     * selection (`{ kind: 'dropdown', value }`), checkbox (`{ kind: 'checkbox',
     * checked }`), or date (`{ kind: 'date', date }`). Updates the visible
     * content and structured state. Returns false if no match; throws if
     * content-locked (unless `force`) or the value doesn't fit the control type.
     */
    setContentControlValue: (filter: ContentControlFilter, value: ContentControlValue, options?: {
        force?: boolean;
    }) => boolean;
    /** Subscribe to document changes. Fires after every committed edit. Returns unsubscribe. */
    onContentChange: (listener: (document: Document) => void) => () => void;
    /** Subscribe to selection changes (cursor moves / selection changes). Returns unsubscribe. */
    onSelectionChange: (listener: (selection: SelectionState | null) => void) => () => void;
}

/**
 * DocxEditor - Complete DOCX editor component
 */
declare const DocxEditor: React.ForwardRefExoticComponent<DocxEditorProps & React.RefAttributes<DocxEditorRef>>;

/**
 * Simple imperative API for rendering a DOCX editor into a DOM element.
 *
 * Returns an `EditorHandle` (from @/core/core) that works with
 * any framework implementation.
 *
 * Usage:
 * ```ts
 * import { renderAsync } from '@/react';
 *
 * const editor = await renderAsync(docxBlob, document.getElementById('container'), {
 *   readOnly: false,
 *   showToolbar: true,
 * });
 *
 * // Save the edited document
 * const blob = await editor.save();
 *
 * // Clean up
 * editor.destroy();
 * ```
 */

/**
 * Options for {@link renderAsync}. A subset of DocxEditorProps minus
 * `documentBuffer` / `document` (passed as the first argument instead).
 */
type RenderAsyncOptions = Omit<DocxEditorProps, 'documentBuffer' | 'document'>;
/**
 * React-specific handle that extends the framework-agnostic EditorHandle
 * with zoom control.
 */
interface DocxEditorHandle extends EditorHandle {
    /** Set zoom level (1.0 = 100%). */
    setZoom: (zoom: number) => void;
    /** Scroll to a body paragraph by Word `w14:paraId`. */
    scrollToParaId: (paraId: string, options?: ScrollToParaIdOptions) => boolean;
    /** Scroll to a raw ProseMirror document position. */
    scrollToPosition: (pmPos: number) => void;
}
/**
 * Render a DOCX editor into a container element.
 *
 * @param input - DOCX data as ArrayBuffer, Uint8Array, Blob, or File
 * @param container - DOM element to render into
 * @param options - Editor configuration (toolbar, readOnly, callbacks, etc.)
 * @returns A handle with save / destroy / getDocument methods
 */
declare function renderAsync(input: DocxInput, container: HTMLElement, options?: RenderAsyncOptions): Promise<DocxEditorHandle>;

interface LocaleProviderProps {
    i18n?: Translations;
    children: ReactNode;
}
declare function LocaleProvider({ i18n, children }: LocaleProviderProps): React.JSX.Element;
declare function useTranslation(): {
    t: TFunction;
};

/**
 * docx-editor-react
 *
 * Curated root entry for the documented React editor API. Advanced surfaces
 * stay public through explicit subpaths:
 * - `docx-editor-react/ui`
 * - `docx-editor-react/dialogs`
 * - `docx-editor-react/hooks`
 * - `docx-editor-react/plugin-api`
 *
 * @packageDocumentation
 * @public
 */
declare const VERSION = "0.0.2";

export { type CreateEmptyDocumentOptions, DocxEditor, type DocxEditorHandle, type DocxEditorProps, type DocxEditorRef, type EditorMode, LocaleProvider, type LocaleProviderProps, type RenderAsyncOptions, VERSION, createDocumentWithText, createEmptyDocument, renderAsync, useTranslation };
