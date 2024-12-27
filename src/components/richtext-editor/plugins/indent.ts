import { ParagraphPlugin } from '@udecode/plate-common/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { IndentPlugin } from '@udecode/plate-indent/react';

export const indentPlugin = IndentPlugin.configure({
    inject: {
        targetPlugins: [ParagraphPlugin.key, HEADING_KEYS.h1],
    },
});
