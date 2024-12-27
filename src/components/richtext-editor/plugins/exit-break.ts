import { ExitBreakPlugin } from '@udecode/plate-break/react';
import { HEADING_LEVELS } from '@udecode/plate-heading';

export const exitBreakPlugin = ExitBreakPlugin.configure({
    options: {
        rules: [
            {
                hotkey: 'mod+enter',
            },
            {
                hotkey: 'mod+shift+enter',
                before: true,
            },
            {
                hotkey: 'enter',
                query: {
                    allow: HEADING_LEVELS,
                    end: true,
                    start: true,
                },
                relative: true,
                level: 1,
            },
        ],
    },
});
