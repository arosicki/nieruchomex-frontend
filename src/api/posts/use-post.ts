import { useSuspenseQuery } from '@tanstack/react-query';
import { QueryKeys } from '../helpers/query-keys';
import { Response } from '../models/response';
import { Post } from '../models/post';
import { Endpoints } from '../helpers/endpoints';

import { callApi } from '../helpers/call-api';
import { FetchError } from '../helpers/fetch-error';

interface Params {
    id: string;
}

export const usePost = ({ id }: Params) => {
    return useSuspenseQuery<Response<Post>, FetchError>({
        queryKey: [QueryKeys.POST, id],
        queryFn: async ({ signal }) => {
            return callApi(Endpoints.POST, {
                params: { id },
                signal,
            });
        },
    });
};
