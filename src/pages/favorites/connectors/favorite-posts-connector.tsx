import { usePosts } from '@/api/posts/use-posts';
import { Pagination } from '@/components/pagination';
import { PostList } from '@/components/post-list/post-list';
import { BREAKPOINTS } from '@/config';
import { useMediaQuery } from '@/utils/useMediaQuery';
import { useSearch } from '@tanstack/react-router';
import { Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const FavoritePostsConnector = () => {
    const { t } = useTranslation();
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
                        {t("You haven't added any posts yet.")}
                    </h3>
                    <p>{t('Add favorite posts to see them here.')}</p>
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
