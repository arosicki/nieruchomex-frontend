import { usePosts } from '@/api/posts/use-posts';
import { PostCarousel } from '@/components/post-carousel/post-carousel';
import { Info } from 'lucide-react';

const STRINGS = {
    NO_FAVORITE_POSTS: "You haven't added any posts to favorites yet.",
    CLICK_HEART: 'Click the heart icon on next to a post to see it here.',
};

export const FavoritePostsConnector = () => {
    const { data } = usePosts({
        variables: {},
        favoritesOnly: true,
    });

    if (!data.data.length)
        return (
            <div className="w-full flex flex-col items-center gap-2">
                <Info size={64} className="text-muted-foreground" />
                <h3>{STRINGS.NO_FAVORITE_POSTS}</h3>
                <p>{STRINGS.CLICK_HEART}</p>
            </div>
        );

    return <PostCarousel posts={data.data} />;
};
