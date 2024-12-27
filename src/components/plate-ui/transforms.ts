'use client';

import type { PlateEditor } from '@udecode/plate-common/react';

import { insertCodeBlock } from '@udecode/plate-code-block';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import {
    type TElement,
    type TNodeEntry,
    getBlockAbove,
    getBlocks,
    getNodeEntry,
    insertNodes,
    removeEmptyPreviousBlock,
    setNodes,
    unsetNodes,
    withoutNormalizing,
} from '@udecode/plate-common';
import { insertToc } from '@udecode/plate-heading';
import { TocPlugin } from '@udecode/plate-heading/react';
import { ListStyleType } from '@udecode/plate-indent-list';
import { IndentListPlugin } from '@udecode/plate-indent-list/react';
import { LinkPlugin, triggerFloatingLink } from '@udecode/plate-link/react';
import { insertTable } from '@udecode/plate-table';
import {
    TableCellPlugin,
    TablePlugin,
    TableRowPlugin,
} from '@udecode/plate-table/react';
import { Path } from 'slate';

export const STRUCTURAL_TYPES: string[] = [
    TablePlugin.key,
    TableRowPlugin.key,
    TableCellPlugin.key,
];

const insertList = (editor: PlateEditor, type: string) => {
    insertNodes(
        editor,
        editor.api.create.block({
            indent: 1,
            listStyleType: type,
        }),
        { select: true },
    );
};

const insertBlockMap: Record<
    string,
    (editor: PlateEditor, type: string) => void
> = {
    [CodeBlockPlugin.key]: (editor) =>
        insertCodeBlock(editor, { select: true }),
    [ListStyleType.Decimal]: insertList,
    [ListStyleType.Disc]: insertList,
    [TablePlugin.key]: (editor) => insertTable(editor, {}, { select: true }),
    [TocPlugin.key]: (editor) => insertToc(editor, { select: true }),
};

const insertInlineMap: Record<
    string,
    (editor: PlateEditor, type: string) => void
> = {
    [LinkPlugin.key]: (editor) =>
        triggerFloatingLink(editor, { focused: true }),
};

export const insertBlock = (editor: PlateEditor, type: string) => {
    withoutNormalizing(editor, () => {
        if (type in insertBlockMap) {
            insertBlockMap[type](editor, type);
        } else {
            const path = getBlockAbove(editor)?.[1];

            if (!path) return;

            const at = Path.next(path);

            insertNodes(editor, editor.api.create.block({ type }), {
                at,
                select: true,
            });
        }

        removeEmptyPreviousBlock(editor);
    });
};

export const insertInlineElement = (editor: PlateEditor, type: string) => {
    if (insertInlineMap[type]) {
        insertInlineMap[type](editor, type);
    }
};

const setList = (
    editor: PlateEditor,
    type: string,
    entry: TNodeEntry<TElement>,
) => {
    setNodes(
        editor,
        editor.api.create.block({
            indent: 1,
            listStyleType: type,
        }),
        {
            at: entry[1],
        },
    );
};

const setBlockMap: Record<
    string,
    (editor: PlateEditor, type: string, entry: TNodeEntry<TElement>) => void
> = {
    [ListStyleType.Decimal]: setList,
    [ListStyleType.Disc]: setList,
};

export const setBlockType = (
    editor: PlateEditor,
    type: string,
    { at }: { at?: Path } = {},
) => {
    withoutNormalizing(editor, () => {
        const setEntry = (entry: TNodeEntry<TElement>) => {
            const [node, path] = entry;

            if (node[IndentListPlugin.key]) {
                unsetNodes(editor, [IndentListPlugin.key, 'indent'], {
                    at: path,
                });
            }
            if (type in setBlockMap) {
                return setBlockMap[type](editor, type, entry);
            }
            if (node.type !== type) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                editor.setNodes<any>({ type }, { at: path });
            }
        };

        if (at) {
            const entry = getNodeEntry<TElement>(editor, at);

            if (entry) {
                setEntry(entry);

                return;
            }
        }

        const entries = getBlocks(editor, { mode: 'lowest' });

        entries.forEach((entry) => setEntry(entry));
    });
};

export const getBlockType = (block: TElement) => {
    if (block[IndentListPlugin.key]) {
        if (block[IndentListPlugin.key] === ListStyleType.Decimal) {
            return ListStyleType.Decimal;
        } else {
            return ListStyleType.Disc;
        }
    }

    return block.type;
};
