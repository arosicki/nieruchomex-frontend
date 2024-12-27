import { usePosts } from '@/api/posts/use-posts';
import { Pagination } from '@/components/pagination';
import { PostList } from '@/components/post-list/post-list';
import { Button } from '@/components/ui/button';
import { BREAKPOINTS } from '@/config';
import { useMediaQuery } from '@/utils/useMediaQuery';
import { useSearch } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Info, PlusIcon } from 'lucide-react';

const STRINGS = {
    NO_FAVORITE_POSTS: "You haven't added any posts yet.",
    ADD_POST: 'Add post',
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
                <h3>{STRINGS.NO_FAVORITE_POSTS}</h3>
                <Button asChild>
                    <Link
                        to="/posts/$postId"
                        params={{
                            postId: 'new',
                        }}
                    >
                        <PlusIcon />
                        {STRINGS.ADD_POST}
                    </Link>
                </Button>
            </div>
        );

    return (
        <>
            <PostList
                posts={data.data}
                displayFormat={isSmall ? 'grid' : 'list'}
                editButton
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
