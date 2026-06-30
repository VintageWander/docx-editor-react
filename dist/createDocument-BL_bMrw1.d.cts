import { D as Document } from './document-DktZDMbO.cjs';
import { q as StyleInfo, a as AgentContext, P as Position, R as Range, A as AgentCommand } from './agentApi-D6BWmIeb.cjs';
import { T as TextFormatting, d as ParagraphFormatting, S as SdtType, b as SdtProperties, s as SdtDataBinding, D as DocumentBody, u as BlockSdt, v as InlineSdt, B as BlockContent } from './run-DQbevRIu.cjs';

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
 * Attempt a selective save — patch only changed paragraphs in document.xml.
 * Also updates comments, headers/footers, and core properties so that
 * all document parts stay in sync even when only paragraphs are patched.
 *
 * Returns the saved ArrayBuffer, or null if selective save is not possible
 * (caller should fall back to full repack).
 */
declare function attemptSelectiveSave(doc: Document, originalBuffer: ArrayBuffer, options: SelectiveSaveOptions): Promise<ArrayBuffer | null>;

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
 * Create a DocumentAgent from a DOCX buffer
 *
 * @param buffer - DOCX file as ArrayBuffer
 * @returns Promise resolving to DocumentAgent
 */
declare function createAgent(buffer: ArrayBuffer): Promise<DocumentAgent>;
/**
 * Create a DocumentAgent from a parsed Document
 *
 * @param document - Parsed Document
 * @returns DocumentAgent
 */
declare function createAgentFromDocument(document: Document): DocumentAgent;

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
 * Where a control lives. `body` = the main document story; `header`/`footer`
 * = a page-furniture part addressed by its relationship id (the key into
 * `package.headers`/`package.footers`).
 */
type ContentControlLocation = {
    part: 'body';
} | {
    part: 'header' | 'footer';
    rId: string;
};
/** A discovered content control plus enough context to address and edit it. */
interface ContentControlInfo {
    /** Developer identifier (`w:tag`). */
    tag?: string;
    /** Friendly name (`w:alias`). */
    alias?: string;
    /** Numeric id (`w:id`). */
    id?: number;
    /** Control type projection. */
    sdtType: SdtType;
    /** Lock setting, if any. A locked control should refuse content edits. */
    lock?: SdtProperties['lock'];
    /** Dropdown/combobox list items, if modeled. */
    listItems?: {
        displayText: string;
        value: string;
    }[];
    /** Placeholder docPart reference, if any. */
    placeholder?: string;
    /** Whether the control is currently showing placeholder text (`w:showingPlcHdr`). */
    showingPlaceholder?: boolean;
    /** Checkbox state, for checkbox controls. */
    checked?: boolean;
    /** Date format string, for date controls. */
    dateFormat?: string;
    /** XML data binding (`w:dataBinding`), if the control is bound. */
    dataBinding?: SdtDataBinding;
    /** Plain text of the control's content (paragraphs/tables/nested controls flattened). */
    text: string;
    /**
     * Block-index path to this control: top-level `[i]`, a control nested in the
     * i-th block's content `[i, j]`, and so on. For inline / cell controls it is
     * the block indices of the nearest enclosing blocks.
     */
    path: number[];
    /** Nesting depth = number of enclosing content controls (0 = not inside another control). */
    depth: number;
    /** Block-level (`w:sdt` at block level) or inline (`w:sdt` inside a paragraph). */
    kind: 'block' | 'inline';
    /** Where the control lives (body vs a header/footer part). */
    location: ContentControlLocation;
}
/** Plain text of a control's content, descending into tables and nested SDTs. */
declare function getContentControlText(control: BlockSdt | InlineSdt): string;
/** Options for {@link findContentControls}. */
interface FindContentControlsOptions {
    /**
     * When `true`, also search header/footer parts — but only when a full
     * {@link Document} is passed (a bare `DocumentBody` carries no parts, so this
     * then searches the body only and never throws). Defaults to `false` (the main
     * document story only).
     */
    includeHeadersFooters?: boolean;
}
/**
 * Find every content control in the document — block-level AND inline —
 * optionally filtered by tag/alias/id/type. Results are in strict document
 * order; nested controls follow their parent.
 *
 * The walk descends body blocks, block SDTs, tables (row-major, including
 * nested tables) into cell content, and paragraph inline content (inline
 * SDTs, recursing into nested inline SDTs). With `{ includeHeadersFooters: true }`
 * and a full {@link Document}, header then footer parts are searched after the
 * body, each sorted by relationship id for deterministic order.
 *
 * Not surfaced (model limitations, documented): a block SDT placed directly
 * inside a table cell (`TableCell.content` is `(Paragraph | Table)[]`), an
 * inline SDT inside a hyperlink (`Hyperlink.children` excludes it), and
 * controls buried inside tracked-change wrappers.
 */
declare function findContentControls(input: Document | DocumentBody, filter?: ContentControlFilter, options?: FindContentControlsOptions): ContentControlInfo[];
/** Convenience: the first control matching `filter`, or `undefined`. */
declare function findContentControl(input: Document | DocumentBody, filter: ContentControlFilter, options?: FindContentControlsOptions): ContentControlInfo | undefined;
/** No control matched the filter. */
declare class ContentControlNotFoundError extends Error {
    constructor(filter: ContentControlFilter);
}
/** The matched control's lock forbids the attempted edit (pass `force` to override). */
declare class ContentControlLockedError extends Error {
    constructor(lock: SdtProperties['lock'], op: 'edit' | 'remove');
}
/**
 * The control's type doesn't support free text/block replacement (e.g. a
 * dropdown, date, checkbox, or picture control), so writing arbitrary content
 * would desync the type marker from its value. Use a type-specific setter, or
 * pass `{ force: true }` to override.
 */
declare class ContentControlTypeError extends Error {
    constructor(sdtType: SdtType);
}
/**
 * The control is bound to a Custom XML data store (`w:dataBinding`). Writing its
 * content won't stick — Word re-renders the control from the bound XML node — so
 * the write is refused. Update the data store instead, or pass `{ force: true }`.
 */
declare class ContentControlBoundError extends Error {
    constructor();
}
/**
 * A `BlockContent[]` replacement was targeted at an inline control, which can
 * only hold inline content (runs, hyperlinks, fields, nested inline SDTs, math).
 * Splicing a paragraph into a paragraph would be invalid OOXML — pass a string,
 * or a single paragraph whose content is entirely inline.
 */
declare class ContentControlKindError extends Error {
    constructor(detail: string);
}
/**
 * Replace the content of the first control matching `filter` — block-level OR
 * inline (including inside table cells and, with `includeHeadersFooters: true`,
 * headers and footers). `replacement` may be a string or block content.
 *
 * - For a **block** control the string is split into paragraphs on newlines
 *   (a `plainText` control collapses to one paragraph); block content is used
 *   as-is (cloned).
 * - For an **inline** control the string becomes a single run that inherits the
 *   placeholder's formatting (so the value matches the field it replaces). A
 *   richText control turns `\n` into a line break; a plainText control never
 *   gets one. Passing `BlockContent[]` to an inline control throws
 *   {@link ContentControlKindError} unless it is a single all-inline paragraph.
 *
 * Pass `{ all: true }` to fill **every** control matching `filter` (one logical
 * value that recurs under a shared tag — e.g. a name in the body, a running
 * header, and several table cells) instead of just the first.
 *
 * The control's properties, tag/alias, and lossless raw `w:sdtPr` are preserved.
 * When the control was showing its placeholder (`w:showingPlcHdr`), that flag is
 * cleared so Word doesn't render the new content as placeholder text.
 *
 * Throws {@link ContentControlNotFoundError} if nothing matches,
 * {@link ContentControlLockedError} if the lock forbids editing,
 * {@link ContentControlTypeError} for a typed (dropdown/date/…) control, and
 * {@link ContentControlBoundError} for a data-bound control. Pass
 * `{ force: true }` to override the guards.
 */
declare function setContentControlContent(doc: Document, filter: ContentControlFilter, replacement: string | BlockContent[], options?: {
    force?: boolean;
    includeHeadersFooters?: boolean;
    all?: boolean;
}): Document;
/**
 * Remove the first control matching `filter` — block-level OR inline (incl.
 * inside table cells and, with `includeHeadersFooters: true`, headers/footers).
 * With `keepContent: true` the control's content is unwrapped in place (the box goes
 * away, the content stays) — block content lifts to its block siblings, inline
 * content stays inline in the enclosing paragraph. Otherwise the control and
 * its content are deleted.
 *
 * Pass `{ all: true }` to remove **every** control matching `filter` (e.g. to
 * flatten a finished template by unwrapping all controls) instead of the first.
 *
 * Unwrapping a repeating-section (item) is refused unless `force`, since lifting
 * its blocks out would orphan the (w15) repeating structure.
 *
 * Throws {@link ContentControlNotFoundError} / {@link ContentControlLockedError}
 * as {@link setContentControlContent} does.
 */
declare function removeContentControl(doc: Document, filter: ContentControlFilter, options?: {
    force?: boolean;
    keepContent?: boolean;
    includeHeadersFooters?: boolean;
    all?: boolean;
}): Document;

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
/** The control doesn't support the requested value kind, or the value is invalid. */
declare class ContentControlValueError extends Error {
    constructor(message: string);
}
/** Format an ISO date (yyyy-mm-dd) with a subset of OOXML date tokens. */
declare function formatSdtDate(iso: string, pattern?: string): string;
/**
 * Set a typed value (dropdown selection / checkbox / date) on the first control
 * matching `filter` — **block-level OR inline** (inline includes controls inside
 * table cells, and with `includeHeadersFooters: true`, headers/footers) — returning a new
 * {@link Document}. Updates both the visible content and the structured raw
 * state (dropdown `w:lastValue`, `w14:checked`, `w:date/@w:fullDate`), so the
 * result round-trips and Word shows the new value.
 *
 * Pass `{ all: true }` to set the value on **every** control matching `filter`
 * (a value shared across duplicated controls) instead of just the first.
 *
 * Throws `ContentControlNotFoundError` if nothing matches,
 * {@link ContentControlLockedError} if content-locked,
 * {@link ContentControlBoundError} if data-bound (the store would override the
 * write), and {@link ContentControlValueError} if the value doesn't fit the
 * control type. The lock/bound guards are overridable with `{ force: true }`.
 */
declare function setContentControlValue(doc: Document, filter: ContentControlFilter, value: ContentControlValue, options?: {
    force?: boolean;
    includeHeadersFooters?: boolean;
    all?: boolean;
}): Document;

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

export { setContentControlValue as A, type ContentControlInfo as C, type DocxInput as D, type FindContentControlsOptions as F, type InsertHyperlinkOptions as I, type ContentControlFilter as a, ContentControlBoundError as b, ContentControlKindError as c, type ContentControlLocation as d, ContentControlLockedError as e, ContentControlNotFoundError as f, ContentControlTypeError as g, type ContentControlValue as h, ContentControlValueError as i, type CreateEmptyDocumentOptions as j, DocumentAgent as k, type FormattedTextSegment as l, type InsertImageOptions as m, type InsertTableOptions as n, type InsertTextOptions as o, attemptSelectiveSave as p, createAgent as q, createAgentFromDocument as r, createDocumentWithText as s, createEmptyDocument as t, findContentControl as u, findContentControls as v, formatSdtDate as w, getContentControlText as x, removeContentControl as y, setContentControlContent as z };
