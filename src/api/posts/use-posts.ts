import { QueryKey, useSuspenseQuery } from '@tanstack/react-query';
import { QueryKeys } from '../helpers/query-keys';
import { DEFAULT_LIMIT } from '../../config';
import { Endpoints } from '../helpers/endpoints';
import { PaginatedResponse } from '../models/response';
import { Post, PostStatus } from '../models/post';
import { callApi } from '../helpers/call-api';
import { FetchError } from '../helpers/fetch-error';
import { useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import { getFiltersSearchParams } from '@/lib/get-search-url-params';
import { useRetrieveAddress } from '../address/use-retrive-address';

type Variables = ReturnType<typeof getFiltersSearchParams>;

interface Options {
    /** Overwrites search params */
    variables?: Partial<Variables>;

    /** Show only favorite posts */
    favoritesOnly?: boolean;

    /** Show only posts for given userId */
    userId?: number;

    status?: PostStatus[];
}

export const usePosts = ({
    variables,
    favoritesOnly,
    userId,
    status,
}: Options = {}) => {
    const { data: address } = useRetrieveAddress();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: Record<string, any> = useSearch({
        strict: false,
    });

    const parsedParams = useMemo(() => {
        if (variables)
            return {
                ...variables,
                isFavorite: favoritesOnly ? 'true' : undefined,
                userId: userId ? `${userId}` : undefined,
                type: variables?.type !== 'ALL' ? variables.type : undefined,
            };

        const { distance: rawDistance, ...queryParams } =
            getFiltersSearchParams(params);

        const { latitude = undefined, longitude = undefined } = address
            ?.geometry.coordinates
            ? {
                  latitude: address.geometry.coordinates[1],
                  longitude: address.geometry.coordinates[0],
              }
            : {};

        const distance = rawDistance ? Number(rawDistance) * 1000 : undefined;

        const shouldUseDistance =
            !!params.mapboxId && distance && latitude && longitude;

        return {
            ...queryParams,
            distance: shouldUseDistance ? distance : undefined,
            longitude: shouldUseDistance ? longitude : undefined,
            latitude: shouldUseDistance ? latitude : undefined,
            isFavorite: favoritesOnly ? 'true' : undefined,
            // type: queryParams.type !== 'ANY' ? parsedParams.type : undefined,
        };
    }, [params, address, variables, favoritesOnly, userId]);

    const paramsPage = (params as { page: unknown }).page;

    const page =
        !isNaN(Number(paramsPage)) &&
        Number(paramsPage) > 0 &&
        Number(paramsPage) % 1 === 0
            ? Number(paramsPage)
            : 1;

    return useSuspenseQuery<
        PaginatedResponse<Post>,
        FetchError,
        PaginatedResponse<Post>,
        QueryKey
    >({
        queryKey: [
            parsedParams.isFavorite ? QueryKeys.FAVORITES : QueryKeys.POSTS,
            parsedParams,
            page,
            status,
        ],
        queryFn: async ({ signal }) => {
            return callApi(Endpoints.POSTS, {
                signal,
                query: {
                    offset: DEFAULT_LIMIT * (page - 1),
                    limit: DEFAULT_LIMIT,
                    ...parsedParams,
                    status: status?.join(','),
                },
            });
        },
    });
};
