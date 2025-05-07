import { usePosts } from '@/api/posts/use-posts';
import { Pagination } from '@/components/pagination';
import { PostList } from '@/components/post-list/post-list';
import { Button } from '@/components/ui/button';
import { BREAKPOINTS } from '@/config';
import { useUserContext } from '@/context/user-context';
import { useMediaQuery } from '@/utils/useMediaQuery';
import { useSearch } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Info, PlusIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const MyPostsConnector = () => {
    const { t } = useTranslation();
    const user = useUserContext();
    const { data } = usePosts({
        variables: {},
        userId: user?.id,
        status: ['ARCHIVED', 'DRAFT', 'PUBLISHED'],
    });
    const params = useSearch({
        from: '/my-posts',
    });

    const isSmall = useMediaQuery(BREAKPOINTS.sm);

    const totalPages = Math.ceil(data.info.total / data.info.limit);
    const currentPage = Math.ceil(data.info.offset / data.info.limit) + 1;

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

    return (
        <>
            <PostList
                posts={data.data}
                displayMode="status"
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
