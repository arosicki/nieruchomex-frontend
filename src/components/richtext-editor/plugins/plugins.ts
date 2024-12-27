import { autoformatPlugin } from './autoformat';
import { BasicMarksPlugin } from '@udecode/plate-basic-marks/react';
import { NodeIdPlugin } from '@udecode/plate-node-id';
import {
    blockSelectionPlugins,
    blockSelectionReadOnlyPlugin,
} from './block-selection';
import { cursorOverlayPlugin } from './cursor-overlay';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { indentPlugin } from './indent';
import { indentListPlugin } from './indent-list';
import { basicElementsPlugin } from './basic-elements';
import { softBreakPlugin } from './soft-break';
import { trailingBlockPlugin } from './trailing-block';
import { linkPlugin } from './link';
import { tablePlugin } from './table';
<<<<<<< HEAD
import { exitBreakPlugin } from './exit-break';
import { lineHeightPlugin } from './line-height';
=======
>>>>>>> parent of c5f64a8 (Almost done)

export const viewPlugins = [
    basicElementsPlugin,
    BasicMarksPlugin,
    NodeIdPlugin,
    cursorOverlayPlugin,
    blockSelectionReadOnlyPlugin,
    HorizontalRulePlugin,
    indentPlugin,
    indentListPlugin,
    lineHeightPlugin,
    linkPlugin,
    tablePlugin,
];

export const editorPlugins = [
    ...viewPlugins,
    autoformatPlugin,
    ...blockSelectionPlugins,
    softBreakPlugin,
    trailingBlockPlugin,
];
