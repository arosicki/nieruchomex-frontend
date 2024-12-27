import { usePosts } from '@/api/posts/use-posts';
import { PostCarousel } from '@/components/post-carousel/post-carousel';

export const NewestSalePostsConnector = () => {
    const { data } = usePosts({
        variables: {
            type: 'SALE',
        },
    });

    return <PostCarousel posts={data.data} />;
};
