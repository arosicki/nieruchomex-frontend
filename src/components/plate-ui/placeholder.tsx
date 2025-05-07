'use client';

import React from 'react';

import { cn } from '@udecode/cn';
import { ParagraphPlugin } from '@udecode/plate-common/react';
import {
    type PlaceholderProps,
    createNodeHOC,
    createNodesHOC,
    usePlaceholderState,
} from '@udecode/plate-common/react';
import { HEADING_KEYS } from '@udecode/plate-heading';

export const Placeholder = (props: PlaceholderProps) => {
    const { children, nodeProps, placeholder } = props;

    const { enabled } = usePlaceholderState(props);

    return React.Children.map(children, (child) => {
        return React.cloneElement(child, {
            className: child.props.className,
            nodeProps: {
                ...nodeProps,
                className: cn(
                    enabled &&
                        'before:absolute before:cursor-text before:opacity-30 before:content-[attr(placeholder)]',
                ),
                placeholder,
            },
        });
    });
};

// eslint-disable-next-line react-refresh/only-export-components
export const withPlaceholder = createNodeHOC(Placeholder);

// eslint-disable-next-line react-refresh/only-export-components
export const withPlaceholdersPrimitive = createNodesHOC(Placeholder);

// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
export const withPlaceholders = (components: any) =>
    withPlaceholdersPrimitive(components, [
        {
            key: ParagraphPlugin.key,
            hideOnBlur: true,
            placeholder: 'Type a paragraph',
            query: {
                maxLevel: 1,
            },
        },
        {
            key: HEADING_KEYS.h1,
            hideOnBlur: false,
            placeholder: 'Untitled',
        },
    ]);
