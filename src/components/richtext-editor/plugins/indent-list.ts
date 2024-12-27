import { ParagraphPlugin } from '@udecode/plate-common/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { IndentListPlugin } from '@udecode/plate-indent-list/react';

export const indentListPlugin = IndentListPlugin.configure({
    inject: {
        targetPlugins: [ParagraphPlugin.key, HEADING_KEYS.h1],
    },
});
