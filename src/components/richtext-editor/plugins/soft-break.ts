import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { TablePlugin } from '@udecode/plate-table/react';
import { SoftBreakPlugin } from '@udecode/plate-break/react';

export const softBreakPlugin = SoftBreakPlugin.configure({
    options: {
        rules: [
            { hotkey: 'shift+enter' },
            {
                hotkey: 'enter',
                query: {
                    allow: [
                        CodeBlockPlugin.key,
                        BlockquotePlugin.key,
                        TablePlugin.key,
                    ],
                },
            },
        ],
    },
});
