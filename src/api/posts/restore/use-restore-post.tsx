import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Response } from '../../models/response';
import { callApi } from '../../helpers/call-api';
import { Endpoints } from '../../helpers/endpoints';
import { QueryKeys } from '../../helpers/query-keys';
import { Post } from '../../models/post';
import { FetchError } from '../../helpers/fetch-error';
import { Favorite } from '../../models/favorite';
import { ErrorCodes } from '../../helpers/error-codes';
import { getErrorText } from '../../helpers/get-error-text';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

interface Params {
    id: number;
}

export const useRestorePost = ({ id }: Params) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { t } = useTranslation();

    return useMutation<Response<Favorite>, FetchError>({
        mutationFn: async () => {
            return callApi(Endpoints.RESTORE_POST, {
                method: 'POST',
                params: { id: `${id}` },
            });
        },
        onSuccess: () => {
            queryClient.setQueryData<Response<Post>>(
                [QueryKeys.POST, `${id}`],
                (oldData) => {
                    if (!oldData) return oldData;

                    return {
                        ...oldData,
                        data: {
                            ...oldData.data,
                            status: 'ARCHIVED',
                            deletedAt: null,
                        },
                    };
                },
            );

            queryClient.invalidateQueries({
                queryKey: [QueryKeys.POSTS],
            });

            // Add or remove post from favorites
            queryClient.invalidateQueries({ queryKey: [QueryKeys.FAVORITES] });

            toast({
                title: t('Post restored'),
                description: t('Post has been restored successfully'),
            });
        },
        onError: (error) => {
            const errorCode =
                error?.errors?.[0]?.code ?? ErrorCodes.INTERNAL_SERVER_ERROR;

            toast({
                title: t('Post restored'),
                description: getErrorText(errorCode),
                variant: 'destructive',
            });
        },
    });
};
