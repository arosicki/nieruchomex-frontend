import { Plate } from '@udecode/plate-common/react';

import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import type { Value } from '@udecode/plate-common';
import { useCreateEditor } from './use-create-editor';
import { FloatingToolbar } from '../plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '../plate-ui/floating-toolbar-buttons';
import { FixedToolbar } from '../plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '../plate-ui/fixed-toolbar-buttons';

interface Props {
    value?: string | Value;
    readOnly?: boolean;
}

export const RichtextEditor = ({ value, readOnly }: Props) => {
    const editor = useCreateEditor({
        value,
        readOnly,
        id: 'richtext-editor',
    });

    return (
        <Plate editor={editor}>
            <FixedToolbar>
                <FixedToolbarButtons />
            </FixedToolbar>

            <EditorContainer>
                {!readOnly && (
                    <FloatingToolbar>
                        <FloatingToolbarButtons />
                    </FloatingToolbar>
                )}

                <Editor disabled={readOnly} />
            </EditorContainer>
        </Plate>
    );
};
