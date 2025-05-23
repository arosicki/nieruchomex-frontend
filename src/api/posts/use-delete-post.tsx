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
import { ErrorCodes } from '../helpers/error-codes';
import { FetchError } from '../helpers/fetch-error';
import { useToast } from '@/hooks/use-toast';
import { getErrorText } from '../helpers/get-error-text';
import { useTranslation } from 'react-i18next';

interface Params {
    id: number;
}

export const useDeletePost = ({ id }: Params) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { t } = useTranslation();

    return useMutation<Response<Post>, FetchError>({
        mutationFn: async () => {
            return callApi(Endpoints.POST, {
                method: 'DELETE',
                params: {
                    id: id.toString(),
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.POST, `${id}`],
            });

            queryClient.setQueriesData<InfiniteData<Response<Post[]>, number>>(
                { queryKey: [QueryKeys.POSTS] },
                (oldData) => {
                    if (!oldData) return oldData;

                    const newPages = oldData.pages.map((page) => {
                        const newPosts = page.data.filter(
                            (post) => post.id !== id,
                        );

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

            toast({
                title: t('Post deleted'),
                description: t('Post has been deleted successfully'),
            });
        },
        onError: (error) => {
            const errorCode =
                error.errors[0]?.code ?? ErrorCodes.INTERNAL_SERVER_ERROR;

            toast({
                title: t('Could not delete post'),
                description: getErrorText(errorCode),
                variant: 'destructive',
            });
        },
    });
};
