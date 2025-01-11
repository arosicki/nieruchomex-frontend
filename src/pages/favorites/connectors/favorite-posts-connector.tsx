import { usePosts } from '@/api/posts/use-posts';
import { Pagination } from '@/components/pagination';
import { PostList } from '@/components/post-list/post-list';
import { BREAKPOINTS } from '@/config';
import { useMediaQuery } from '@/utils/useMediaQuery';
import { useSearch } from '@tanstack/react-router';
import { Info } from 'lucide-react';

const STRINGS = {
    NO_FAVORITE_POSTS: "You haven't added any posts yet.",
    ADD_POST: 'Add post',
    ADD_FAVORITE_POSTS_TO_SEE_THEM_HERE: 'Add favorite posts to see them here.',
};

export const FavoritePostsConnector = () => {
    const { data } = usePosts({
        variables: {},
        favoritesOnly: true,
        status: ['PUBLISHED', 'ARCHIVED'],
    });
    const params = useSearch({
        from: '/favorites',
    });

    const isSmall = useMediaQuery(BREAKPOINTS.sm);

    const totalPages = Math.ceil(data.info.total / data.info.limit);
    const currentPage = Math.ceil(data.info.offset / data.info.limit) + 1;

    if (!data.data.length)
        return (
            <div className="w-full flex flex-col items-center gap-4">
                <Info size={64} className="text-muted-foreground" />
                <div className="flex items-center flex-col gap-2">
                    <h3 className="text-2xl font-semibold tracking-tight">
                        {STRINGS.NO_FAVORITE_POSTS}
                    </h3>
                    <p>{STRINGS.ADD_FAVORITE_POSTS_TO_SEE_THEM_HERE}</p>
                </div>
            </div>
        );

    return (
        <>
            <PostList
                posts={data.data}
                displayFormat={isSmall ? 'grid' : 'list'}
            />
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                linkTo="/my-posts"
                linkSearch={params}
            />
        </>
    );
};
