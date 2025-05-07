import { usePosts } from '@/api/posts/use-posts';
import { PostCarousel } from '@/components/post-carousel/post-carousel';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/user-context';
import { Link } from '@tanstack/react-router';
import { Info, PlusIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const MyPostsConnector = () => {
    const { t } = useTranslation();
    const user = useUserContext();
    const { data } = usePosts({
        variables: {},
        userId: user?.id,
        status: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
    });

    if (!data.data.length)
        return (
            <div className="w-full flex flex-col items-center gap-4">
                <Info size={64} className="text-muted-foreground" />
                <h3>{t("You haven't added any posts yet.")}</h3>
                <Button asChild>
                    <Link
                        to="/posts/$postId"
                        params={{
                            postId: 'new',
                        }}
                    >
                        <PlusIcon />
                        {t('Add post')}
                    </Link>
                </Button>
            </div>
        );

    return <PostCarousel posts={data.data} displayMode="status" />;
};
