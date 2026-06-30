import { C as ContentControlInfo, a as ContentControlFilter, D as DocxInput } from './createDocument-BL_bMrw1.cjs';
export { b as ContentControlBoundError, c as ContentControlKindError, d as ContentControlLocation, e as ContentControlLockedError, f as ContentControlNotFoundError, g as ContentControlTypeError, h as ContentControlValue, i as ContentControlValueError, j as CreateEmptyDocumentOptions, k as DocumentAgent, F as FindContentControlsOptions, l as FormattedTextSegment, I as InsertHyperlinkOptions, m as InsertImageOptions, n as InsertTableOptions, o as InsertTextOptions, p as attemptSelectiveSave, q as createAgent, r as createAgentFromDocument, s as createDocumentWithText, t as createEmptyDocument, u as findContentControl, v as findContentControls, w as formatSdtDate, x as getContentControlText, y as removeContentControl, z as setContentControlContent, A as setContentControlValue } from './createDocument-BL_bMrw1.cjs';
import { D as Document, S as StyleDefinitions, T as Theme } from './document-DktZDMbO.cjs';
export { a as DocxPackage, R as Relationship, b as Style } from './document-DktZDMbO.cjs';
import { A as AgentCommand, R as Range, S as SelectionContext$1, a as AgentContext, P as Position } from './agentApi-D6BWmIeb.cjs';
export { b as AIAction, c as AIActionRequest, d as AgentResponse, e as ApplyStyleCommand, f as ApplyVariablesCommand, D as DEFAULT_AI_ACTIONS, g as DeleteTextCommand, F as FormatParagraphCommand, h as FormatTextCommand, I as InsertHyperlinkCommand, i as InsertImageCommand, j as InsertTableCommand, k as InsertTextCommand, l as ParagraphContext, m as ParagraphOutline, n as ReplaceTextCommand, o as SectionInfo, p as SetVariableCommand, q as StyleInfo, r as SuggestedAction, s as comparePositions, t as createCollapsedRange, u as createCommand, v as createRange, w as getActionDescription, x as getActionLabel, y as isPositionInRange } from './agentApi-D6BWmIeb.cjs';
import { T as TextFormatting, D as DocumentBody, P as Paragraph, H as Hyperlink, R as Run, a as Table, S as SdtType, b as SdtProperties, c as SectionProperties, W as Watermark, d as ParagraphFormatting, C as ColorValue, e as ThemeColorSlot } from './run-DQbevRIu.cjs';
export { B as BlockContent, f as Comment, g as CommentRangeEnd, h as CommentRangeStart, i as Deletion, E as Endnote, F as Footnote, I as Image, j as Insertion, L as ListLevel, M as MoveFrom, k as MoveTo, N as NumberingDefinitions, l as ParagraphContent, m as RunContent, n as TableCell, o as TableRow, p as TextContent, q as TrackedChangeInfo, r as TrackedRunChange } from './run-DQbevRIu.cjs';
import * as prosemirror_model from 'prosemirror-model';
import { Node, Schema, NodeSpec, MarkSpec } from 'prosemirror-model';
import { Command, Plugin } from 'prosemirror-state';

/**
 * Command Executor
 *
 * Executes agent commands on a document immutably:
 * - Handles all command types from AgentCommand
 * - Preserves surrounding formatting
 * - Returns new document (immutable updates)
 *
 * Per-command handlers live under `executor/` by domain (text edits,
 * paragraph splits/merges, structural inserts, template variables).
 * Shared helpers (clone, lookup, text-range edits) live in
 * `executor/helpers.ts`.
 */

/**
 * Execute an agent command on a document
 * Returns a new document with the command applied (immutable)
 *
 * Dispatch order:
 * 1. Try plugin handlers first (allows plugins to override built-in commands)
 * 2. Fall back to built-in handlers
 *
 * @param doc - The document to modify
 * @param command - The command to execute
 * @returns New document with command applied
 */
declare function executeCommand(doc: Document, command: AgentCommand): Document;
/**
 * Execute multiple commands in sequence
 *
 * @param doc - The document to modify
 * @param commands - Commands to execute in order
 * @returns New document with all commands applied
 */
declare function executeCommands(doc: Document, commands: AgentCommand[]): Document;

/**
 * Agent Context Builder
 *
 * Generates context objects for AI/LLM consumption from DOCX documents.
 * The context provides a structured summary of the document that can be
 * used by AI agents to understand the document structure and content.
 *
 * All outputs are JSON serializable for easy transmission to AI backends.
 */

/**
 * Options for building agent context
 */
interface AgentContextOptions {
    /** Maximum characters per paragraph in outline (default: 100) */
    outlineMaxChars?: number;
    /** Maximum paragraphs to include in outline (default: 50) */
    maxOutlineParagraphs?: number;
    /** Include table content in context (default: false) */
    includeTableContent?: boolean;
    /** Include detailed formatting info (default: false) */
    includeFormatting?: boolean;
}
/**
 * Options for building selection context
 */
interface SelectionContextOptions$1 {
    /** Characters of context before/after selection (default: 200) */
    contextChars?: number;
    /** Include suggested actions (default: true) */
    includeSuggestions?: boolean;
}
/**
 * Build agent context from a document
 *
 * @param doc - The parsed document
 * @param options - Context building options
 * @returns AgentContext object (JSON serializable)
 */
declare function getAgentContext(doc: Document, options?: AgentContextOptions): AgentContext;
/**
 * Build selection context for AI operations
 *
 * @param doc - The parsed document
 * @param range - The selected range
 * @param options - Selection context options
 * @returns SelectionContext object (JSON serializable)
 */
declare function buildSelectionContext$1(doc: Document, range: Range, options?: SelectionContextOptions$1): SelectionContext$1;
/**
 * Get a simple document summary for quick context
 *
 * @param doc - The parsed document
 * @returns Summary string
 */
declare function getDocumentSummary(doc: Document): string;

/**
 * Selection Context Builder
 *
 * Builds rich context objects from document selections for AI operations.
 * Includes selected text, formatting, surrounding context, and suggested actions.
 */

/**
 * Options for building selection context
 */
interface SelectionContextOptions {
    /** Characters of context before selection (default: 200) */
    contextCharsBefore?: number;
    /** Characters of context after selection (default: 200) */
    contextCharsAfter?: number;
    /** Include suggested actions (default: true) */
    includeSuggestions?: boolean;
    /** Include document summary (default: true) */
    includeDocumentSummary?: boolean;
    /** Maximum suggested actions (default: 8) */
    maxSuggestions?: number;
}
/**
 * Extended selection context with additional details
 */
interface ExtendedSelectionContext extends SelectionContext$1 {
    /** Document summary for additional context */
    documentSummary?: string;
    /** Selection word count */
    wordCount?: number;
    /** Selection character count */
    characterCount?: number;
    /** Is selection multi-paragraph */
    isMultiParagraph?: boolean;
    /** Selected paragraph indices */
    paragraphIndices?: number[];
    /** Language detection hint */
    detectedLanguage?: string;
    /** Content type hints */
    contentType?: 'prose' | 'list' | 'heading' | 'table' | 'mixed';
}
/**
 * Selection formatting summary
 */
interface FormattingSummary {
    /** Predominant formatting */
    predominant: Partial<TextFormatting>;
    /** Is formatting consistent across selection */
    isConsistent: boolean;
    /** All formatting found */
    allFormatting: Partial<TextFormatting>[];
}
/**
 * Build selection context for AI operations
 *
 * @param doc - The parsed document
 * @param range - The selected range
 * @param options - Selection context options
 * @returns SelectionContext object
 */
declare function buildSelectionContext(doc: Document, range: Range, options?: SelectionContextOptions): SelectionContext$1;
/**
 * Build extended selection context with additional details
 *
 * @param doc - The parsed document
 * @param range - The selected range
 * @param options - Selection context options
 * @returns ExtendedSelectionContext object
 */
declare function buildExtendedSelectionContext(doc: Document, range: Range, options?: SelectionContextOptions): ExtendedSelectionContext;
/**
 * Get formatting summary for a selection
 *
 * @param doc - The parsed document
 * @param range - The selected range
 * @returns FormattingSummary object
 */
declare function getSelectionFormattingSummary(doc: Document, range: Range): FormattingSummary;

/**
 * Shared Text Utilities for Agent Module
 *
 * Common text extraction and manipulation utilities used by
 * context.ts, selectionContext.ts, and other agent-related code.
 *
 * Consolidates duplicated helper functions into a single location.
 */

/**
 * Get plain text from a paragraph
 */
declare function getParagraphText(paragraph: Paragraph): string;
/**
 * Get plain text from a run
 */
declare function getRunText(run: Run): string;
/**
 * Get plain text from a hyperlink
 */
declare function getHyperlinkText(hyperlink: Hyperlink): string;
/**
 * Get plain text from a table
 */
declare function getTableText(table: Table): string;
/**
 * Get plain text from document body
 */
declare function getBodyText(body: DocumentBody): string;
/**
 * Count words in text
 */
declare function countWords(text: string): number;
/**
 * Count characters in text
 */
declare function countCharacters(text: string, includeSpaces?: boolean): number;
/**
 * Get word count from document body
 */
declare function getBodyWordCount(body: DocumentBody): number;
/**
 * Get character count from document body
 */
declare function getBodyCharacterCount(body: DocumentBody): number;
/**
 * Get text before a position
 *
 * @param paragraphs - Array of paragraphs
 * @param position - Position to get text before
 * @param maxChars - Maximum characters to return
 * @returns Text before the position
 */
declare function getTextBefore(paragraphs: Paragraph[], position: Position, maxChars: number): string;
/**
 * Get text after a position
 *
 * @param paragraphs - Array of paragraphs
 * @param position - Position to get text after
 * @param maxChars - Maximum characters to return
 * @returns Text after the position
 */
declare function getTextAfter(paragraphs: Paragraph[], position: Position, maxChars: number): string;
/**
 * Get formatting at a specific position in a paragraph
 *
 * @param paragraph - The paragraph to check
 * @param offset - Character offset in the paragraph
 * @returns Formatting at that position
 */
declare function getFormattingAtPosition(paragraph: Paragraph, offset: number): Partial<TextFormatting>;
/**
 * Check if position is within a hyperlink
 *
 * @param paragraph - The paragraph to check
 * @param offset - Character offset in the paragraph
 * @returns True if position is in a hyperlink
 */
declare function isPositionInHyperlink(paragraph: Paragraph, offset: number): boolean;
/**
 * Get hyperlink at position
 *
 * @param paragraph - The paragraph to check
 * @param offset - Character offset in the paragraph
 * @returns The hyperlink at that position, or undefined
 */
declare function getHyperlinkAtPosition(paragraph: Paragraph, offset: number): Hyperlink | undefined;
/**
 * Check if style ID represents a heading
 *
 * @param styleId - Style ID to check
 * @returns True if it's a heading style
 */
declare function isHeadingStyle(styleId?: string): boolean;
/**
 * Parse heading level from style ID
 *
 * @param styleId - Style ID to parse
 * @returns Heading level (1-9) or undefined
 */
declare function parseHeadingLevel(styleId?: string): number | undefined;
/**
 * Check if document body has images
 *
 * @param body - Document body to check
 * @returns True if contains images
 */
declare function hasImages(body: DocumentBody): boolean;
/**
 * Check if document body has hyperlinks
 *
 * @param body - Document body to check
 * @returns True if contains hyperlinks
 */
declare function hasHyperlinks(body: DocumentBody): boolean;
/**
 * Check if document body has tables
 *
 * @param body - Document body to check
 * @returns True if contains tables
 */
declare function hasTables(body: DocumentBody): boolean;
/**
 * Get all paragraphs from document body
 *
 * @param body - Document body
 * @returns Array of paragraphs
 */
declare function getParagraphs(body: DocumentBody): Paragraph[];
/**
 * Get paragraph at index from document body
 *
 * @param body - Document body
 * @param index - Paragraph index (0-indexed)
 * @returns Paragraph or undefined
 */
declare function getParagraphAtIndex(body: DocumentBody, index: number): Paragraph | undefined;
/**
 * Get block index for a paragraph index
 *
 * @param body - Document body
 * @param paragraphIndex - Paragraph index
 * @returns Block index or -1 if not found
 */
declare function getBlockIndexForParagraph(body: DocumentBody, paragraphIndex: number): number;

/**
 * Create a new inline content control (`w:sdt`) by wrapping a text span.
 *
 * Complements the discovery/edit functions in {@link ./contentControls}: where
 * those find and mutate existing controls, this wraps an exact run of text
 * inside a paragraph in a new control with a synthesized, Word-correct
 * `w:sdtPr`. Pure — the input {@link Document} is not mutated.
 */

/** A create request failed: the target couldn't be resolved, or the wrap is invalid. */
declare class ContentControlCreateError extends Error {
    constructor(message: string);
}
/**
 * Where to create a control: an exact text span inside a paragraph. The
 * paragraph is located by Word `w14:paraId`, and the chosen `occurrence` of
 * `text` is wrapped in an inline control — including inside a table cell, where
 * block-level controls aren't allowed.
 */
interface CreateContentControlTarget {
    /** Word `w14:paraId` of the paragraph containing the text. */
    paraId: string;
    /** Exact substring to wrap. */
    text: string;
    /** Which occurrence of `text` to wrap when it repeats (1-based; default 1). */
    occurrence?: number;
}
/** Modeled properties for a control created by {@link createContentControl}. */
interface NewContentControlProps {
    /** Control type (default `richText`). */
    sdtType?: SdtType;
    /** Developer identifier (`w:tag`). */
    tag?: string;
    /** Friendly name (`w:alias`). */
    alias?: string;
    /** Numeric id (`w:id`). Default: auto-assigned, unique across the document. */
    id?: number;
    /** Lock setting (`w:lock`). */
    lock?: SdtProperties['lock'];
    /** Dropdown/combobox list items. */
    listItems?: {
        displayText: string;
        value: string;
    }[];
    /** Date display format (`w:date/w:dateFormat`), for `date` controls. */
    dateFormat?: string;
    /** Initial checkbox state, for `checkbox` controls. */
    checked?: boolean;
    /** Whether the control starts in placeholder state (`w:showingPlcHdr`). */
    showingPlaceholder?: boolean;
}
/**
 * Wrap an exact text span inside a paragraph in a new inline content control
 * (`w:sdt`), returning a new {@link Document} and the created control's
 * {@link ContentControlInfo}. Pure — the input is not mutated. This is the form
 * needed inside table cells and mid-sentence, where block controls aren't
 * allowed: runs are split at the span boundaries (formatting preserved) and
 * interior fields/tabs/breaks are kept wholesale.
 *
 * The control's `w:sdtPr` is synthesized from `props`, and its `w:id` is
 * auto-assigned (unique across the document) when `props.id` is omitted, so the
 * control round-trips and `findContentControl(doc, { tag })` resolves it after a
 * save/reload.
 *
 * **Body only:** the search covers body paragraphs and block/table content —
 * paragraphs inside headers or footers are not reachable. Passing a `paraId`
 * from a header/footer part throws {@link ContentControlCreateError} with a
 * "No paragraph found" message.
 *
 * @throws {@link ContentControlCreateError} when the paragraph or text isn't
 * found, the span overlaps an existing control or crosses a non-run boundary,
 * the `sdtType` can't be synthesized, or a supplied `id` already exists.
 */
declare function createContentControl(doc: Document, target: CreateContentControlTarget, props?: NewContentControlProps): {
    doc: Document;
    control: ContentControlInfo;
};

/**
 * Repeating-section (w15:repeatingSection) support — add and remove repeated
 * items, the way Word's "+" affordance does. A repeating section is a block
 * content control whose `w:sdtPr` carries `<w15:repeatingSection>`; its direct
 * children are item controls each carrying `<w15:repeatingSectionItem>`.
 *
 * Adding clones an existing item (with a fresh, unique `w:id`) and inserts it
 * after; removing drops one item but keeps at least one. The w15 elements ride
 * in the captured raw `w:sdtPr` (they're unmodeled), so we detect and patch the
 * raw string rather than re-serializing.
 */

/** The control's raw `w:sdtPr` declares it a repeating section (the container). */
declare function isRepeatingSection(props: SdtProperties): boolean;
/** The control's raw `w:sdtPr` declares it a repeating-section item. */
declare function isRepeatingSectionItem(props: SdtProperties): boolean;
/** Raised when an operation targets something that isn't a repeating section/item. */
declare class RepeatingSectionError extends Error {
    constructor(message: string);
}
/**
 * Add a new repeating-section item, cloned from an existing one and inserted
 * after it. `afterIndex` is the item ordinal to clone/insert after (default:
 * the last item). Returns a new {@link Document}.
 */
declare function addRepeatingSectionItem(doc: Document, filter: ContentControlFilter, options?: {
    afterIndex?: number;
}): Document;
/**
 * Remove the repeating-section item at ordinal `index`. Keeps at least one item
 * (Word does not allow removing the last). Returns a new {@link Document}.
 */
declare function removeRepeatingSectionItem(doc: Document, filter: ContentControlFilter, index: number): Document;

/**
 * Main Parser Orchestrator - Unified parseDocx function
 *
 * Coordinates all sub-parsers to produce a complete Document model.
 * Handles loading order, dependency resolution, and font preloading.
 *
 * Parsing order:
 * 1. Unzip DOCX package
 * 2. Parse relationships
 * 3. Parse theme (needed for style color/font resolution)
 * 4. Parse styles (depends on theme)
 * 5. Parse numbering
 * 6. Parse document body (depends on styles, theme, numbering, rels)
 * 7. Parse headers/footers (depends on styles, theme, numbering, rels)
 * 8. Parse footnotes/endnotes (depends on styles, theme, numbering, rels)
 * 9. Extract and load fonts
 * 10. Build media file map
 * 11. Assemble final Document
 * @packageDocumentation
 * @public
 */

/**
 * Progress callback for tracking parsing stages
 */
type ProgressCallback = (stage: string, percent: number) => void;
/**
 * Parsing options
 */
interface ParseOptions {
    /** Progress callback for tracking parsing stages */
    onProgress?: ProgressCallback;
    /** Whether to preload fonts (default: true) */
    preloadFonts?: boolean;
    /** Whether to parse headers/footers (default: true) */
    parseHeadersFooters?: boolean;
    /** Whether to parse footnotes/endnotes (default: true) */
    parseNotes?: boolean;
    /** Whether to detect template variables (default: true) */
    detectVariables?: boolean;
}
/**
 * Parse a DOCX file into a complete Document model
 *
 * @param input - DOCX file as ArrayBuffer, Uint8Array, Blob, or File
 * @param options - Parsing options
 * @returns Promise resolving to Document
 * @throws Error if parsing fails
 */
declare function parseDocx(input: DocxInput, options?: ParseOptions): Promise<Document>;

/**
 * Document Serializer - Serialize complete document.xml
 *
 * Converts Document objects back to valid document.xml OOXML format.
 * Combines all content (paragraphs, tables) with section properties
 * and proper namespace declarations.
 *
 * OOXML Reference:
 * - Document root: w:document
 * - Document body: w:body
 * - Section properties: w:sectPr
 */

/**
 * Serialize a DocumentBody to document.xml body content
 *
 * @param body - The document body to serialize
 * @returns XML string for the body element (without body tags)
 */
declare function serializeDocumentBody(body: DocumentBody): string;
/**
 * Serialize a complete Document to valid document.xml
 *
 * @param doc - The document to serialize
 * @returns Complete XML string for document.xml
 */
declare function serializeDocument(doc: Document): string;

/**
 * Section Properties Serializer - Serialize w:sectPr
 *
 * Converts SectionProperties back to OOXML `<w:sectPr>`. Used both for the
 * final `w:body/w:sectPr` (last section) and for mid-body section breaks
 * carried on a paragraph via `w:pPr/w:sectPr`.
 *
 * OOXML Reference:
 * - Section properties: w:sectPr (ECMA-376 §17.6.17)
 * - A paragraph-level sectPr (`w:pPr/w:sectPr`) marks the end of a section;
 *   the trailing `w:body/w:sectPr` describes the final section.
 */

/**
 * Serialize section properties (w:sectPr)
 */
declare function serializeSectionProperties(props: SectionProperties | undefined): string;

/**
 * DOCX Repacker - Repack modified document into valid DOCX
 *
 * Takes a Document with modified content and creates a new DOCX file
 * by updating document.xml while preserving all other files from
 * the original ZIP archive.
 *
 * This ensures round-trip fidelity:
 * - styles.xml, theme1.xml, fontTable.xml remain untouched
 * - Media files preserved
 * - Relationships preserved
 * - Only document.xml is updated with new content
 *
 * OOXML Package Structure:
 * - [Content_Types].xml - Content type declarations
 * - _rels/.rels - Package relationships
 * - word/document.xml - Main document (modified)
 * - word/styles.xml - Styles (preserved)
 * - word/theme/theme1.xml - Theme (preserved)
 * - word/numbering.xml - Numbering (preserved)
 * - word/fontTable.xml - Font table (preserved)
 * - word/settings.xml - Settings (preserved)
 * - word/header*.xml - Headers (preserved)
 * - word/footer*.xml - Footers (preserved)
 * - word/footnotes.xml - Footnotes (preserved)
 * - word/endnotes.xml - Endnotes (preserved)
 * - word/media/* - Media files (preserved)
 * - word/_rels/document.xml.rels - Document relationships (preserved)
 * - docProps/* - Document properties (preserved)
 *
 * Orchestrators (repackDocx, selective updates, validation, create-empty)
 * live here. Per-domain helpers — part enumeration, new-image registration,
 * new-hyperlink registration, header/footer & comment packaging, and the
 * empty-DOCX template — live under ./rezip/.
 * @packageDocumentation
 * @public
 */

/**
 * Options for repacking DOCX
 */
interface RepackOptions {
    /** Compression level (0-9, default: 6) */
    compressionLevel?: number;
    /** Whether to update modification date in docProps/core.xml */
    updateModifiedDate?: boolean;
    /** Custom modifier name for lastModifiedBy */
    modifiedBy?: string;
}
/**
 * Repack a Document into a valid DOCX file
 *
 * @param doc - Document with modified content
 * @param options - Optional repack options
 * @returns Promise resolving to DOCX as ArrayBuffer
 * @throws Error if document has no original buffer for round-trip
 */
declare function repackDocx(doc: Document, options?: RepackOptions): Promise<ArrayBuffer>;
/**
 * Update multiple files in a DOCX buffer
 *
 * @param originalBuffer - Original DOCX as ArrayBuffer
 * @param updates - Map of path -> content for files to update
 * @param options - Optional repack options
 * @returns Promise resolving to DOCX as ArrayBuffer
 */
declare function updateMultipleFiles(originalBuffer: ArrayBuffer, updates: Map<string, string | ArrayBuffer>, options?: RepackOptions): Promise<ArrayBuffer>;
/**
 * Create a new DOCX from a Document (without requiring original buffer)
 *
 * @param doc - Document to serialize
 * @returns Promise resolving to DOCX as ArrayBuffer
 */
declare function createDocx(doc: Document): Promise<ArrayBuffer>;

/**
 * Watermark document API
 *
 * Platform-agnostic helpers for reading and applying a document watermark.
 * Shared by the React and Vue adapters (and the imperative ref API) so the
 * "Design → Watermark" behavior stays identical across frameworks.
 *
 * A watermark lives on `HeaderFooter.watermark`. MS Word repeats the same
 * watermark across the default, first-page, and even-page headers of every
 * section, so `setDocumentWatermark`:
 *
 * 1. Applies the watermark (a per-header copy) to every existing header, and
 * 2. Creates the header parts a section needs but lacks, so the watermark
 *    still shows on title pages (`w:titlePg`) and even pages
 *    (`w:evenAndOddHeaders`) and on documents that had no header at all.
 *
 * To avoid breaking header inheritance (a section that omits a header
 * reference inherits the previous section's header — Word's "link to
 * previous"), a missing `first`/`even` header part is only created when **no**
 * header of that type exists anywhere in the document, i.e. there is nothing to
 * inherit. All updates are immutable — a new `Document` is returned so the
 * change lands in the host's undo/redo history.
 */

/** Read the document's watermark (the first header that carries one). */
declare function getDocumentWatermark(doc: Document | null | undefined): Watermark | undefined;
/**
 * Return a new `Document` with the watermark applied to all headers, or removed
 * when `watermark` is null. Creates the header parts a section needs but lacks
 * (default for a headerless doc; first/even for title/even pages) so the
 * watermark shows on every page MS Word would show it.
 */
declare function setDocumentWatermark(doc: Document, watermark: Watermark | null): Document;

interface PatchValidationResult {
    safe: boolean;
    reason?: string;
}
/**
 * Validate that a selective patch can be safely applied.
 *
 * Checks:
 * - All changed paraIds exist in original XML (exactly once)
 * - All changed paraIds exist in serialized XML (exactly once)
 * - Paragraph count matches between original and serialized
 */
declare function validatePatchSafety(originalXml: string, serializedXml: string, changedIds: Set<string>): PatchValidationResult;
/**
 * Build a patched document.xml by splicing new paragraph XML into
 * the original at the correct offsets. Only changed paragraphs
 * are replaced; everything else is preserved byte-for-byte.
 *
 * Returns null if any step fails.
 */
declare function buildPatchedDocumentXml(originalXml: string, serializedXml: string, changedIds: Set<string>): string | null;

/**
 * Document to ProseMirror Conversion
 *
 * Converts our Document type (from DOCX parsing) to a ProseMirror document.
 * Preserves all formatting attributes for round-trip fidelity.
 *
 * Style Resolution:
 * When styles are provided, paragraph properties are resolved from the style chain:
 * - Document defaults (docDefaults)
 * - Normal style (if no explicit styleId)
 * - Style chain (basedOn inheritance)
 * - Inline properties (highest priority)
 *
 * This file owns the top-level entry points (toProseDoc, headerFooterToProseDoc,
 * footnoteToProseDoc, createEmptyDoc). Per-domain converters live under
 * ./toProseDoc/ (marks, runs, paragraph, tables, textbox) — symmetric to
 * the fromProseDoc/ split.
 */

/**
 * Options for document conversion
 */
interface ToProseDocOptions {
    /** Style definitions for resolving paragraph styles */
    styles?: StyleDefinitions;
    /**
     * Doc-level `w:defaultTabStop` (§17.6.13) in twips, stamped onto the PM
     * doc node so `toFlowBlocks` picks it up. The body entry point reads
     * this from the parsed package; HF/footnote callers must pass it
     * through explicitly since their input is a content array, not a full
     * `Document`. Falls back to the OOXML default (720 twips) when null.
     */
    defaultTabStopTwips?: number | null;
}
/**
 * Convert a Document to a ProseMirror document
 *
 * @param document - The Document to convert
 * @param options - Conversion options including style definitions
 */
declare function toProseDoc(document: Document, options?: ToProseDocOptions): Node;
/**
 * Create an empty ProseMirror document
 */
declare function createEmptyDoc(): Node;

/**
 * ProseMirror to Document Conversion
 *
 * Converts a ProseMirror document back to our Document type.
 * This enables round-trip editing: DOCX -> Document -> PM -> Document -> DOCX
 *
 * Key responsibilities:
 * - Coalesce consecutive text with same marks into single Runs
 * - Preserve paragraph attributes (paraId, textId, formatting)
 * - Handle marks -> TextFormatting conversion
 *
 * This file owns the top-level orchestrator (`fromProseDoc`) plus block
 * extraction and the page-break paragraph factory. Per-domain converters
 * live under ./fromProseDoc/ (marks, runs, paragraph, tables, textbox).
 * The deep import `docx-editor-react/.../prosemirror/conversion/fromProseDoc` is
 * a tsup entry consumed by the Vue adapter — the barrel re-exports
 * preserve that surface.
 * @packageDocumentation
 * @public
 */

/**
 * Convert a ProseMirror document to our Document type
 */
declare function fromProseDoc(pmDoc: Node, baseDocument?: Document): Document;

/**
 * Extension System Type Definitions
 *
 * Tiptap-style extension architecture for ProseMirror.
 * Three extension types:
 * - Extension: plugins, commands, keymaps (no schema)
 * - NodeExtension: adds a node spec to the schema
 * - MarkExtension: adds a mark spec to the schema
 */

type ExtensionPriority = number;
interface ExtensionContext {
    schema: Schema;
    /**
     * The manager that owns this extension. Use this in runtime callbacks
     * (e.g. `handleKeyDown`) that need to dispatch commands, instead of
     * reaching back to the `singletonManager` export — the latter forms a
     * circular import that breaks when the package is consumed as a built
     * bundle.
     */
    manager: ExtensionManager;
}
type CommandMap = Record<string, (...args: any[]) => Command>;
type KeyboardShortcutMap = Record<string, Command>;
interface ExtensionRuntime {
    commands?: CommandMap;
    keyboardShortcuts?: KeyboardShortcutMap;
    plugins?: Plugin[];
}
interface ExtensionConfig {
    name: string;
    priority: ExtensionPriority;
    options: Record<string, unknown>;
}
interface NodeExtensionConfig extends ExtensionConfig {
    schemaNodeName: string;
    nodeSpec: NodeSpec;
}
interface MarkExtensionConfig extends ExtensionConfig {
    schemaMarkName: string;
    markSpec: MarkSpec;
}
interface Extension {
    type: 'extension';
    config: ExtensionConfig;
    onSchemaReady(ctx: ExtensionContext): ExtensionRuntime;
}
interface NodeExtension {
    type: 'node';
    config: NodeExtensionConfig;
    onSchemaReady(ctx: ExtensionContext): ExtensionRuntime;
}
interface MarkExtension {
    type: 'mark';
    config: MarkExtensionConfig;
    onSchemaReady(ctx: ExtensionContext): ExtensionRuntime;
}
type AnyExtension = Extension | NodeExtension | MarkExtension;

/**
 * Extension Manager
 *
 * Two-phase initialization:
 * 1. buildSchema() — collects NodeSpecs/MarkSpecs from extensions → new Schema
 * 2. initializeRuntime() — calls onSchemaReady() on each extension, collects plugins/commands/keymaps
 */

declare class ExtensionManager {
    private extensions;
    private schema;
    private plugins;
    private commands;
    constructor(extensions: AnyExtension[]);
    /**
     * Phase 1: Build schema from node/mark extensions
     */
    buildSchema(): void;
    /**
     * Phase 2: Initialize runtime (plugins, commands, keymaps)
     * Must be called after buildSchema()
     */
    initializeRuntime(): void;
    /**
     * Get the built schema
     */
    getSchema(): Schema;
    /**
     * Get all plugins (raw + keymap merged)
     */
    getPlugins(): Plugin[];
    /**
     * Get the flat command registry
     */
    getCommands(): CommandMap;
    /**
     * Get a specific command by name
     */
    getCommand(name: string): ((...args: any[]) => Command) | undefined;
    /**
     * Lifecycle: destroy
     */
    destroy(): void;
}

declare const singletonManager: ExtensionManager;
declare const schema: prosemirror_model.Schema<any, any>;
/**
 * Export types for convenience
 */
type DocxSchema = typeof schema;

/**
 * Selection Tracker Plugin
 *
 * Tracks selection changes and emits events for toolbar state updates.
 * Provides the current selection context including:
 * - Text formatting at cursor/selection
 * - Paragraph formatting
 * - Selection range information
 * @packageDocumentation
 * @public
 */

/**
 * Selection context for toolbar state
 */
interface SelectionContext {
    /** Whether there's a non-collapsed selection */
    hasSelection: boolean;
    /** Whether selection spans multiple paragraphs */
    isMultiParagraph: boolean;
    /** Current text formatting at cursor/selection */
    textFormatting: TextFormatting;
    /** Current paragraph formatting */
    paragraphFormatting: ParagraphFormatting;
    /** Start paragraph index */
    startParagraphIndex: number;
    /** End paragraph index */
    endParagraphIndex: number;
    /** Whether cursor is in a list */
    inList: boolean;
    /** List type if in list */
    listType?: 'bullet' | 'numbered';
    /** List level (0-8) */
    listLevel?: number;
    /** Active comment IDs at cursor position */
    activeCommentIds: number[];
    /** Whether cursor is inside a tracked insertion */
    inInsertion: boolean;
    /** Whether cursor is inside a tracked deletion */
    inDeletion: boolean;
}
/**
 * Callback type for selection changes
 */
type SelectionChangeCallback = (context: SelectionContext) => void;

/**
 * StarterKit — bundles all extensions into a ready-to-use set
 *
 * Usage:
 *   const extensions = createStarterKit();
 *   const manager = new ExtensionManager(extensions);
 *   manager.buildSchema();
 *   manager.initializeRuntime();
 */

interface StarterKitOptions {
    /** Extensions to disable by name */
    disable?: string[];
    /** History depth (default: 100) */
    historyDepth?: number;
    /** History new group delay (default: 500) */
    historyNewGroupDelay?: number;
    /** Selection change callback */
    onSelectionChange?: SelectionChangeCallback;
}
/**
 * Create the full set of extensions for the DOCX editor
 */
declare function createStarterKit(options?: StarterKitOptions): AnyExtension[];

/**
 * Template Processing Utility
 *
 * Uses docxtemplater to substitute template variables in DOCX documents:
 * - Processes {variable_name} patterns (docxtemplater default syntax)
 * - Preserves all formatting (fonts, styles, colors, tables)
 * - Error handling with useful messages
 */
/**
 * Options for template processing
 */
interface ProcessTemplateOptions {
    /** How to handle undefined variables */
    nullGetter?: 'keep' | 'empty' | 'error';
    /** Custom parser for variable names */
    parser?: (tag: string) => {
        get: (scope: Record<string, unknown>) => unknown;
    };
    /** Line breaks: keep raw \n or convert to w:br */
    linebreaks?: boolean;
    /** Delimiter settings */
    delimiters?: {
        start?: string;
        end?: string;
    };
}
/**
 * Result of template processing
 */
interface ProcessTemplateResult {
    /** The processed document buffer */
    buffer: ArrayBuffer;
    /** Variables that were found and replaced */
    replacedVariables: string[];
    /** Variables that were not replaced (no value provided) */
    unreplacedVariables: string[];
    /** Any warnings during processing */
    warnings: string[];
}
/**
 * Error details from template processing
 */
interface TemplateError {
    /** Error message */
    message: string;
    /** Variable name that caused the error (if applicable) */
    variable?: string;
    /** Error type */
    type: 'parse' | 'render' | 'undefined' | 'unknown';
    /** Original error */
    originalError?: Error;
}
/**
 * Process a DOCX template with variable substitution
 *
 * @param buffer - The DOCX file as ArrayBuffer
 * @param variables - Map of variable names to values
 * @param options - Processing options
 * @returns Processed DOCX as ArrayBuffer
 */
declare function processTemplate(buffer: ArrayBuffer, variables: Record<string, string>, options?: ProcessTemplateOptions): ArrayBuffer;
/**
 * Process template with detailed result
 *
 * @param buffer - The DOCX file as ArrayBuffer
 * @param variables - Map of variable names to values
 * @param options - Processing options
 * @returns Detailed processing result
 */
declare function processTemplateDetailed(buffer: ArrayBuffer, variables: Record<string, string>, options?: ProcessTemplateOptions): ProcessTemplateResult;
/**
 * Process template and return as Blob
 *
 * @param buffer - The DOCX file as ArrayBuffer
 * @param variables - Map of variable names to values
 * @param options - Processing options
 * @returns Processed DOCX as Blob
 */
declare function processTemplateAsBlob(buffer: ArrayBuffer, variables: Record<string, string>, options?: ProcessTemplateOptions): Blob;
/**
 * Get all template tags in a document without processing
 *
 * @param buffer - The DOCX file as ArrayBuffer
 * @returns List of tag names found
 */
declare function getTemplateTags(buffer: ArrayBuffer): string[];
/**
 * Validate that a document is a valid docxtemplater template
 *
 * @param buffer - The DOCX file as ArrayBuffer
 * @returns Validation result
 */
declare function validateTemplate(buffer: ArrayBuffer): {
    valid: boolean;
    errors: TemplateError[];
    tags: string[];
};
/**
 * Check if all required variables have values
 *
 * @param tags - List of template tags
 * @param variables - Provided variable values
 * @returns Missing variable names
 */
declare function getMissingVariables(tags: string[], variables: Record<string, string>): string[];
/**
 * Preview what the document will look like after processing
 * Returns the document text with variables replaced (for preview purposes)
 *
 * @param buffer - The DOCX file as ArrayBuffer
 * @param variables - Map of variable names to values
 * @returns Preview text
 */
declare function previewTemplate(buffer: ArrayBuffer, variables: Record<string, string>): string;
/**
 * Process template with conditional sections
 * Supports #if, #unless, #each loops
 *
 * @param buffer - The DOCX file as ArrayBuffer
 * @param data - Full data object (can include arrays, nested objects)
 * @param options - Processing options
 * @returns Processed DOCX as ArrayBuffer
 */
declare function processTemplateAdvanced(buffer: ArrayBuffer, data: Record<string, unknown>, options?: ProcessTemplateOptions): ArrayBuffer;
/**
 * Create a template processor with preset options
 */
declare function createTemplateProcessor(defaultOptions?: ProcessTemplateOptions): (buffer: ArrayBuffer, variables: Record<string, string>) => ArrayBuffer;

/**
 * Variable Detector Utility
 *
 * Scans a DOCX document for template variables in the format {variable_name}
 * (standard docxtemplater syntax).
 * Returns a unique, sorted list of variable names found in the document.
 */

/**
 * Result of variable detection
 */
interface VariableDetectionResult {
    /** Unique variable names sorted alphabetically */
    variables: string[];
    /** Total count of variable occurrences */
    totalOccurrences: number;
    /** Variables by location */
    byLocation: {
        body: string[];
        headers: string[];
        footers: string[];
        footnotes: string[];
        endnotes: string[];
        textBoxes: string[];
    };
    /** Variable occurrences with positions */
    occurrences: VariableOccurrence[];
}
/**
 * A single variable occurrence with location info
 */
interface VariableOccurrence {
    /** Variable name (without braces) */
    name: string;
    /** Location type */
    location: 'body' | 'header' | 'footer' | 'footnote' | 'endnote' | 'textBox';
    /** Paragraph index within location */
    paragraphIndex?: number;
    /** Section index (for headers/footers) */
    sectionIndex?: number;
}
/**
 * Detect all template variables in a document
 *
 * @param doc - The parsed document
 * @returns Array of unique variable names sorted alphabetically
 */
declare function detectVariables(doc: Document): string[];
/**
 * Detect variables with detailed information
 *
 * @param doc - The parsed document
 * @returns Detailed detection result
 */
declare function detectVariablesDetailed(doc: Document): VariableDetectionResult;
/**
 * Detect variables in document body
 */
declare function detectVariablesInBody(body: DocumentBody): string[];
/**
 * Detect variables in a paragraph
 */
declare function detectVariablesInParagraph(paragraph: Paragraph): string[];
/**
 * Extract variable names from text
 *
 * @param text - The text to search
 * @returns Array of variable names (without braces)
 */
declare function extractVariablesFromText(text: string): string[];
/**
 * Check if text contains template variables
 */
declare function hasTemplateVariables(text: string): boolean;
/**
 * Check if a variable name is valid
 */
declare function isValidVariableName(name: string): boolean;
/**
 * Sanitize a variable name
 */
declare function sanitizeVariableName(name: string): string;
/**
 * Format a variable name with braces (standard docxtemplater syntax)
 */
declare function formatVariable(name: string): string;
/**
 * Parse a variable string to get the name
 */
declare function parseVariable(variable: string): string | null;
/**
 * Replace variables in text with values
 *
 * @param text - The text containing variables
 * @param values - Map of variable name to replacement value
 * @returns Text with variables replaced
 */
declare function replaceVariables(text: string, values: Record<string, string>): string;
/**
 * Replace all variables in text with a placeholder
 *
 * @param text - The text containing variables
 * @param placeholder - Placeholder to use (default: empty string)
 * @returns Text with variables replaced
 */
declare function removeVariables(text: string, placeholder?: string): string;
/**
 * Check if document has any template variables
 */
declare function documentHasVariables(doc: Document): boolean;

/**
 * Convert twips to pixels (at 96 DPI)
 *
 * 1 inch = 1440 twips = 96 pixels
 * → 1 twip = 96/1440 pixels = 1/15 pixels
 */
declare function twipsToPixels(twips: number): number;
/**
 * Convert pixels to twips
 */
declare function pixelsToTwips(px: number): number;
/**
 * Convert EMUs to pixels (at 96 DPI)
 *
 * 1 inch = 914400 EMUs = 96 pixels
 * Returns 0 for null/undefined/NaN inputs.
 */
declare function emuToPixels(emu: number | undefined | null): number;
/**
 * Convert pixels to EMUs.
 * EMU coordinates in OOXML are integer-typed (xs:long); rounding here keeps
 * floating-point drift (e.g. 52 px → 495299.99999999994) out of the document.
 */
declare function pixelsToEmu(px: number): number;
/**
 * Convert EMUs to twips
 */
declare function emuToTwips(emu: number): number;
/**
 * Convert twips to EMUs
 */
declare function twipsToEmu(twips: number): number;
/**
 * Convert points to pixels (at 96 DPI)
 *
 * 1 inch = 72 points = 96 pixels
 * → 1 point = 96/72 pixels = 4/3 pixels
 */
declare function pointsToPixels(points: number): number;
/**
 * Convert half-points to pixels (at 96 DPI)
 *
 * Half-points are commonly used for font sizes in OOXML (w:sz).
 */
declare function halfPointsToPixels(halfPoints: number): number;
/**
 * Convert points to half-points
 */
declare function pointsToHalfPoints(points: number): number;
/**
 * Format a pixel value as CSS string
 */
declare function formatPx(px: number): string;

declare function mapHexToHighlightName(hex: string): string | null;

/**
 * Color Resolver - Convert OOXML colors to CSS
 *
 * Handles:
 * - Theme color references (accent1, dk1, etc.)
 * - RGB hex values
 * - "auto" colors (context-dependent)
 * - Tint/shade modifications
 *
 * OOXML Color References:
 * - w:color/@w:val - RGB hex or "auto"
 * - w:color/@w:themeColor - Theme color slot
 * - w:color/@w:themeTint - Tint modifier (0-255, hex)
 * - w:color/@w:themeShade - Shade modifier (0-255, hex)
 *
 * Tint/Shade Calculations:
 * - Tint makes color lighter (blend with white)
 * - Shade makes color darker (blend with black)
 * - Value is in hex (00-FF), converted to 0-1 for calculation
 */

/**
 * Resolve a ColorValue to a CSS color string
 *
 * @param color - ColorValue object with rgb, themeColor, tint/shade, or auto
 * @param theme - Theme for resolving theme colors
 * @param defaultColor - Default color if auto or undefined (default: black)
 * @returns CSS color string (e.g., "#FF0000" or "inherit")
 */
declare function resolveColor(color: ColorValue | undefined | null, theme: Theme | null | undefined, defaultColor?: string): string;
/**
 * Resolve a highlight color name to CSS
 *
 * @param highlight - Highlight color name (e.g., "yellow", "cyan")
 * @returns CSS color string or empty string for "none"
 */
declare function resolveHighlightColor(highlight: string | undefined): string;
/**
 * Resolve a shading fill or pattern color to CSS
 *
 * @param color - ColorValue for fill
 * @param theme - Theme for resolving theme colors
 * @returns CSS color string
 */
declare function resolveShadingColor(color: ColorValue | undefined | null, theme: Theme | null | undefined): string;
/**
 * Check if a color is effectively black
 *
 * @param color - ColorValue object
 * @param theme - Theme for resolving theme colors
 * @returns True if color resolves to black or very dark
 */
declare function isBlack(color: ColorValue | undefined | null, theme: Theme | null | undefined): boolean;
/**
 * Check if a color is effectively white
 *
 * @param color - ColorValue object
 * @param theme - Theme for resolving theme colors
 * @returns True if color resolves to white or very light
 */
declare function isWhite(color: ColorValue | undefined | null, theme: Theme | null | undefined): boolean;
/**
 * Get contrasting text color for a background
 *
 * @param backgroundColor - Background ColorValue
 * @param theme - Theme for resolving theme colors
 * @returns Black or white hex color for best contrast
 */
declare function getContrastingColor(backgroundColor: ColorValue | undefined | null, theme: Theme | null | undefined): string;
/**
 * Parse a color string (various formats) to ColorValue
 *
 * @param colorString - Color string like "FF0000", "auto", or theme color name
 * @returns ColorValue object
 */
declare function parseColorString(colorString: string | undefined): ColorValue | undefined;
/**
 * Create a ColorValue from theme color reference
 *
 * @param themeColor - Theme color slot name
 * @param tint - Optional tint modifier
 * @param shade - Optional shade modifier
 * @returns ColorValue object
 */
declare function createThemeColor(themeColor: ThemeColorSlot, tint?: number, shade?: number): ColorValue;
/**
 * Create a ColorValue from RGB hex
 *
 * @param hex - 6-character hex color (no #)
 * @returns ColorValue object
 */
declare function createRgbColor(hex: string): ColorValue;
/**
 * Darken a color by a percentage
 *
 * @param color - ColorValue to darken
 * @param theme - Theme for resolving
 * @param percent - Percentage to darken (0-100)
 * @returns CSS color string
 */
declare function darkenColor(color: ColorValue | undefined | null, theme: Theme | null | undefined, percent: number): string;
/**
 * Lighten a color by a percentage
 *
 * @param color - ColorValue to lighten
 * @param theme - Theme for resolving
 * @param percent - Percentage to lighten (0-100)
 * @returns CSS color string
 */
declare function lightenColor(color: ColorValue | undefined | null, theme: Theme | null | undefined, percent: number): string;
/**
 * Blend two colors together
 *
 * @param color1 - First color
 * @param color2 - Second color
 * @param ratio - Blend ratio (0 = all color1, 1 = all color2)
 * @param theme - Theme for resolving
 * @returns CSS color string
 */
declare function blendColors(color1: ColorValue | undefined | null, color2: ColorValue | undefined | null, ratio: number, theme: Theme | null | undefined): string;
/**
 * Check if two colors are equal
 *
 * @param color1 - First color
 * @param color2 - Second color
 * @param theme - Theme for resolving
 * @returns True if colors resolve to the same value
 */
declare function colorsEqual(color1: ColorValue | undefined | null, color2: ColorValue | undefined | null, theme: Theme | null | undefined): boolean;

/**
 * Core Plugin System Types
 *
 * Defines the interfaces for headless plugins that work in Node.js
 * without React/DOM dependencies. These plugins extend DocumentAgent
 * with additional commands and expose MCP tools for AI integration.
 */

/**
 * Core plugin interface - headless, works in Node.js
 *
 * Plugins can:
 * - Register command handlers that DocumentAgent dispatches to
 * - Declare MCP tools that the MCP server exposes to AI clients
 * - Have optional initialization logic
 * - Declare dependencies on other plugins
 */
interface CorePlugin {
    /** Unique plugin identifier */
    id: string;
    /** Human-readable plugin name */
    name: string;
    /** Plugin version (semver) */
    version?: string;
    /** Plugin description */
    description?: string;
    /**
     * Command handlers this plugin provides.
     * DocumentAgent dispatches commands to these handlers.
     *
     * @example
     * ```ts
     * commandHandlers: {
     *   'insertTemplateVariable': (doc, cmd) => {
     *     // Transform document
     *     return modifiedDoc;
     *   },
     * }
     * ```
     */
    commandHandlers?: Record<string, CommandHandler>;
    /**
     * MCP tools this plugin exposes.
     * MCP server collects these from all plugins.
     */
    mcpTools?: McpToolDefinition[];
    /**
     * Optional setup when plugin is registered.
     * Called once during plugin registration.
     */
    initialize?: () => void | Promise<void>;
    /**
     * Optional cleanup when plugin is unregistered.
     */
    destroy?: () => void | Promise<void>;
    /**
     * Dependencies on other plugins (by ID).
     * The registry ensures dependencies are loaded first.
     */
    dependencies?: string[];
}
/**
 * Command handler function type
 *
 * Receives a document and a command, returns a modified document.
 * Must be pure/immutable - always return a new document.
 */
type CommandHandler = (doc: Document, command: PluginCommand) => Document;
/**
 * Extended command type for plugins
 *
 * Plugins can define custom command types beyond the built-in AgentCommand types.
 */
interface PluginCommand {
    /** Command type identifier */
    type: string;
    /** Unique command ID (for undo tracking) */
    id?: string;
    /** Position for positional commands */
    position?: Position;
    /** Range for range-based commands */
    range?: Range;
    /** Additional command-specific data */
    [key: string]: unknown;
}
/**
 * Result of command execution
 */
interface CommandResult {
    /** The modified document */
    document: Document;
    /** Whether the command succeeded */
    success: boolean;
    /** Error message if failed */
    error?: string;
    /** Metadata about the operation */
    metadata?: Record<string, unknown>;
}
/**
 * MCP tool definition
 *
 * Describes a tool that can be called by AI clients through the MCP server.
 */
interface McpToolDefinition {
    /** Tool name (used in MCP protocol) */
    name: string;
    /** Human-readable description for AI */
    description: string;
    /**
     * JSON Schema for tool input validation.
     * Can be a Zod schema or plain JSON Schema object.
     */
    inputSchema: JsonSchema | ZodSchemaLike;
    /**
     * Handler function for the tool.
     * Receives validated input and returns a result.
     */
    handler: McpToolHandler;
    /**
     * Optional annotations for the tool
     */
    annotations?: McpToolAnnotations;
}
/**
 * MCP tool handler function
 */
type McpToolHandler = (input: unknown, context: McpToolContext) => Promise<McpToolResult> | McpToolResult;
/**
 * Context passed to MCP tool handlers
 */
interface McpToolContext {
    /** Current document (if loaded) */
    document?: Document;
    /** Document buffer (if loaded) */
    documentBuffer?: ArrayBuffer;
    /** Session state */
    session: McpSession;
    /** Logger for debugging */
    log: (message: string, data?: unknown) => void;
}
/**
 * MCP session state
 *
 * Maintains state across tool calls within a session.
 */
interface McpSession {
    /** Session ID */
    id: string;
    /** Loaded documents by ID */
    documents: Map<string, LoadedDocument>;
    /** Custom session data */
    data: Map<string, unknown>;
}
/**
 * A loaded document in the session
 */
interface LoadedDocument {
    /** Document ID */
    id: string;
    /** Parsed document */
    document: Document;
    /** Original buffer (for repacking) */
    buffer?: ArrayBuffer;
    /** Source filename or path */
    source?: string;
    /** Last modified timestamp */
    lastModified: number;
}
/**
 * MCP tool result
 */
interface McpToolResult {
    /** Result content */
    content: McpToolContent[];
    /** Whether this is an error result */
    isError?: boolean;
}
/**
 * MCP tool content types
 */
type McpToolContent = {
    type: 'text';
    text: string;
} | {
    type: 'image';
    data: string;
    mimeType: string;
} | {
    type: 'resource';
    uri: string;
    mimeType?: string;
    text?: string;
};
/**
 * MCP tool annotations
 */
interface McpToolAnnotations {
    /** Tool category for organization */
    category?: string;
    /** Whether this tool modifies the document */
    readOnly?: boolean;
    /** Estimated cost/complexity */
    complexity?: 'low' | 'medium' | 'high';
    /** Example usage */
    examples?: McpToolExample[];
}
/**
 * MCP tool example
 */
interface McpToolExample {
    /** Example description */
    description: string;
    /** Example input */
    input: unknown;
    /** Expected output description */
    output?: string;
}
/**
 * JSON Schema definition (subset)
 */
interface JsonSchema {
    type?: string | string[];
    properties?: Record<string, JsonSchema>;
    items?: JsonSchema;
    required?: string[];
    description?: string;
    enum?: unknown[];
    default?: unknown;
    minimum?: number;
    maximum?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    format?: string;
    additionalProperties?: boolean | JsonSchema;
    anyOf?: JsonSchema[];
    oneOf?: JsonSchema[];
    allOf?: JsonSchema[];
    $ref?: string;
}
/**
 * Zod-like schema interface for compatibility
 */
interface ZodSchemaLike {
    _def?: unknown;
    parse?: (data: unknown) => unknown;
    safeParse?: (data: unknown) => {
        success: boolean;
        data?: unknown;
        error?: unknown;
    };
}
/**
 * Check if a schema is Zod-like
 */
declare function isZodSchema(schema: unknown): schema is ZodSchemaLike;
/**
 * Plugin lifecycle events
 */
type PluginEvent = {
    type: 'registered';
    plugin: CorePlugin;
} | {
    type: 'unregistered';
    pluginId: string;
} | {
    type: 'error';
    pluginId: string;
    error: Error;
};
/**
 * Plugin event listener
 */
type PluginEventListener = (event: PluginEvent) => void;
/**
 * Plugin configuration options
 */
interface PluginOptions {
    /** Enable debug logging */
    debug?: boolean;
    /** Custom configuration */
    config?: Record<string, unknown>;
}
/**
 * Result of plugin registration
 */
interface PluginRegistrationResult {
    /** Whether registration succeeded */
    success: boolean;
    /** Registered plugin (if successful) */
    plugin?: CorePlugin;
    /** Error message (if failed) */
    error?: string;
    /** Warning messages */
    warnings?: string[];
}

/**
 * Plugin Registry
 *
 * Central registry for core plugins. Manages plugin lifecycle,
 * collects command handlers from all plugins, and aggregates
 * MCP tool definitions for the MCP server.
 */

/**
 * Plugin Registry - manages core plugins
 *
 * @example
 * ```ts
 * import { pluginRegistry, docxtemplaterPlugin } from 'docx-editor-react/core-plugins';
 *
 * // Register plugins
 * pluginRegistry.register(docxtemplaterPlugin);
 *
 * // Get all MCP tools for MCP server
 * const tools = pluginRegistry.getMcpTools();
 *
 * // Get command handler for executor
 * const handler = pluginRegistry.getCommandHandler('insertTemplateVariable');
 * ```
 */
declare class PluginRegistry {
    private plugins;
    private commandHandlers;
    private eventListeners;
    private initialized;
    /**
     * Register a plugin
     *
     * @param plugin - The plugin to register
     * @param options - Optional configuration
     * @returns Registration result
     */
    register(plugin: CorePlugin, options?: PluginOptions): PluginRegistrationResult;
    /**
     * Unregister a plugin
     *
     * @param pluginId - ID of the plugin to unregister
     * @returns Whether unregistration succeeded
     */
    unregister(pluginId: string): boolean;
    /**
     * Get a registered plugin by ID
     *
     * @param id - Plugin ID
     * @returns The plugin or undefined
     */
    get(id: string): CorePlugin | undefined;
    /**
     * Get all registered plugins
     *
     * @returns Array of all plugins
     */
    getAll(): CorePlugin[];
    /**
     * Check if a plugin is registered
     *
     * @param id - Plugin ID
     * @returns Whether the plugin is registered
     */
    has(id: string): boolean;
    /**
     * Get number of registered plugins
     */
    get size(): number;
    /**
     * Get a command handler for a command type
     *
     * @param commandType - The command type
     * @returns The handler or undefined
     */
    getCommandHandler(commandType: string): CommandHandler | undefined;
    /**
     * Get all registered command types
     *
     * @returns Array of command type strings
     */
    getCommandTypes(): string[];
    /**
     * Check if a command type has a handler
     *
     * @param commandType - The command type
     * @returns Whether a handler exists
     */
    hasCommandHandler(commandType: string): boolean;
    /**
     * Get all MCP tools from all registered plugins
     *
     * @returns Array of MCP tool definitions
     */
    getMcpTools(): McpToolDefinition[];
    /**
     * Get MCP tools from a specific plugin
     *
     * @param pluginId - Plugin ID
     * @returns Array of MCP tool definitions
     */
    getMcpToolsForPlugin(pluginId: string): McpToolDefinition[];
    /**
     * Get an MCP tool by name
     *
     * @param toolName - Tool name
     * @returns The tool definition or undefined
     */
    getMcpTool(toolName: string): McpToolDefinition | undefined;
    /**
     * Add an event listener
     *
     * @param listener - Event listener function
     */
    addEventListener(listener: PluginEventListener): void;
    /**
     * Remove an event listener
     *
     * @param listener - Event listener function
     */
    removeEventListener(listener: PluginEventListener): void;
    /**
     * Emit an event to all listeners
     */
    private emit;
    /**
     * Clear all registered plugins
     *
     * Useful for testing or resetting state.
     */
    clear(): void;
    /**
     * Get registry state for debugging
     */
    getDebugInfo(): {
        plugins: string[];
        commandTypes: string[];
        mcpTools: string[];
        initialized: string[];
    };
}
/**
 * Global plugin registry instance
 *
 * Use this for registering plugins and accessing their capabilities.
 */
declare const pluginRegistry: PluginRegistry;
/**
 * Register multiple plugins at once
 *
 * @param plugins - Array of plugins to register
 * @returns Array of registration results
 */
declare function registerPlugins(plugins: CorePlugin[], options?: PluginOptions): PluginRegistrationResult[];
/**
 * Create a plugin registration helper with options pre-configured
 *
 * @param options - Default options for plugin registration
 * @returns Registration function
 */
declare function createPluginRegistrar(options: PluginOptions): (plugin: CorePlugin) => PluginRegistrationResult;

/**
 * @/core/headless
 *
 * Headless aggregate for Node.js scripts, CLI tools, and server-side
 * processing. Same surface as the default `.` entry, named to make the
 * "no DOM" intent explicit. Prefer the smaller subpaths (`./docx`,
 * `./agent`, `./utils`, etc.) for new code — they tree-shake better.
 *
 * @example
 * ```ts
 * import { DocumentAgent, parseDocx, pluginRegistry } from '@/core/headless';
 * import { docxtemplaterPlugin } from '@/core/core-plugins';
 *
 * // Register plugins
 * pluginRegistry.register(docxtemplaterPlugin);
 *
 * // Load and manipulate document
 * const buffer = fs.readFileSync('template.docx');
 * const agent = await DocumentAgent.fromBuffer(buffer);
 *
 * // Get document info
 * console.log('Word count:', agent.getWordCount());
 * console.log('Variables:', agent.getVariables());
 *
 * // Edit document
 * const newAgent = agent
 *   .insertText({ paragraphIndex: 0, offset: 0 }, 'Hello ')
 *   .applyStyle(0, 'Heading1');
 *
 * // Apply template variables
 * const finalAgent = await newAgent.applyVariables({
 *   customer_name: 'Jane Doe',
 *   date: '2024-02-15',
 * });
 *
 * // Export
 * const output = await finalAgent.toBuffer();
 * fs.writeFileSync('output.docx', Buffer.from(output));
 * ```
 * @packageDocumentation
 * @public
 */
declare const VERSION = "0.0.2";

export { AgentCommand, AgentContext, type AgentContextOptions, type CommandHandler, type CommandResult, ContentControlCreateError, ContentControlFilter, ContentControlInfo, type SelectionContextOptions$1 as ContextSelectionOptions, type CorePlugin, type CreateContentControlTarget, Document, DocumentBody, type DocxSchema, type ExtendedSelectionContext, ExtensionManager, type FormattingSummary, Hyperlink, type JsonSchema, type LoadedDocument, type McpSession, type McpToolAnnotations, type McpToolContent, type McpToolContext, type McpToolDefinition, type McpToolHandler, type McpToolResult, type NewContentControlProps, Paragraph, ParagraphFormatting, type CorePlugin as Plugin, type PluginCommand, type CommandHandler as PluginCommandHandler, type PluginEvent, type PluginEventListener, type PluginOptions, type PluginRegistrationResult, PluginRegistry, Position, type ProcessTemplateOptions, type ProcessTemplateResult, Range, RepeatingSectionError, Run, SectionProperties, SelectionContext$1 as SelectionContext, type SelectionContextOptions, StyleDefinitions, Table, type TemplateError, TextFormatting, Theme, type ToProseDocOptions, type McpToolDefinition as ToolDefinition, type McpToolHandler as ToolHandler, type McpToolResult as ToolResult, VERSION, type VariableDetectionResult, type VariableOccurrence, type ZodSchemaLike, addRepeatingSectionItem, blendColors, buildExtendedSelectionContext, buildPatchedDocumentXml, buildSelectionContext, buildSelectionContext$1 as buildSelectionContextFromContext, colorsEqual, countCharacters, countWords, createContentControl, createDocx, createEmptyDoc, createPluginRegistrar, createRgbColor, createStarterKit, createTemplateProcessor, createThemeColor, darkenColor, detectVariables, detectVariablesDetailed, detectVariablesInBody, detectVariablesInParagraph, documentHasVariables, emuToPixels, emuToTwips, executeCommand, executeCommands, extractVariablesFromText, formatPx, formatVariable, fromProseDoc, getAgentContext, getBlockIndexForParagraph, getBodyCharacterCount, getBodyText, getBodyWordCount, getContrastingColor, getDocumentSummary, getDocumentWatermark, getFormattingAtPosition, getHyperlinkAtPosition, getHyperlinkText, getMissingVariables, getParagraphAtIndex, getParagraphText, getParagraphs, getRunText, getSelectionFormattingSummary, getTableText, getTemplateTags, getTextAfter, getTextBefore, halfPointsToPixels, hasHyperlinks, hasImages, hasTables, hasTemplateVariables, isBlack, isHeadingStyle, isPositionInHyperlink, isRepeatingSection, isRepeatingSectionItem, isValidVariableName, isWhite, isZodSchema, lightenColor, mapHexToHighlightName, parseColorString, parseDocx, parseHeadingLevel, parseVariable, pixelsToEmu, pixelsToTwips, pluginRegistry, pointsToHalfPoints, pointsToPixels, previewTemplate, processTemplate, processTemplateAdvanced, processTemplateAsBlob, processTemplateDetailed, registerPlugins, removeRepeatingSectionItem, removeVariables, repackDocx, replaceVariables, resolveColor, resolveHighlightColor, resolveShadingColor, sanitizeVariableName, schema, serializeDocumentBody, serializeDocument as serializeDocx, serializeSectionProperties, setDocumentWatermark, singletonManager, toProseDoc, twipsToEmu, twipsToPixels, updateMultipleFiles, validatePatchSafety, validateTemplate };
