import { Plate, OnChange } from '@udecode/plate-common/react';

import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import type { Value } from '@udecode/plate-common';
import { useCreateEditor } from './use-create-editor';
import { FloatingToolbar } from '../plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '../plate-ui/floating-toolbar-buttons';
import { FixedToolbar } from '../plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '../plate-ui/fixed-toolbar-buttons';
import { debounce } from '@/utils/debounce';

interface Props {
    value?: string | Value;
    readOnly?: boolean;
    onChange?: OnChange;
}

const emptyFn = () => {};

export const RichtextEditor = ({ value, readOnly, onChange }: Props) => {
    const editor = useCreateEditor({
        value,
        readOnly,
        id: 'richtext-editor',
    });

    const [debounced] = debounce(onChange || emptyFn, 300);

    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Plate editor={editor} onChange={debounced as any}>
            {!readOnly && (
                <FixedToolbar>
                    <FixedToolbarButtons />
                </FixedToolbar>
            )}

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
