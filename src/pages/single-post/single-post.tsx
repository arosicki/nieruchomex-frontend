import { Suspense } from 'react';
import { PostConnector } from './connectors/post-connector';
import { useParams } from '@tanstack/react-router';
import { GlobalLoader } from '@/components/global-loader';
import { PostEditor } from '@/components/post-editor/post-editor';
import { WallLayout } from '@/layouts/wall';
import { useUserContext } from '@/context/user-context';
import { PlateController } from '@udecode/plate-common/react';

const STRINGS = {
    NO_PERMISSION: 'You do not have permission to view this page.',
};

interface Props {
    isEditing?: boolean;
}

export const SinglePostPage = ({ isEditing }: Props) => {
    const user = useUserContext();
    const { postId } = useParams({
        strict: false,
    });

    if (postId === 'new' || !postId) {
        if (!user) {
            throw new Response(STRINGS.NO_PERMISSION, {
                status: 403,
                statusText: STRINGS.NO_PERMISSION,
            });
        }

        return (
            <WallLayout>
                <PlateController>
                    <PostEditor />
                </PlateController>
            </WallLayout>
        );
    }

    if (!user && isEditing) {
        throw new Response(STRINGS.NO_PERMISSION, {
            status: 403,
            statusText: STRINGS.NO_PERMISSION,
        });
    }

    return (
        <WallLayout>
            <PlateController>
                <Suspense fallback={<GlobalLoader />}>
                    <PostConnector id={postId} isEditing={isEditing} />
                </Suspense>
            </PlateController>
        </WallLayout>
    );
};
