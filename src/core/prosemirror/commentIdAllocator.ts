/**
 * Comment + tracked-change ID allocation.
 *
 * Comments (`w:comment` ids) and tracked changes (`w:ins`/`w:del` revision ids)
 * share a single OOXML ID space — a duplicate ID between the two corrupts the
 * round-trip. Allocation is therefore one monotonic, no-reuse counter, exposed
 * as an **instance-scoped** factory rather than module-global state so two
 * editor instances on one page never share (or collide on) a counter.
 *
 * Kept separate from the comment/tracked-change transaction builders
 * (`commentOps.ts`) so the allocator can be owned independently — the editor
 * engine seeds and threads it without dragging in the PM-text-lookup graph.
 */

import type { EditorView } from 'prosemirror-view';
import type { Comment } from '../types/content';

/** Sentinel ID for a comment that hasn't been persisted yet (anchored to selection). */
export const PENDING_COMMENT_ID = -1;

export interface CommentIdAllocator {
  /** Allocate the next ID and advance the counter. */
  next(): number;
  /**
   * On document load, bump the counter above the highest ID found in the
   * loaded comments and tracked-change marks so subsequent allocations don't
   * collide with already-present IDs.
   */
  seedAbove(maxId: number): void;
}

/**
 * Create an instance-scoped comment/revision ID allocator.
 *
 * IDs are random 31-bit integers rather than a `max + 1` counter. In a
 * collaborative setting two clients allocating at the same time would both pick
 * the same `max + 1` and collide (clobbering each other's comment, which keys on
 * the id) — random ids avoid that without any cross-client coordination, while
 * staying within DOCX's integer `w:id` requirement (int32, never 0 so it never
 * aliases the schema's default commentId). `seedAbove` is retained for API
 * compatibility but is a no-op for random allocation.
 */
export function createCommentIdAllocator(): CommentIdAllocator {
  return {
    next: () => 1 + Math.floor(Math.random() * 0x7ffffffe),
    seedAbove() {},
  };
}

/**
 * Seed an allocator above every comment/revision ID currently in the document
 * — comment objects (including replies, which carry no mark) plus
 * tracked-change `revisionId` marks. Because `seedAbove` only ever raises the
 * counter, this is safe to call on load (React) or before each allocation
 * (Vue): new IDs never collide with or reuse an existing one, and the comment
 * and revision ID spaces stay unified.
 */
export function seedCommentAllocator(
  allocator: CommentIdAllocator,
  comments: Comment[] | undefined,
  view: EditorView | null
): void {
  let max = 0;
  for (const comment of comments ?? []) max = Math.max(max, comment.id);
  if (view) {
    view.state.doc.descendants((node) => {
      for (const mark of node.marks) {
        if (mark.attrs.revisionId != null) max = Math.max(max, mark.attrs.revisionId as number);
      }
    });
  }
  allocator.seedAbove(max);
}
