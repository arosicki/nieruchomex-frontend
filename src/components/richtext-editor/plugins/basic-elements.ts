import { BasicElementsPlugin } from '@udecode/plate-basic-elements/react';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import Prism from 'prismjs';

export const basicElementsPlugin = BasicElementsPlugin.configurePlugin(
    CodeBlockPlugin,
    {
        options: {
            prism: Prism,
        },
    },
);
