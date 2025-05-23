import { usePosts } from '@/api/posts/use-posts';
import { Pagination } from '@/components/pagination';
import { PostList } from '@/components/post-list/post-list';
import { BREAKPOINTS } from '@/config';
import { useUserContext } from '@/context/user-context';
import { useMediaQuery } from '@/utils/useMediaQuery';
import { useSearch } from '@tanstack/react-router';
import { Trash2Icon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TrashCanConnector = () => {
    const { t } = useTranslation();
    const user = useUserContext();
    const { data } = usePosts({
        variables: {},
        userId: user?.id,
        status: ['DELETED'],
    });
    const params = useSearch({
        from: '/trash-can',
    });

    const isSmall = useMediaQuery(BREAKPOINTS.sm);

    const totalPages = Math.ceil(data.info.total / data.info.limit);
    const currentPage = Math.ceil(data.info.offset / data.info.limit) + 1;

    if (!data.data.length)
        return (
            <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
                <Trash2Icon size={64} className="text-muted-foreground" />
                <h3>{t("You don't have any deleted posts.")}</h3>
                <p>
                    {t(
                        'If you delete a post it will be available here for 7 days',
                    )}
                </p>
            </div>
        );

    return (
        <>
            <PostList
                posts={data.data}
                displayMode="status"
                displayFormat={isSmall ? 'grid' : 'list'}
                buttonConfiguration="restore"
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
