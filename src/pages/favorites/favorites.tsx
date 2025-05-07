import { AddressSearch } from '@/components/address-search';
import { FilterPanel, PostSearchFormModel } from '@/components/filter-panel';
import { WallLayout } from '@/layouts/wall';
import { getFiltersSearchParams } from '@/lib/get-search-url-params';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Suspense, useMemo } from 'react';
import { FavoritePostsConnector } from './connectors/favorite-posts-connector';
import { Loader } from '@/components/loader/loader';
import { useUserContext } from '@/context/user-context';
import { useTranslation } from 'react-i18next';

export const FavoritePostsPage = () => {
    const user = useUserContext();
    const { t } = useTranslation();

    if (!user)
        throw new Response(t('You do not have permission to view this page.'), {
            status: 403,
            statusText: t('You do not have permission to view this page.'),
        });

    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: Record<string, any> = useSearch({
        strict: false,
    });

    const parsedParams = useMemo(
        () => getFiltersSearchParams(params),
        [params],
    );

    const onSubmit = (data: PostSearchFormModel) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newSearch: Record<string, any> = data;
        !newSearch.search && delete newSearch.search;

        if (params.mapboxId) newSearch.mapboxId = params.mapboxId;
        if (params.distance) newSearch.distance = params.distance;

        navigate({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            search: newSearch as any,
            to: '/favorites',
        });
    };

    const onClear = () =>
        navigate({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            search: {} as any,
        });

    return (
        <WallLayout>
            <div className="flex flex-col items-center w-full py-12 gap-8 px-4">
                <div className="flex flex-col container border p-4 rounded-lg">
                    <h1 className="text-3xl font-semibold tracking-tight p-4">
                        {t('My favorites')}
                    </h1>
                    <AddressSearch />
                    <FilterPanel
                        onClear={onClear}
                        onSubmit={onSubmit}
                        defaultValues={parsedParams}
                        className="px-4 pb-2"
                    />
                </div>

                <div className='className="flex flex-col container rounded-xl'>
                    <Suspense
                        fallback={
                            <div className="w-full h-24 flex justify-center items-center">
                                <Loader />
                            </div>
                        }
                    >
                        <FavoritePostsConnector />
                    </Suspense>
                </div>
            </div>
        </WallLayout>
    );
};
