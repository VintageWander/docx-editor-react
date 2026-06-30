import { D as Document } from './document-DktZDMbO.cjs';

/**
 * Manager Types
 *
 * Framework-agnostic interfaces for the editor's manager classes.
 * @packageDocumentation
 * @public
 */

/**
 * Framework-agnostic interface for an imperatively mounted editor instance.
 *
 * Returned by `renderAsync()` implementations (React, Vue, etc.).
 * Consumers use this to interact with the editor programmatically.
 */
interface EditorHandle {
    /** Save the document and return the DOCX as a Blob. */
    save(): Promise<Blob | null>;
    /** Get the current parsed document model. */
    getDocument(): Document | null;
    /** Focus the editor. */
    focus(): void;
    /** Unmount the editor and clean up. */
    destroy(): void;
}
/** Auto-save status */
type AutoSaveStatus = 'idle' | 'saving' | 'saved' | 'error';
/** Saved document data structure */
interface SavedDocumentData {
    /** The document JSON */
    document: Document;
    /** When the document was saved */
    savedAt: string;
    /** Version for format compatibility */
    version: number;
    /** Optional document identifier */
    documentId?: string;
}

export type { AutoSaveStatus as A, EditorHandle as E, SavedDocumentData as S };
