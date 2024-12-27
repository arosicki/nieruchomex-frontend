import { Suspense } from 'react';
import { SinglePostConnector } from './connectors/post-connector';
import { useParams } from '@tanstack/react-router';
<<<<<<< HEAD
import { GlobalLoader } from '@/components/global-loader';
import { PostEditor } from '@/components/post-editor/post-editor';
import { WallLayout } from '@/layouts/wall';
import { useUserContext } from '@/context/user-context';
import { PlateController } from '@udecode/plate-common/react';
=======
import { Loader } from '../../components/loader/loader';
import $ from './single-post.module.scss';
>>>>>>> parent of 075a5bc (Add richtext editor)

const STRINGS = {
    NO_PERMISSION: 'You do not have permission to view this page.',
};

interface Props {
    isEditing?: boolean;
}

export const SinglePostPage = ({ isEditing }: Props) => {
    const user = useUserContext();
    const { postId } = useParams({
<<<<<<< HEAD
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
=======
        from: '/posts/$postId',
    });

    return (
        <Suspense
            fallback={
                <div className={$.loadingContainer}>
                    <Loader />
                </div>
            }
        >
            <SinglePostConnector id={+postId} />
        </Suspense>
>>>>>>> parent of 075a5bc (Add richtext editor)
    );
};
