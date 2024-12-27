'use client';

import React from 'react';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import {
    type PlateEditor,
    ParagraphPlugin,
    focusEditor,
    useEditorRef,
} from '@udecode/plate-common/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { ListStyleType } from '@udecode/plate-indent-list';
import { TablePlugin } from '@udecode/plate-table/react';
import {
    FileCodeIcon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    Heading4Icon,
    Heading5Icon,
    Heading6Icon,
    ListIcon,
    ListOrderedIcon,
    MinusIcon,
    PilcrowIcon,
    PlusIcon,
    QuoteIcon,
    TableIcon,
} from 'lucide-react';

import { insertBlock } from '@/components/plate-ui/transforms';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
    useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';

type Group = {
    group: string;
    items: Item[];
};

interface Item {
    icon: React.ReactNode;
    onSelect: (editor: PlateEditor, value: string) => void;
    value: string;
    focusEditor?: boolean;
    label?: string;
}

const groups: Group[] = [
    {
        group: 'Basic blocks',
        items: [
            {
                icon: <PilcrowIcon />,
                label: 'Paragraph',
                value: ParagraphPlugin.key,
            },
            {
                icon: <Heading1Icon />,
                label: 'Heading 1',
                value: HEADING_KEYS.h1,
            },
            {
                icon: <Heading2Icon />,
                label: 'Heading 2',
                value: HEADING_KEYS.h2,
            },
            {
                icon: <Heading3Icon />,
                label: 'Heading 3',
                value: HEADING_KEYS.h3,
            },
            {
                icon: <Heading4Icon />,
                keywords: ['subtitle', 'h4'],
                label: 'Heading 4',
                value: HEADING_KEYS.h4,
            },
            {
                icon: <Heading5Icon />,
                keywords: ['subtitle', 'h5'],
                label: 'Heading 5',
                value: HEADING_KEYS.h5,
            },
            {
                icon: <Heading6Icon />,
                keywords: ['subtitle', 'h6'],
                label: 'Heading 6',
                value: HEADING_KEYS.h6,
            },
            {
                icon: <TableIcon />,
                label: 'Table',
                value: TablePlugin.key,
            },
            {
                icon: <FileCodeIcon />,
                label: 'Code',
                value: CodeBlockPlugin.key,
            },
            {
                icon: <QuoteIcon />,
                label: 'Quote',
                value: BlockquotePlugin.key,
            },
            {
                icon: <MinusIcon />,
                label: 'Divider',
                value: HorizontalRulePlugin.key,
            },
        ].map((item) => ({
            ...item,
            onSelect: (editor, value) => {
                insertBlock(editor, value);
            },
        })),
    },
    {
        group: 'Lists',
        items: [
            {
                icon: <ListIcon />,
                label: 'Bulleted list',
                value: ListStyleType.Disc,
            },
            {
                icon: <ListOrderedIcon />,
                label: 'Numbered list',
                value: ListStyleType.Decimal,
            },
        ].map((item) => ({
            ...item,
            onSelect: (editor, value) => {
                insertBlock(editor, value);
            },
        })),
    },
];

export function InsertDropdownMenu(props: DropdownMenuProps) {
    const editor = useEditorRef();
    const openState = useOpenState();

    return (
        <DropdownMenu modal={false} {...openState} {...props}>
            <DropdownMenuTrigger asChild>
                <ToolbarButton
                    pressed={openState.open}
                    tooltip="Insert"
                    isDropdown
                >
                    <PlusIcon />
                </ToolbarButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="flex max-h-[500px] min-w-0 flex-col overflow-y-auto"
                align="start"
            >
                {groups.map(({ group, items: nestedItems }) => (
                    <DropdownMenuGroup key={group} label={group}>
                        {nestedItems.map(({ icon, label, value, onSelect }) => (
                            <DropdownMenuItem
                                key={value}
                                className="min-w-[180px]"
                                onSelect={() => {
                                    onSelect(editor, value);
                                    focusEditor(editor);
                                }}
                            >
                                {icon}
                                {label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
