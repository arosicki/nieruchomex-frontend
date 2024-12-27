import { Value } from '@udecode/plate-common';
import {
    CreatePlateEditorOptions,
    usePlateEditor,
} from '@udecode/plate-common/react';
import { editorPlugins, viewPlugins } from './plugins/plugins';
import { editorComponents, viewComponents } from './components/components';
import { withPlaceholders } from '@/components/plate-ui/placeholder';

export const useCreateEditor = (
    {
        components,
        override,
        readOnly,
        ...options
    }: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        components?: Record<string, any>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        plugins?: any[];
        readOnly?: boolean;
    } & Omit<CreatePlateEditorOptions, 'plugins'> = {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deps: any[] = [],
) => {
    return usePlateEditor<Value, (typeof editorPlugins)[number]>(
        {
            override: {
                components: {
                    ...(readOnly
                        ? viewComponents
                        : withPlaceholders(editorComponents)),
                    ...components,
                },
                ...override,
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            plugins: (readOnly ? viewPlugins : editorPlugins) as any,
            ...options,
        },
        deps,
    );
};
