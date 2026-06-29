import { P as PluginHostProps, b as PluginHostRef, R as RenderedDomContext, c as PositionCoordinates, d as ReactEditorPlugin } from './types-BAzM4Rty.js';
export { E as EditorPlugin, e as PanelConfig, f as PluginContext, g as PluginPanelProps, a as ReactSidebarItem, S as SidebarItem, h as SidebarItemContext, i as SidebarItemRenderProps } from './types-BAzM4Rty.js';
import * as React from 'react';
import * as prosemirror_state from 'prosemirror-state';
import { Plugin, PluginKey } from 'prosemirror-state';
import { DecorationSet, EditorView } from 'prosemirror-view';
import 'prosemirror-model';

declare const PLUGIN_HOST_STYLES = "\n.plugin-host {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  overflow: visible;\n  position: relative;\n}\n\n.plugin-host-editor {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  overflow: visible;\n}\n\n\n.plugin-panels-left,\n.plugin-panels-right {\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  background: #f8f9fa;\n  border-color: #e9ecef;\n}\n\n.plugin-panels-left {\n  border-right: 1px solid #e9ecef;\n}\n\n.plugin-panels-right {\n  border-left: 1px solid #e9ecef;\n}\n\n.plugin-panels-bottom {\n  border-top: 1px solid #e9ecef;\n  background: #f8f9fa;\n}\n\n.plugin-panel {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  transition: width 0.2s ease, height 0.2s ease;\n}\n\n.plugin-panel.collapsed {\n  overflow: visible;\n}\n\n.plugin-panel-toggle {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 6px 8px;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  font-size: 12px;\n  color: #6c757d;\n  white-space: nowrap;\n}\n\n.plugin-panel.collapsed .plugin-panel-toggle {\n  writing-mode: vertical-rl;\n  text-orientation: mixed;\n  flex-direction: column;\n  height: 100%;\n  padding: 8px 6px;\n}\n\n.plugin-panel-toggle:hover {\n  background: #e9ecef;\n  color: #495057;\n}\n\n.plugin-panel-toggle-icon {\n  font-weight: bold;\n  font-size: 14px;\n}\n\n.plugin-panel.collapsed .plugin-panel-toggle-icon {\n  transform: rotate(90deg);\n}\n\n.plugin-panel-toggle-label {\n  font-weight: 500;\n}\n\n.plugin-panel-content {\n  flex: 1;\n  overflow: auto;\n}\n\n/* Right panel rendered inside viewport - scrolls with content */\n.plugin-panel-in-viewport {\n  position: absolute;\n  top: 0;\n  /* Position is set dynamically via inline styles based on page edge */\n  width: 220px;\n  pointer-events: auto;\n  z-index: 10;\n  overflow: visible;\n}\n\n.plugin-panel-in-viewport.collapsed {\n  width: 32px;\n}\n\n.plugin-panel-in-viewport .plugin-panel-toggle {\n  position: sticky;\n  top: 0;\n  background: rgba(255, 255, 255, 0.95);\n  border-radius: 4px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n\n.plugin-panel-in-viewport-content {\n  overflow: visible;\n  position: relative;\n}\n\n/* Plugin overlay container for rendering highlights/decorations */\n.plugin-overlays-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n  overflow: visible;\n  z-index: 5;\n}\n\n.plugin-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n}\n\n/* Individual overlay children manage their own pointer-events.\n   Do NOT set pointer-events: auto here \u2014 it overrides overlay containers\n   that need pointer-events: none to let clicks pass through to the editor. */\n";
/**
 * PluginHost Component
 *
 * Wraps the editor and provides:
 * - Plugin state management
 * - Panel rendering for each plugin
 * - CSS injection for plugin styles
 * - Callbacks for editor interaction
 */
declare const PluginHost: React.ForwardRefExoticComponent<PluginHostProps & React.RefAttributes<PluginHostRef>>;

/**
 * RenderedDomContext Implementation
 *
 * Provides DOM-based position mapping for the LayoutPainter output.
 * Uses the same data-pm-start/data-pm-end attribute pattern as the
 * selection overlay in PagedEditor.
 * @packageDocumentation
 * @public
 */

/**
 * Implementation of RenderedDomContext.
 *
 * This class provides position mapping between ProseMirror document
 * positions and pixel coordinates in the rendered DOM. It uses the
 * data-pm-start and data-pm-end attributes that LayoutPainter adds
 * to span elements.
 */
declare class RenderedDomContextImpl implements RenderedDomContext {
    pagesContainer: HTMLElement;
    zoom: number;
    constructor(pagesContainer: HTMLElement, zoom?: number);
    /**
     * Get pixel coordinates for a ProseMirror position.
     * Uses the browser's text rendering via Range API for precise positioning.
     */
    getCoordinatesForPosition(pmPos: number): PositionCoordinates | null;
    /**
     * Find DOM elements that overlap with a ProseMirror position range.
     */
    findElementsForRange(from: number, to: number): Element[];
    /**
     * Get bounding rectangles for a range of text.
     * Handles line wraps by returning multiple rects.
     */
    getRectsForRange(from: number, to: number): Array<{
        x: number;
        y: number;
        width: number;
        height: number;
    }>;
    /**
     * Get the offset of the pages container from its parent viewport.
     * This is needed for positioning overlays that are rendered in the
     * viewport container rather than directly in the pages container.
     */
    getContainerOffset(): {
        x: number;
        y: number;
    };
}
/**
 * Create a RenderedDomContext for a pages container element.
 *
 * @param pagesContainer - The container element holding rendered pages
 * @param zoom - Current zoom level (default 1)
 */
declare function createRenderedDomContext(pagesContainer: HTMLElement, zoom?: number): RenderedDomContext;

/**
 * Template tag types
 */
type TagType = 'variable' | 'sectionStart' | 'sectionEnd' | 'invertedStart' | 'raw';
/**
 * A found template tag
 */
interface TemplateTag {
    id: string;
    type: TagType;
    name: string;
    rawTag: string;
    from: number;
    to: number;
    /** For sections: nested variable names */
    nestedVars?: string[];
    /** True if this variable is inside a section (shown in section's nested vars) */
    insideSection?: boolean;
}
/**
 * Plugin state
 */
interface TemplatePluginState$1 {
    tags: TemplateTag[];
    decorations: DecorationSet;
    hoveredId?: string;
    selectedId?: string;
}
/**
 * Plugin key
 */
declare const templatePluginKey: PluginKey<TemplatePluginState$1>;
/**
 * Create the template plugin
 */
declare function createTemplatePlugin(): Plugin<TemplatePluginState$1>;
/**
 * Get tags from editor state
 */
declare function getTemplateTags(state: prosemirror_state.EditorState): TemplateTag[];
/**
 * Set hovered tag
 */
declare function setHoveredElement(view: EditorView, id: string | undefined): void;
/**
 * Set selected tag
 */
declare function setSelectedElement(view: EditorView, id: string | undefined): void;
/**
 * CSS styles for template decorations
 */
declare const TEMPLATE_DECORATION_STYLES = "\n.docx-template-tag {\n  cursor: pointer;\n  transition: background-color 0.1s;\n}\n\n.docx-template-tag:hover,\n.docx-template-tag.hovered {\n  filter: brightness(0.95);\n}\n\n.docx-template-tag.selected {\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);\n}\n";

/**
 * Template Plugin
 *
 * Docxtemplater template support as a plugin for the DOCX Editor.
 *
 * Features:
 * - Full docxtemplater syntax detection (variables, loops, conditionals)
 * - Sidebar annotation chips showing template structure (via getSidebarItems)
 * - Differentiated visual highlighting by element type
 *
 * @example
 * ```tsx
 * import { PluginHost, templatePlugin } from '@/react/plugin-api';
 *
 * function MyEditor() {
 *   return (
 *     <PluginHost plugins={[templatePlugin]}>
 *       <DocxEditor document={doc} onChange={handleChange} />
 *     </PluginHost>
 *   );
 * }
 * ```
 */

interface TemplatePluginState {
    tags: TemplateTag[];
    hoveredId?: string;
    selectedId?: string;
}
/**
 * Create the template plugin instance.
 */
declare function createPlugin(_options?: {
    /** @deprecated — panel is no longer used; template chips render in the unified sidebar */
    defaultCollapsed?: boolean;
    /** @deprecated */
    panelPosition?: 'left' | 'right';
    /** @deprecated */
    panelWidth?: number;
}): ReactEditorPlugin<TemplatePluginState>;
/**
 * Default template plugin instance.
 */
declare const templatePlugin: ReactEditorPlugin<TemplatePluginState>;

export { PLUGIN_HOST_STYLES, PluginHost, PluginHostProps, PluginHostRef, PositionCoordinates, ReactEditorPlugin, RenderedDomContext, RenderedDomContextImpl, TEMPLATE_DECORATION_STYLES, type TagType, type TemplateTag, createRenderedDomContext, createPlugin as createTemplatePlugin, createTemplatePlugin as createTemplateProseMirrorPlugin, getTemplateTags as getTemplatePluginTags, setHoveredElement, setSelectedElement, templatePlugin, templatePluginKey };
