import { Suspense } from 'react';
import { SinglePostConnector } from './connectors/post-connector';
import { useParams } from '@tanstack/react-router';
<<<<<<< HEAD
<<<<<<< HEAD
import { GlobalLoader } from '@/components/global-loader';
import { PostEditor } from '@/components/post-editor/post-editor';
import { WallLayout } from '@/layouts/wall';
import { useUserContext } from '@/context/user-context';
<<<<<<< HEAD
import { PlateController } from '@udecode/plate-common/react';
=======
import { Loader } from '../../components/loader/loader';
import $ from './single-post.module.scss';
>>>>>>> parent of 075a5bc (Add richtext editor)
=======
import { GlobalLoader } from '@/components/global-loader/global-loader';
import { PostEditor } from '@/components/post-editor/post-editor';
import { WallLayout } from '@/layouts/wall';
>>>>>>> parent of c5f64a8 (Almost done)
=======
>>>>>>> parent of e51f451 (done)

export const SinglePostPage = () => {
    const { postId } = useParams({
<<<<<<< HEAD
<<<<<<< HEAD
        strict: false,
=======
        from: '/posts/$postId/',
>>>>>>> parent of c5f64a8 (Almost done)
    });

    if (postId === 'new') {
        return (
            <WallLayout>
                <PostEditor />
            </WallLayout>
        );
    }

    return (
        <WallLayout>
<<<<<<< HEAD
<<<<<<< HEAD
            <PlateController>
                <Suspense fallback={<GlobalLoader />}>
                    <PostConnector id={postId} isEditing={isEditing} />
                </Suspense>
            </PlateController>
=======
            <Suspense fallback={<GlobalLoader />}>
                <PostConnector id={postId} />
            </Suspense>
>>>>>>> parent of c5f64a8 (Almost done)
=======
            <Suspense fallback={<GlobalLoader />}>
                <PostConnector id={postId} isEditing={isEditing} />
            </Suspense>
>>>>>>> parent of e51f451 (done)
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
