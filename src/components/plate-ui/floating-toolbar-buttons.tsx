'use client';

import {
    BoldPlugin,
    CodePlugin,
    ItalicPlugin,
    StrikethroughPlugin,
    SubscriptPlugin,
    SuperscriptPlugin,
    UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { useEditorReadOnly } from '@udecode/plate-common/react';
import {
    BoldIcon,
    Code2Icon,
    ItalicIcon,
    StrikethroughIcon,
    SubscriptIcon,
    SuperscriptIcon,
    UnderlineIcon,
} from 'lucide-react';

import { LinkToolbarButton } from './link-toolbar-button';
import { MarkToolbarButton } from './mark-toolbar-button';
import { ToolbarGroup } from './toolbar';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';

export function FloatingToolbarButtons() {
    const readOnly = useEditorReadOnly();

    if (readOnly) return null;

    return (
        <>
            <ToolbarGroup>
                <TurnIntoDropdownMenu />

                <MarkToolbarButton
                    nodeType={BoldPlugin.key}
                    tooltip="Bold (⌘+B)"
                >
                    <BoldIcon />
                </MarkToolbarButton>

                <MarkToolbarButton
                    nodeType={ItalicPlugin.key}
                    tooltip="Italic (⌘+I)"
                >
                    <ItalicIcon />
                </MarkToolbarButton>

                <MarkToolbarButton
                    nodeType={UnderlinePlugin.key}
                    tooltip="Underline (⌘+U)"
                >
                    <UnderlineIcon />
                </MarkToolbarButton>

                <MarkToolbarButton
                    nodeType={StrikethroughPlugin.key}
                    tooltip="Strikethrough (⌘+⇧+M)"
                >
                    <StrikethroughIcon />
                </MarkToolbarButton>

                <MarkToolbarButton
                    nodeType={SubscriptPlugin.key}
                    tooltip="Subscript (⌘+,)"
                >
                    <SubscriptIcon />
                </MarkToolbarButton>

                <MarkToolbarButton
                    nodeType={SuperscriptPlugin.key}
                    tooltip="Superscript (⌘+.)"
                >
                    <SuperscriptIcon />
                </MarkToolbarButton>

                <MarkToolbarButton
                    nodeType={CodePlugin.key}
                    tooltip="Code (⌘+E)"
                >
                    <Code2Icon />
                </MarkToolbarButton>

                <LinkToolbarButton />
            </ToolbarGroup>
        </>
    );
}
