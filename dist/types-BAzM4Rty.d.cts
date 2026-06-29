import { EditorView } from 'prosemirror-view';
import { ReactNode } from 'react';
import { Plugin } from 'prosemirror-state';
import { Node } from 'prosemirror-model';

/**
 * Framework-Agnostic Plugin Interface for the DOCX Editor
 *
 * Core plugin types that can be used by any framework (React, Vue, etc.).
 * Framework-specific adapters extend EditorPluginCore with their own
 * UI rendering capabilities (e.g., ReactEditorPlugin, VueEditorPlugin).
 * @packageDocumentation
 * @public
 */

/**
 * Coordinates returned by position lookup in the rendered DOM.
 */
interface PositionCoordinates {
    x: number;
    y: number;
    height: number;
}
/**
 * Context for accessing the rendered DOM in the paged editor.
 *
 * Provides DOM-based position mapping that works with the LayoutPainter
 * output (visible pages). Use this for rendering overlays, annotations,
 * and other visual elements positioned relative to rendered content.
 *
 * The rendered DOM uses data-pm-start/data-pm-end attributes on spans
 * to map between ProseMirror positions and DOM elements.
 */
interface RenderedDomContext {
    /** The container element holding all rendered pages. */
    pagesContainer: HTMLElement;
    /**
     * Get pixel coordinates for a ProseMirror position in the rendered DOM.
     * Returns null if the position cannot be found.
     */
    getCoordinatesForPosition(pmPos: number): PositionCoordinates | null;
    /**
     * Find DOM elements that overlap with a ProseMirror position range.
     */
    findElementsForRange(from: number, to: number): Element[];
    /**
     * Get bounding rectangles for a range of text, accounting for line wraps.
     * Returns rects relative to the pages container.
     */
    getRectsForRange(from: number, to: number): Array<{
        x: number;
        y: number;
        width: number;
        height: number;
    }>;
    /** Current zoom level (1 = 100%). */
    zoom: number;
    /**
     * Offset of the pages container from its parent viewport.
     */
    getContainerOffset(): {
        x: number;
        y: number;
    };
}
/**
 * Props passed to plugin panel components (framework-agnostic base).
 */
interface PluginPanelProps<TState = unknown> {
    /** Current ProseMirror editor view */
    editorView: EditorView | null;
    /** Current ProseMirror document */
    doc: Node | null;
    /** Scroll editor to a specific position */
    scrollToPosition: (pos: number) => void;
    /** Select a range in the editor */
    selectRange: (from: number, to: number) => void;
    /** Plugin-specific state (managed by the plugin) */
    pluginState: TState;
    /** Width of the panel in pixels */
    panelWidth: number;
    /**
     * Context for the rendered DOM (LayoutPainter output).
     * May be null if layout hasn't completed yet.
     */
    renderedDomContext: RenderedDomContext | null;
}
/**
 * Configuration for plugin panel rendering.
 */
interface PanelConfig {
    /** Where to render the panel */
    position: 'left' | 'right' | 'bottom';
    /** Default width/height of the panel */
    defaultSize: number;
    /** Minimum size */
    minSize?: number;
    /** Maximum size */
    maxSize?: number;
    /** Whether the panel is resizable */
    resizable?: boolean;
    /** Whether the panel can be collapsed */
    collapsible?: boolean;
    /** Initial collapsed state */
    defaultCollapsed?: boolean;
}
/**
 * Framework-agnostic core plugin interface.
 *
 * Contains all non-UI plugin capabilities:
 * - ProseMirror plugins (decorations, keymaps, etc.)
 * - State management (initialize, onStateChange, destroy)
 * - CSS injection
 * - Panel configuration
 *
 * Framework adapters (ReactEditorPlugin, VueEditorPlugin) extend this
 * with their own Panel component type and renderOverlay function.
 */
interface EditorPluginCore<TState = any> {
    /** Unique plugin identifier */
    id: string;
    /** Display name for the plugin */
    name: string;
    /**
     * ProseMirror plugins to register with the editor.
     * These are merged with the editor's internal plugins.
     */
    proseMirrorPlugins?: Plugin[];
    /**
     * Configuration for the panel (position, size, etc.)
     */
    panelConfig?: PanelConfig;
    /**
     * Called when the editor state changes.
     * Use this to update plugin-specific state based on document changes.
     */
    onStateChange?: (view: EditorView) => TState | undefined;
    /**
     * Initialize plugin state when the plugin is first loaded.
     */
    initialize?: (view: EditorView | null) => TState;
    /**
     * Called when the plugin is being destroyed.
     * Use this for cleanup (subscriptions, timers, etc.)
     */
    destroy?: () => void;
    /**
     * CSS styles to inject for this plugin.
     * Can be a string of CSS or a URL to a stylesheet.
     */
    styles?: string;
}
/**
 * A sidebar item anchored to a document position.
 * Framework adapters extend this with rendering capabilities.
 */
interface SidebarItem {
    /** Unique ID for this item (used as React key and for overlap resolution). */
    id: string;
    /** ProseMirror document position this item anchors to. */
    anchorPos: number;
    /** Optional key into the anchorPositions Map (e.g. "comment-42", "revision-7"). */
    anchorKey?: string;
    /** Sort priority within items at the same anchor Y. Lower = first. Default: 0. */
    priority?: number;
    /** Temporary items (e.g. "add comment" input) skip entrance animation. */
    isTemporary?: boolean;
    /** Pre-computed Y position (scroll-container coords, pre-zoom). Overrides anchor resolution. */
    fixedY?: number;
}
/**
 * Context provided to plugins when computing sidebar items.
 */
interface SidebarItemContext {
    editorView: EditorView | null;
    renderedDomContext: RenderedDomContext | null;
    /** Pre-computed Y positions from layout engine (keys like "comment-{id}"). */
    anchorPositions: Map<string, number>;
    zoom: number;
}

/**
 * React Plugin Interface for the DOCX Editor
 *
 * Extends the framework-agnostic EditorPluginCore with React-specific
 * UI rendering capabilities (Panel component, renderOverlay).
 */

/**
 * React-specific editor plugin interface.
 *
 * Extends EditorPluginCore with:
 * - Panel: React component for rendering in the annotation panel
 * - renderOverlay: Function returning ReactNode for overlay rendering
 */
/**
 * Render props passed to each sidebar item.
 */
interface SidebarItemRenderProps {
    /** Whether this item is currently expanded/active. */
    isExpanded: boolean;
    /** Toggle expand/collapse for this item. */
    onToggleExpand: () => void;
    /** Ref callback to measure the rendered card height. */
    measureRef: (el: HTMLDivElement | null) => void;
}
/**
 * A sidebar item with React rendering, anchored to a document position.
 */
interface ReactSidebarItem extends SidebarItem {
    /** Render the card content. */
    render: (props: SidebarItemRenderProps) => ReactNode;
    /** Estimated height in pixels (for pre-layout before measurement). Default: 40. */
    estimatedHeight?: number;
}
interface ReactEditorPlugin<TState = any> extends EditorPluginCore<TState> {
    /**
     * React component to render in the annotation panel area.
     * Receives editor state and callbacks for interaction.
     */
    Panel?: React.ComponentType<PluginPanelProps<TState>>;
    /**
     * Render an overlay on top of the rendered pages.
     * Use this for highlights, annotations, or other visual elements
     * that need to be positioned relative to the document content.
     */
    renderOverlay?: (context: RenderedDomContext, state: TState, editorView: EditorView | null) => ReactNode;
    /**
     * Provide sidebar items anchored to document positions.
     * Called whenever plugin state changes.
     * Items from all plugins are merged and laid out together in a unified sidebar.
     */
    getSidebarItems?: (state: TState, context: SidebarItemContext) => ReactSidebarItem[];
}
/**
 * Backwards-compatible alias — EditorPlugin is now ReactEditorPlugin.
 */
type EditorPlugin<TState = any> = ReactEditorPlugin<TState>;
/**
 * Context value provided to plugins and panels.
 */
interface PluginContext {
    /** All registered plugins */
    plugins: EditorPlugin[];
    /** Current editor view */
    editorView: EditorView | null;
    /** Set the editor view (called by editor on mount) */
    setEditorView: (view: EditorView | null) => void;
    /** Get plugin state by plugin ID */
    getPluginState: <T>(pluginId: string) => T | undefined;
    /** Update plugin state */
    setPluginState: <T>(pluginId: string, state: T) => void;
    /** Scroll to a position in the editor */
    scrollToPosition: (pos: number) => void;
    /** Select a range in the editor */
    selectRange: (from: number, to: number) => void;
}
/**
 * Props for the PluginHost component.
 */
interface PluginHostProps {
    /** Plugins to enable */
    plugins: EditorPlugin[];
    /** The editor component (passed as child) */
    children: React.ReactElement;
    /** Class name for the host container */
    className?: string;
}
/**
 * Ref interface for the PluginHost component.
 */
interface PluginHostRef {
    /** Get plugin state by plugin ID */
    getPluginState: <T>(pluginId: string) => T | undefined;
    /** Update plugin state for a plugin */
    setPluginState: <T>(pluginId: string, state: T) => void;
    /** Get the current editor view */
    getEditorView: () => EditorView | null;
    /** Force a refresh of all plugin states */
    refreshPluginStates: () => void;
}

export type { EditorPlugin as E, PluginHostProps as P, RenderedDomContext as R, SidebarItem as S, ReactSidebarItem as a, PluginHostRef as b, PositionCoordinates as c, ReactEditorPlugin as d, PanelConfig as e, PluginContext as f, PluginPanelProps as g, SidebarItemContext as h, SidebarItemRenderProps as i };
