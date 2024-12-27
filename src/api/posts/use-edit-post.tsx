import {
    InfiniteData,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../helpers/endpoints';
import { callApi } from '../helpers/call-api';
import { Post } from '../models/post';
import { QueryKeys } from '../helpers/query-keys';
import { toast } from 'react-toastify';
import { Toast } from '../../components/toast/toast';
import { getErrorText } from '../helpers/get-error-text';
import { ErrorCodes } from '../helpers/error-codes';
import { FetchError } from '../helpers/fetch-error';

interface Params {
    id: number;
}

interface Variables {
    description?: string;
}

export const useEditPost = ({ id }: Params) => {
    const queryClient = useQueryClient();

    return useMutation<Response<Post>, FetchError, Variables>({
        mutationFn: async ({ description }) => {
            return callApi(Endpoints.POST, {
                method: 'PATCH',
                body: {
                    description,
                },
                params: {
                    id: id.toString(),
                },
            });
        },
        onSuccess: (data) => {
            queryClient.setQueryData<Response<Post>>(
                [QueryKeys.POST, data.data.id],
                () => data,
            );

            queryClient.setQueriesData<InfiniteData<Response<Post[]>>>(
                { queryKey: [QueryKeys.POSTS] },
                (oldData) => {
                    if (!oldData) return oldData;

                    const newPages = oldData.pages.map((page) => {
                        const newPosts = page.data.map((post) => {
                            if (post.id !== data.data.id) return post;

                            return data.data;
                        });

                        return {
                            ...page,
                            data: newPosts,
                        };
                    });

                    return {
                        ...oldData,
                        pages: newPages,
                    };
                },
            );

            toast.success(
                <Toast
                    title="Post Edited"
                    message="Post edited successfully"
                />,
            );
        },
        onError: (error) => {
            const errorCode =
                error.errors?.[0]?.code ?? ErrorCodes.INTERNAL_SERVER_ERROR;

            toast.error(
                <Toast
                    title="Could not edit post"
                    message={getErrorText(errorCode)}
                />,
            );
        },
    });
};
