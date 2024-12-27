import { usePosts } from '@/api/posts/use-posts';
import { PostCarousel } from '@/components/post-carousel/post-carousel';

export const NewestRentalPostsConnector = () => {
    const { data } = usePosts({
        variables: {
            type: 'RENTAL',
        },
        status: ['PUBLISHED'],
    });

    return <PostCarousel posts={data.data} />;
};
