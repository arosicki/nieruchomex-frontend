import { useMemo } from 'react';
import { usePosts } from '../../../api/posts/use-posts';
import { PostList } from '../../../components/post-list/post-list';
import { DEFAULT_LIMIT } from '../../../config';
import { useUserContext } from '../../../context/user-context';

type Props = {
    userId: number;
};

export const UserPostsConnector = ({ userId }: Props) => {
    const user = useUserContext();

    const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = usePosts({
        limit: DEFAULT_LIMIT,
        userId,
    });

    const posts = useMemo(
        () => data.pages.flatMap((page) => page.data),
        [data],
    );

    const isOtherUserWall = user?.id !== userId;

    return (
        <PostList
            posts={posts}
            isOtherUserWall={isOtherUserWall}
            fetchNextPage={() => hasNextPage && fetchNextPage()}
            isFetchingNextPage={isFetchingNextPage}
        />
    );
};
