import { usePosts } from '@/api/posts/use-posts';
import { PostCarousel } from '@/components/post-carousel/post-carousel';
import { Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const FavoritePostsConnector = () => {
    const { t } = useTranslation();
    const { data } = usePosts({
        variables: {},
        favoritesOnly: true,
        status: ['PUBLISHED', 'ARCHIVED'],
    });

    if (!data.data.length)
        return (
            <div className="w-full flex flex-col items-center gap-2">
                <Info size={64} className="text-muted-foreground" />
                <h3>{t("You haven't added any posts to favorites yet.")}</h3>
                <p>
                    {t(
                        'Click the heart icon on next to a post to see it here.',
                    )}
                </p>
            </div>
        );

    return <PostCarousel posts={data.data} />;
};
