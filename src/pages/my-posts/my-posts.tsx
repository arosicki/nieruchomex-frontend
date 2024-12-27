import { AddressSearch } from '@/components/address-search';
import { FilterPanel, PostSearchFormModel } from '@/components/filter-panel';
import { useUserContext } from '@/context/user-context';
import { WallLayout } from '@/layouts/wall';
import { getFiltersSearchParams } from '@/lib/get-search-url-params';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Suspense, useMemo } from 'react';
import { MyPostsConnector } from './connectors/my-posts-connector';
import { Loader } from '@/components/loader/loader';

const STRINGS = {
    MY_POSTS: 'My posts',
    NO_PERMISSION: 'You do not have permission to view this page.',
};

export const MyPostsPage = () => {
    const user = useUserContext();

    if (!user)
        throw new Response(STRINGS.NO_PERMISSION, {
            status: 403,
            statusText: STRINGS.NO_PERMISSION,
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
            to: '/my-posts',
        });
    };

    const onClear = () =>
        navigate({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            search: {} as any,
        });

    return (
        <WallLayout>
            <div className="flex flex-col items-center w-full py-12 gap-8">
                <div className="flex flex-col container border p-4 rounded-lg">
                    <h1 className="text-3xl font-semibold tracking-tight p-4">
                        {STRINGS.MY_POSTS}
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
                        <MyPostsConnector />
                    </Suspense>
                </div>
            </div>
        </WallLayout>
    );
};
