export { B as BookmarkOption, F as FindReplaceDialog, a as FindReplaceDialogProps, H as HyperlinkData, b as HyperlinkDialog, c as HyperlinkDialogProps, K as KeyboardShortcut, d as KeyboardShortcutsDialog, e as KeyboardShortcutsDialogProps, P as PasteOption, f as PasteSpecialDialog, g as PasteSpecialDialogProps, S as ShortcutCategory, U as UseKeyboardShortcutsDialogOptions, h as UseKeyboardShortcutsDialogReturn, i as UsePasteSpecialOptions, j as UsePasteSpecialReturn, k as createBookmarkLinkData, l as createHyperlinkData, m as emailToMailto, n as extractBookmarksForDialog, o as formatShortcutKeys, p as getAllCategories, q as getAllPasteOptions, r as getCategoryLabel, s as getCommonShortcuts, t as getDefaultPasteOption, u as getDefaultShortcuts, v as getDisplayText, w as getPasteOption, x as getShortcutsByCategory, y as getUrlType, z as isBookmarkHyperlinkData, A as isExternalHyperlinkData, C as isPasteSpecialShortcut, D as isValidUrl, E as normalizeUrl, G as phoneToTel, I as useKeyboardShortcutsDialog, J as usePasteSpecial } from './KeyboardShortcutsDialog-0DHej8m-.js';
import React__default from 'react';
import { S as SectionProperties } from './run-DndcHMrf.js';
export { F as FindMatch, a as FindOptions, b as FindResult, H as HighlightOptions, c as createDefaultFindOptions, d as createSearchPattern, e as escapeRegexString, f as findAllMatches, g as getDefaultHighlightOptions, h as getMatchCountText, i as isEmptySearch, r as replaceAllInContent, j as replaceFirstInContent } from './clipboard-B3avLPCG.js';
import './index-DHTYI3R-.js';

/**
 * Page Setup Dialog
 *
 * Modal for editing page layout properties:
 * - Page size (Letter, A4, Legal, etc.)
 * - Orientation (portrait/landscape)
 * - Margins (top, bottom, left, right) in inches
 */

interface PageSetupDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (props: Partial<SectionProperties>) => void;
    currentProps?: SectionProperties;
}
declare function PageSetupDialog({ isOpen, onClose, onApply, currentProps, }: PageSetupDialogProps): React__default.ReactElement | null;

export { PageSetupDialog, type PageSetupDialogProps };
