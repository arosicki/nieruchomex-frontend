import { BlockquoteElement } from '@/components/plate-ui/blockquote-element';
import { CodeBlockElement } from '@/components/plate-ui/code-block-element';
import { CodeLeaf } from '@/components/plate-ui/code-leaf';
import { CodeLineElement } from '@/components/plate-ui/code-line-element';
import { CodeSyntaxLeaf } from '@/components/plate-ui/code-syntax-leaf';
import { EmojiInputElement } from '@/components/plate-ui/emoji-input-element';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { HrElement } from '@/components/plate-ui/hr-element';
import { LinkElement } from '@/components/plate-ui/link-element';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';
import {
    TableCellElement,
    TableCellHeaderElement,
} from '@/components/plate-ui/table-cell-element';
import { TableElement } from '@/components/plate-ui/table-element';
import { TableRowElement } from '@/components/plate-ui/table-row-element';
import { withProps } from '@udecode/cn';
import { EmojiInputPlugin } from '@udecode/plate-emoji/react';
import {
    BoldPlugin,
    CodePlugin,
    ItalicPlugin,
    StrikethroughPlugin,
    SubscriptPlugin,
    SuperscriptPlugin,
    UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import {
    CodeBlockPlugin,
    CodeLinePlugin,
    CodeSyntaxPlugin,
} from '@udecode/plate-code-block/react';
import { ParagraphPlugin, PlateLeaf } from '@udecode/plate-common/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import {
    TableCellHeaderPlugin,
    TableCellPlugin,
    TablePlugin,
    TableRowPlugin,
} from '@udecode/plate-table/react';
import { BlockSelectionPlugin } from '@udecode/plate-selection/react';
import { BlockSelection } from '@/components/plate-ui/block-selection';

export const viewComponents = {
    [BlockquotePlugin.key]: BlockquoteElement,
    [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
    [CodeBlockPlugin.key]: CodeBlockElement,
    [CodeLinePlugin.key]: CodeLineElement,
    [CodePlugin.key]: CodeLeaf,
    [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
    [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
    [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
    [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
    [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
    [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
    [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
    [HorizontalRulePlugin.key]: HrElement,
    [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
    [LinkPlugin.key]: LinkElement,
    [ParagraphPlugin.key]: ParagraphElement,
    [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
    [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
    [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
    [TableCellHeaderPlugin.key]: TableCellHeaderElement,
    [TableCellPlugin.key]: TableCellElement,
    [TablePlugin.key]: TableElement,
    [TableRowPlugin.key]: TableRowElement,
    [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
    [BlockSelectionPlugin.key]: BlockSelection,
};
export const editorComponents = {
    ...viewComponents,
    [EmojiInputPlugin.key]: EmojiInputElement,
};
