import { createLazyFileRoute } from '@tanstack/react-router';
import { SinglePostPage } from '../../pages/single-post/single-post';
import { ErrorPage } from '../../pages/error';

export const Route = createLazyFileRoute('/posts/$postId')({
    component: SinglePostPage,
    parseParams: (params) => ({
        postId: Number(params.postId),
    }),
    errorComponent: ErrorPage,
});
