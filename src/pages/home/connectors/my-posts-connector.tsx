import { usePosts } from '@/api/posts/use-posts';
import { PostCarousel } from '@/components/post-carousel/post-carousel';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/user-context';
import { Link } from '@tanstack/react-router';
import { Info, PlusIcon } from 'lucide-react';

const STRINGS = {
    NO_FAVORITE_POSTS: "You haven't added any posts yet.",
    ADD_POST: 'Add post',
};

export const MyPostsConnector = () => {
    const user = useUserContext();
    const { data } = usePosts({
        variables: {},
        userId: user?.id,
    });

    if (!data.data.length)
        return (
            <div className="w-full flex flex-col items-center gap-4">
                <Info size={64} className="text-muted-foreground" />
                <h3>{STRINGS.NO_FAVORITE_POSTS}</h3>
                <Button asChild>
                    {/* TODO */}
                    {/* <Link to="/post"> */}
                    <Link to="/">
                        <PlusIcon />
                        {STRINGS.ADD_POST}
                    </Link>
                </Button>
            </div>
        );

    return <PostCarousel posts={data.data} displayMode="status" />;
};
