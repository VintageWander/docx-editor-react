import { D as Document, T as Theme } from './document-D89zCnot.cjs';
import { T as TableContext, a as TableAction, b as TableSplitConfig } from './TableToolbar-d8aVH-zz.cjs';
export { F as FindReplaceOptions, c as FindReplaceState, U as UseFindReplaceReturn, u as useFindReplace } from './TableToolbar-d8aVH-zz.cjs';
import { R as Run, T as Table } from './run-DndcHMrf.cjs';
import * as React$1 from 'react';
import React__default, { CSSProperties as CSSProperties$1, RefObject } from 'react';
import { P as ParsedClipboardContent } from './clipboard-_eLTC5cf.cjs';
import { A as AutoSaveStatus, S as SavedDocumentData } from './types-CIQcleY-.cjs';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';

/**
 * Selection Highlight Utilities
 *
 * Provides visual highlighting for text selection across multiple runs.
 * Browsers handle ::selection pseudo-element differently, especially when
 * selection spans multiple elements with different backgrounds or styling.
 *
 * This module provides:
 * - Custom selection highlight rendering
 * - Programmatic selection range marking
 * - Visual feedback for selection across runs
 */
/** Framework-agnostic CSS properties type (compatible with React.CSSProperties) */
type CSSProperties = Record<string, any>;
/**
 * Highlight rectangle representing a selected region
 */
interface HighlightRect {
    /** Left position in pixels */
    left: number;
    /** Top position in pixels */
    top: number;
    /** Width in pixels */
    width: number;
    /** Height in pixels */
    height: number;
}
/**
 * Selection highlight configuration
 */
interface SelectionHighlightConfig {
    /** Background color for selection */
    backgroundColor: string;
    /** Optional border color for selection */
    borderColor?: string;
    /** Optional border radius */
    borderRadius?: number;
    /** Z-index for overlay */
    zIndex?: number;
    /** Opacity for highlight */
    opacity?: number;
    /** Mix blend mode */
    mixBlendMode?: CSSProperties['mixBlendMode'];
}

/**
 * History hook for undo/redo functionality
 *
 * Maintains undo/redo stacks with support for:
 * - undo() and redo() operations
 * - canUndo and canRedo state
 * - Keyboard shortcuts (Ctrl+Z, Ctrl+Y, Ctrl+Shift+Z)
 * - Grouping rapid changes to avoid cluttering history
 */
/**
 * History entry containing state and metadata
 */
interface HistoryEntry<T> {
    /** The state at this point */
    state: T;
    /** Timestamp when this entry was created */
    timestamp: number;
    /** Optional description of what changed */
    description?: string;
}
/**
 * Options for the useHistory hook
 */
interface UseHistoryOptions<T> {
    /** Maximum number of entries in history (default: 100) */
    maxEntries?: number;
    /** Time in ms to group rapid changes (default: 500) */
    groupingInterval?: number;
    /** Whether to enable keyboard shortcuts (default: true) */
    enableKeyboardShortcuts?: boolean;
    /** Custom comparison function for detecting changes */
    isEqual?: (a: T, b: T) => boolean;
    /** Callback when undo is triggered */
    onUndo?: (state: T) => void;
    /** Callback when redo is triggered */
    onRedo?: (state: T) => void;
    /** Ref to the container element for keyboard events */
    containerRef?: React.RefObject<HTMLElement>;
}
/**
 * Return type of the useHistory hook
 */
interface UseHistoryReturn<T> {
    /** Current state */
    state: T;
    /** Whether undo is available */
    canUndo: boolean;
    /** Whether redo is available */
    canRedo: boolean;
    /** Number of entries in undo stack */
    undoCount: number;
    /** Number of entries in redo stack */
    redoCount: number;
    /** Push a new state to history */
    push: (newState: T, description?: string) => void;
    /** Undo to previous state */
    undo: () => T | undefined;
    /** Redo to next state */
    redo: () => T | undefined;
    /** Clear all history */
    clear: () => void;
    /** Reset to initial state and clear history */
    reset: (newInitialState?: T) => void;
    /** Get all undo entries (for debugging/display) */
    getUndoStack: () => HistoryEntry<T>[];
    /** Get all redo entries (for debugging/display) */
    getRedoStack: () => HistoryEntry<T>[];
    /** Transform all stored states (current + undo/redo stacks) */
    transformAll: (fn: (state: T) => T) => void;
}
/**
 * Custom hook for managing undo/redo history
 */
declare function useHistory<T>(initialState: T, options?: UseHistoryOptions<T>): UseHistoryReturn<T>;
/**
 * Simplified hook that just tracks state changes automatically
 */
declare function useAutoHistory<T>(value: T, options?: UseHistoryOptions<T>): Omit<UseHistoryReturn<T>, 'push'>;
/**
 * Hook for document history with specialized comparison
 */
declare function useDocumentHistory<T extends {
    package?: {
        document?: unknown;
        headers?: unknown;
        footers?: unknown;
    } | null;
} | null>(document: T, options?: Omit<UseHistoryOptions<T>, 'isEqual'>): UseHistoryReturn<T>;
/**
 * Create a history manager for non-React usage
 */
declare class HistoryManager<T> {
    private undoStack;
    private redoStack;
    private currentState;
    private maxEntries;
    private groupingInterval;
    private lastPushTime;
    private isEqual;
    constructor(initialState: T, options?: {
        maxEntries?: number;
        groupingInterval?: number;
        isEqual?: (a: T, b: T) => boolean;
    });
    get state(): T;
    get canUndo(): boolean;
    get canRedo(): boolean;
    push(newState: T, description?: string): void;
    undo(): T | undefined;
    redo(): T | undefined;
    clear(): void;
    reset(newInitialState?: T): void;
}

/**
 * AutoSaveManager
 *
 * Framework-agnostic class for auto-saving documents to localStorage.
 * Extracted from the React `useAutoSave` hook.
 *
 * Usage with React:
 * ```ts
 * const snapshot = useSyncExternalStore(manager.subscribe, manager.getSnapshot);
 * ```
 * @packageDocumentation
 * @public
 */

/** Format last save time for display */
declare function formatLastSaveTime(date: Date | null): string;
/** Get auto-save status label */
declare function getAutoSaveStatusLabel(status: AutoSaveStatus): string;
/** Get storage size used by auto-save */
declare function getAutoSaveStorageSize(storageKey?: string): number;
/** Format storage size for display */
declare function formatStorageSize(bytes: number): string;
/** Check if auto-save is supported */
declare function isAutoSaveSupported(): boolean;

/**
 * TableSelectionManager
 *
 * Framework-agnostic class for managing table cell selection state.
 * Extracted from the React `useTableSelection` hook.
 *
 * Handles:
 * - Cell selection via data-attribute queries on the DOM
 * - Table document operations (add/delete rows/columns, merge/split)
 *
 * @remarks
 * Tagged `@internal` post-1.0 cut. Adapters bind to this class today,
 * but consumers should reach for `useTableSelection()` (React/Vue) instead
 * of this raw subpath. The subpath stays in `package.json` `exports` for
 * back-compat; expect it to move behind a public surface in a future major.
 *
 * @packageDocumentation
 * @internal
 */

/**
 * Data attributes for table elements in the rendered DOM
 * @internal
 */
declare const TABLE_DATA_ATTRIBUTES: {
    readonly TABLE_INDEX: "data-table-index";
    readonly ROW_INDEX: "data-row";
    readonly COLUMN_INDEX: "data-col";
    readonly TABLE_CELL: "data-table-cell";
};

/**
 * ClipboardManager
 *
 * Framework-agnostic class for clipboard operations in the editor.
 * Extracted from the React `useClipboard` hook.
 *
 * Handles:
 * - DOM selection traversal and run extraction
 * - Formatting extraction from computed styles
 * - Clipboard read/write operations
 */

/** Selection data for clipboard operations */
interface ClipboardSelection {
    text: string;
    runs: Run[];
    startParagraphIndex: number;
    startRunIndex: number;
    startOffset: number;
    endParagraphIndex: number;
    endRunIndex: number;
    endOffset: number;
    isMultiParagraph: boolean;
}
/** Get selected runs from the current DOM selection. */
declare function getSelectionRuns(): Run[];
/** Create a ClipboardSelection from the current DOM selection. */
declare function createSelectionFromDOM(): ClipboardSelection | null;

/**
 * useTableSelection Hook
 *
 * Thin React wrapper around the framework-agnostic TableSelectionManager.
 * Provides table selection tracking and table operation dispatch.
 */

interface TableSelectionState {
    context: TableContext | null;
    table: Table | null;
    tableIndex: number | null;
    rowIndex: number | null;
    columnIndex: number | null;
}
interface UseTableSelectionReturn {
    state: TableSelectionState;
    handleCellClick: (tableIndex: number, rowIndex: number, columnIndex: number) => void;
    handleAction: (action: TableAction) => void;
    getSplitCellConfig: () => TableSplitConfig | null;
    applySplitCell: (rows: number, cols: number) => void;
    clearSelection: () => void;
    isCellSelected: (tableIndex: number, rowIndex: number, columnIndex: number) => boolean;
    tableContext: TableContext | null;
}
interface UseTableSelectionOptions {
    document: Document | null;
    onChange?: (document: Document) => void;
    onSelectionChange?: (context: TableContext | null) => void;
}
declare function useTableSelection({ document: doc, onChange, onSelectionChange, }: UseTableSelectionOptions): UseTableSelectionReturn;

/**
 * Selection Highlight Hook
 *
 * A React hook that manages visual selection highlighting across multiple runs.
 * Uses a combination of CSS ::selection pseudo-element styling and optional
 * overlay rectangles for complex scenarios.
 *
 * Features:
 * - Consistent selection highlighting across all text runs
 * - Support for text with different backgrounds (highlighted, dark bg)
 * - Optional overlay rectangles for custom highlight effects
 * - Debounced updates for performance
 */

/**
 * Options for the useSelectionHighlight hook
 */
interface UseSelectionHighlightOptions {
    /** Reference to the container element */
    containerRef: React__default.RefObject<HTMLElement>;
    /** Whether to enable selection highlighting */
    enabled?: boolean;
    /** Custom highlight configuration */
    config?: SelectionHighlightConfig;
    /** Whether to use overlay rectangles (default: false, uses CSS) */
    useOverlay?: boolean;
    /** Debounce delay for rect updates in ms (default: 16) */
    debounceMs?: number;
    /** Callback when selection changes */
    onSelectionChange?: (hasSelection: boolean, text: string) => void;
}
/**
 * Return value from the useSelectionHighlight hook
 */
interface UseSelectionHighlightReturn {
    /** Whether there is an active selection */
    hasSelection: boolean;
    /** The selected text */
    selectedText: string;
    /** Highlight rectangles (only populated if useOverlay is true) */
    highlightRects: HighlightRect[];
    /** Whether selection is within the container */
    isSelectionInContainer: boolean;
    /** Refresh the highlight state */
    refresh: () => void;
    /** Get styles for a highlight rect overlay */
    getOverlayStyle: (rect: HighlightRect) => CSSProperties$1;
}
/**
 * Hook to manage selection highlighting in the editor
 */
declare function useSelectionHighlight(options: UseSelectionHighlightOptions): UseSelectionHighlightReturn;
/**
 * Props for selection overlay component
 */
interface SelectionOverlayProps {
    /** Highlight rectangles to render */
    rects: HighlightRect[];
    /** Style configuration */
    config?: SelectionHighlightConfig;
    /** Additional class name */
    className?: string;
}
/**
 * Generate selection overlay elements (for use in JSX)
 *
 * Usage:
 * ```tsx
 * const { highlightRects } = useSelectionHighlight({ ... });
 * return (
 *   <div style={{ position: 'relative' }}>
 *     {generateOverlayElements(highlightRects)}
 *     <div>... content ...</div>
 *   </div>
 * );
 * ```
 */
declare function generateOverlayElements(rects: HighlightRect[], config?: SelectionHighlightConfig): React__default.ReactNode[];

/**
 * useClipboard Hook
 *
 * Thin React wrapper around the framework-agnostic ClipboardManager.
 * Handles clipboard operations with formatting preservation.
 */

interface UseClipboardOptions {
    onCopy?: (selection: ClipboardSelection) => void;
    onCut?: (selection: ClipboardSelection) => void;
    onPaste?: (content: ParsedClipboardContent, asPlainText: boolean) => void;
    cleanWordFormatting?: boolean;
    editable?: boolean;
    onError?: (error: Error) => void;
    /** Document theme — used to resolve themed colors in the HTML clipboard payload. */
    theme?: Theme | null;
}
interface UseClipboardReturn {
    copy: (selection: ClipboardSelection) => Promise<boolean>;
    cut: (selection: ClipboardSelection) => Promise<boolean>;
    paste: (asPlainText?: boolean) => Promise<ParsedClipboardContent | null>;
    handleCopy: (event: ClipboardEvent) => void;
    handleCut: (event: ClipboardEvent) => void;
    handlePaste: (event: ClipboardEvent) => void;
    handleKeyDown: (event: KeyboardEvent) => void;
    isProcessing: boolean;
    lastPastedContent: ParsedClipboardContent | null;
}
declare function useClipboard(options?: UseClipboardOptions): UseClipboardReturn;

/**
 * useAutoSave Hook
 *
 * Thin React wrapper around the framework-agnostic AutoSaveManager.
 * Bridges AutoSaveManager's subscribe/getSnapshot pattern with React state.
 */

/** Options for useAutoSave hook */
interface UseAutoSaveOptions {
    /** Storage key for localStorage (default: 'docx-editor-autosave') */
    storageKey?: string;
    /** Save interval in milliseconds (default: 30000 - 30 seconds) */
    interval?: number;
    /** Whether auto-save is enabled (default: true) */
    enabled?: boolean;
    /** Maximum age of auto-save in milliseconds before it's considered stale (default: 24 hours) */
    maxAge?: number;
    /** Callback when save succeeds */
    onSave?: (timestamp: Date) => void;
    /** Callback when save fails */
    onError?: (error: Error) => void;
    /** Callback when recovery data is found */
    onRecoveryAvailable?: (savedDocument: SavedDocumentData) => void;
    /** Whether to save immediately when document changes (debounced) */
    saveOnChange?: boolean;
    /** Debounce delay for saveOnChange in milliseconds (default: 2000) */
    debounceDelay?: number;
}
/** Return value of useAutoSave hook */
interface UseAutoSaveReturn {
    status: AutoSaveStatus;
    lastSaveTime: Date | null;
    save: () => Promise<boolean>;
    clearAutoSave: () => void;
    hasRecoveryData: boolean;
    getRecoveryData: () => SavedDocumentData | null;
    acceptRecovery: () => Document | null;
    dismissRecovery: () => void;
    isEnabled: boolean;
    enable: () => void;
    disable: () => void;
}
declare function useAutoSave(document: Document | null | undefined, options?: UseAutoSaveOptions): UseAutoSaveReturn;

/**
 * Drag Auto-Scroll Hook
 *
 * When the user is drag-selecting text and moves the mouse near the
 * top or bottom edge of the scroll container, this hook auto-scrolls
 * the container and continues extending the selection.
 */
interface DragAutoScrollOptions {
    /** Ref to the pages container (used to find the scroll parent). */
    pagesContainerRef: React.RefObject<HTMLDivElement | null>;
    /** Called during auto-scroll to extend the selection at the current mouse position. */
    onScrollExtendSelection: (clientX: number, clientY: number) => void;
}
declare function useDragAutoScroll({ pagesContainerRef, onScrollExtendSelection, }: DragAutoScrollOptions): {
    updateMousePosition: (clientX: number, clientY: number) => void;
    stopAutoScroll: () => void;
};

/**
 * Hook for toolbar dropdowns that need position:fixed to escape overflow:auto/hidden ancestors.
 *
 * Returns refs and styles for a dropdown that positions itself below its trigger
 * using fixed coordinates (like MenuDropdown), so it isn't clipped by the toolbar's
 * overflow-x-auto container.
 */

interface UseFixedDropdownOptions {
    isOpen: boolean;
    onClose: () => void;
    /** 'left' aligns dropdown left edge to trigger, 'right' aligns right edge */
    align?: 'left' | 'right';
}
interface UseFixedDropdownReturn {
    containerRef: RefObject<HTMLDivElement | null>;
    dropdownRef: RefObject<HTMLDivElement | null>;
    dropdownStyle: CSSProperties$1;
    handleMouseDown: (e: React.MouseEvent) => void;
}
declare function useFixedDropdown({ isOpen, onClose, align, }: UseFixedDropdownOptions): UseFixedDropdownReturn;

/**
 * Width/height inputs with an optional aspect-ratio lock. `width`/`height`
 * are `number | ''` so a cleared field shows empty instead of 0.
 */
interface UseAspectLockedSizeReturn {
    width: number | '';
    height: number | '';
    lockAspect: boolean;
    setLockAspect: (locked: boolean) => void;
    /** Number-input onChange handlers. Empty string clears, otherwise clamps to >= 1. */
    handleWidthChange: (raw: string) => void;
    handleHeightChange: (raw: string) => void;
    /** Seed both fields and re-lock. Null/undefined values clear the input. */
    seed: (w: number | null | undefined, h: number | null | undefined) => void;
}
declare function useAspectLockedSize(): UseAspectLockedSizeReturn;

interface VisualLineNavigationOptions {
    pagesContainerRef: React.RefObject<HTMLDivElement | null>;
}
declare function useVisualLineNavigation({ pagesContainerRef }: VisualLineNavigationOptions): {
    stickyXRef: React$1.RefObject<number | null>;
    lastVisualLineIndexRef: React$1.RefObject<number>;
    getCaretClientX: (pmPos: number) => number | null;
    findLineElementAtPosition: (pmPos: number) => HTMLElement | null;
    findPositionOnLineAtClientX: (lineEl: HTMLElement, clientX: number) => number | null;
    handlePMKeyDown: (view: EditorView, event: KeyboardEvent) => boolean;
};

/**
 * useWheelZoom Hook
 *
 * Enables Ctrl+scroll (or Cmd+scroll on Mac) to zoom in/out.
 * Features:
 * - Configurable zoom range and step
 * - Smooth zoom transitions
 * - Pinch-to-zoom support on trackpads
 * - Zoom reset (Ctrl+0)
 * - Zoom in/out shortcuts (Ctrl++, Ctrl+-)
 */
/**
 * Options for useWheelZoom hook
 */
interface UseWheelZoomOptions {
    /** Initial zoom level (default: 1.0) */
    initialZoom?: number;
    /** Minimum zoom level (default: 0.25) */
    minZoom?: number;
    /** Maximum zoom level (default: 4.0) */
    maxZoom?: number;
    /** Zoom step for each scroll event (default: 0.1) */
    zoomStep?: number;
    /** Whether zoom is enabled (default: true) */
    enabled?: boolean;
    /** Container element ref to attach wheel listener */
    containerRef?: React.RefObject<HTMLElement>;
    /** Callback when zoom changes */
    onZoomChange?: (zoom: number) => void;
    /** Whether to enable keyboard shortcuts (Ctrl++, Ctrl+-, Ctrl+0) */
    enableKeyboardShortcuts?: boolean;
    /** Whether to prevent default browser zoom behavior */
    preventDefault?: boolean;
}
/**
 * Return value of useWheelZoom hook
 */
interface UseWheelZoomReturn {
    /** Current zoom level */
    zoom: number;
    /** Set zoom level directly */
    setZoom: (zoom: number) => void;
    /** Zoom in by step */
    zoomIn: () => void;
    /** Zoom out by step */
    zoomOut: () => void;
    /** Reset zoom to initial level */
    resetZoom: () => void;
    /** Reset zoom to 100% */
    zoomTo100: () => void;
    /** Zoom to fit width */
    zoomToFit: (containerWidth: number, contentWidth: number) => void;
    /** Whether currently at minimum zoom */
    isMinZoom: boolean;
    /** Whether currently at maximum zoom */
    isMaxZoom: boolean;
    /** Zoom percentage (e.g., 100 for zoom level 1.0) */
    zoomPercent: number;
    /** Wheel event handler (for manual attachment) */
    handleWheel: (event: WheelEvent) => void;
    /** Keyboard event handler (for manual attachment) */
    handleKeyDown: (event: KeyboardEvent) => void;
}
/**
 * Preset zoom levels for snapping
 */
declare const ZOOM_PRESETS: number[];
/**
 * React hook for Ctrl+scroll zoom functionality
 */
declare function useWheelZoom(options?: UseWheelZoomOptions): UseWheelZoomReturn;
/**
 * Get zoom presets
 */
declare function getZoomPresets(): number[];
/**
 * Find nearest zoom preset
 */
declare function findNearestZoomPreset(zoom: number): number;
/**
 * Get next zoom preset (for zoom in)
 */
declare function getNextZoomPreset(zoom: number): number;
/**
 * Get previous zoom preset (for zoom out)
 */
declare function getPreviousZoomPreset(zoom: number): number;
/**
 * Format zoom level for display
 */
declare function formatZoom(zoom: number): string;
/**
 * Parse zoom from percentage string
 */
declare function parseZoom(zoomString: string): number | null;
/**
 * Check if zoom level is at a preset
 */
declare function isZoomPreset(zoom: number): boolean;
/**
 * Clamp zoom to valid range
 */
declare function clampZoom(zoom: number, minZoom?: number, maxZoom?: number): number;

/**
 * Framework-agnostic comment + tracked-change helpers shared by the
 * React and Vue adapters. The data shapes and string-formatting rules
 * here are part of the visible UI (avatar colors, date strings) so
 * keep this file as the single source of truth — both adapters import
 * from here. CSS-property factories live in adapter-specific files
 * (sidebar/cardUtils.ts in React, sidebar/sidebarUtils.ts in Vue).
 * @packageDocumentation
 * @public
 */

/**
 * One tracked change surfaced by `extractTrackedChanges`. Each entry
 * groups all sites of one revision into a single row that the sidebar
 * renders as one card. Resolve via {@link acceptChangeById} /
 * {@link rejectChangeById} for any type — the by-id resolver walks
 * every site sharing the id so coalesced edits clear in one click.
 *
 * @public
 */
interface TrackedChangeEntry {
    /**
     * Revision shape. Inline shapes (`insertion`, `deletion`, `replacement`)
     * wrap text runs; the rest are structural revisions on node attrs.
     *
     * - `insertion` — text was added (`<w:ins>`).
     * - `deletion` — text was struck through but not removed (`<w:del>`).
     * - `replacement` — a deletion + insertion by the same author at the
     *   same position+time; sidebar shows one combined card. `deletedText`
     *   and `insertionRevisionId` are set on this variant.
     * - `paragraphMarkInsertion` / `paragraphMarkDeletion` — Enter /
     *   Backspace produced a tracked paragraph break (`<w:pPr><w:rPr><w:ins/>` /
     *   `<w:del/>`).
     * - `paragraphPropertiesChanged` — formatting (alignment, spacing,
     *   etc.) on the paragraph was changed (`<w:pPrChange>`).
     * - `rowInserted` / `rowDeleted` / `rowPropertiesChanged` — table
     *   row authored / removed / formatted (`<w:trPr><w:ins/>` / `<w:del/>`
     *   / `<w:trPrChange>`).
     * - `cellInserted` / `cellDeleted` / `cellMerged` /
     *   `cellPropertiesChanged` — per-cell revisions
     *   (`<w:cellIns>` / `<w:cellDel>` / `<w:cellMerge>` / `<w:tcPrChange>`).
     * - `tablePropertiesChanged` — table-level formatting
     *   (`<w:tblPrChange>`).
     */
    type: 'insertion' | 'deletion' | 'replacement' | 'paragraphMarkInsertion' | 'paragraphMarkDeletion' | 'paragraphPropertiesChanged' | 'rowInserted' | 'rowDeleted' | 'rowPropertiesChanged' | 'cellInserted' | 'cellDeleted' | 'cellMerged' | 'cellPropertiesChanged' | 'tableInserted' | 'tableDeleted' | 'tablePropertiesChanged';
    /**
     * Affected text. For inline types this is the run's text; for
     * structural types it's the surrounding paragraph / cell content
     * (truncated by the sidebar before display).
     */
    text: string;
    /**
     * Only set when `type === 'replacement'` — the text the user removed.
     * The inserted text lives in {@link TrackedChangeEntry.text}.
     */
    deletedText?: string;
    /** Author that minted the revision (`w:author`). */
    author: string;
    /** ISO timestamp the revision was minted (`w:date`). May be undefined for legacy imports. */
    date?: string;
    /**
     * Document position where the revision starts. For inline types this
     * is the start of the marked text run; for structural types it's the
     * containing paragraph / row / cell / table node's start position.
     * Used by the sidebar to anchor the card at the correct vertical
     * offset.
     */
    from: number;
    /**
     * Document position where the revision ends. For inline coalesced
     * runs that span multiple paragraphs, this is the END position of the
     * LAST run in the group; the intervening structural positions are not
     * preserved.
     */
    to: number;
    /**
     * The `w:id` of the revision. Pass to
     * {@link acceptChangeById} / {@link rejectChangeById} to resolve every
     * site sharing this id — including pPrIns paragraph attrs and
     * subsequent typed runs in the same editing session.
     */
    revisionId: number;
    /**
     * Only set when `type === 'replacement'` — the insertion half carries
     * a DIFFERENT `w:id` from the deletion (sharing would trip the OOXML
     * move-pair serializer). Card Accept handlers dispatch BOTH ids to
     * clear the deletion and the insertion + any coalesced paragraph-marks.
     */
    insertionRevisionId?: number;
    /**
     * Extra `w:id`s that map to the same logical revision as this card.
     * Populated when the extractor coalesces a burst of distinct ids by
     * (author, date) — e.g. a foreign document where the source editor
     * minted a fresh id per atomic edit. Accept/reject handlers must
     * resolve every id in this list in addition to {@link revisionId}.
     */
    coalescedRevisionIds?: number[];
}

/**
 * Walk the PM doc once and derive (a) the tracked-change list and (b) a
 * comment→revision overlap map for threading. Adjacent entries from the
 * same revision are merged; deletion+insertion pairs from the same
 * author/date become a single `replacement` entry (matches Word's UX
 * for replace ops).
 *
 * Pure function — no React, no Vue, no side effects. Single O(N) walk
 * over text nodes. Consumers building custom sidebars should prefer the
 * adapter-specific wrappers (`useTrackedChanges` in
 * `@/react/hooks` and
 * `the vue adapter`), which add the memoization
 * and reactivity layer. Reach for the core function directly for
 * server-side analysis or test fixtures.
 *
 * @packageDocumentation
 * @public
 */

/**
 * Output of {@link extractTrackedChanges}.
 *
 * @public
 */
interface TrackedChangesResult {
    /** Tracked-change entries, sorted by document position, with adjacent same-revision entries merged. */
    entries: TrackedChangeEntry[];
    /**
     * Map of `commentId -> revisionId` for comments whose range overlaps a tracked-change mark.
     * Consumers (DocxEditor's threading effect) use this to thread comments under their tracked change.
     */
    commentToRevision: Map<number, number>;
}
/**
 * Walk the PM doc and extract every tracked change as a flat list of
 * `TrackedChangeEntry` plus a comment→revision overlap map. Adjacent
 * inline marks coalesce by `(type, revisionId, author, date)`; a
 * deletion immediately followed by an insertion (same author + same
 * date) collapses into a single `replacement` entry; paragraph-mark
 * cards (`paragraphMarkInsertion` / `paragraphMarkDeletion`) are
 * hidden when an inline entry already covers their revision triple
 * (one Accept clears every site of one conceptual change).
 *
 * Pure and deterministic. Returns `EMPTY_RESULT` on null state.
 *
 * @example
 * ```ts
 * import { extractTrackedChanges } from '@/core/prosemirror/utils/extractTrackedChanges';
 *
 * const { entries, commentToRevision } = extractTrackedChanges(view.state);
 * for (const e of entries) {
 *   console.log(e.type, e.author, e.text);
 * }
 * ```
 *
 * @public
 */
declare function extractTrackedChanges(state: EditorState | null): TrackedChangesResult;

/**
 * Returns tracked changes (and the comment→revision overlap map for threading)
 * derived from the latest PM state. Memoized on state identity, so derivation
 * only re-runs when PM state changes (which happens on every doc-changing
 * transaction, including remote ones via ySyncPlugin).
 *
 * No debounce: a single O(N) doc walk, cheap enough to run per transaction.
 * If you see jank on huge documents, wrap the setter that drives the state
 * argument in `requestAnimationFrame` rather than reintroducing a delay here —
 * a delay makes the sidebar feel laggy.
 */
declare function useTrackedChanges(state: EditorState | null): TrackedChangesResult;

export { AutoSaveStatus, type ClipboardSelection, type DragAutoScrollOptions, type HistoryEntry, HistoryManager, SavedDocumentData, type SelectionOverlayProps, TABLE_DATA_ATTRIBUTES, type TableSelectionState, type TrackedChangesResult, type UseAspectLockedSizeReturn, type UseAutoSaveOptions, type UseAutoSaveReturn, type UseClipboardOptions, type UseClipboardReturn, type UseFixedDropdownOptions, type UseFixedDropdownReturn, type UseHistoryOptions, type UseHistoryReturn, type UseSelectionHighlightOptions, type UseSelectionHighlightReturn, type UseTableSelectionOptions, type UseTableSelectionReturn, type UseWheelZoomOptions, type UseWheelZoomReturn, type VisualLineNavigationOptions, ZOOM_PRESETS, clampZoom, createSelectionFromDOM, extractTrackedChanges, findNearestZoomPreset, formatLastSaveTime, formatStorageSize, formatZoom, generateOverlayElements, getAutoSaveStatusLabel, getAutoSaveStorageSize, getNextZoomPreset, getPreviousZoomPreset, getSelectionRuns, getZoomPresets, isAutoSaveSupported, isZoomPreset, parseZoom, useAspectLockedSize, useAutoHistory, useAutoSave, useClipboard, useDocumentHistory, useDragAutoScroll, useFixedDropdown, useHistory, useSelectionHighlight, useTableSelection, useTrackedChanges, useVisualLineNavigation, useWheelZoom };
