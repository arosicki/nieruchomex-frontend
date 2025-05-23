import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../helpers/endpoints';
import { callApi } from '../helpers/call-api';
import { User } from '../models/user';
import { FetchError } from '../helpers/fetch-error';
import { QueryKeys } from '../helpers/query-keys';
import { ErrorCodes } from '../helpers/error-codes';
import { useToast } from '@/hooks/use-toast';
import { getErrorText } from '@/api/helpers/get-error-text';
import { useTranslation } from 'react-i18next';

interface Variables {
    username: string;
    password: string;
    email: string;
    phone: string;
    type: 'ADMIN' | 'USER';
}

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { t } = useTranslation();

    return useMutation<Response<User>, FetchError, Variables>({
        mutationFn: async ({ username, password, type, email, phone }) => {
            return callApi(Endpoints.USERS, {
                method: 'POST',
                body: {
                    name: username,
                    password,
                    type,
                    email,
                    phone,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.USERS],
            });

            toast({
                title: t('User created'),
                description: t('The user has been created successfully'),
            });
        },
        onError: (error) => {
            const errorCode =
                error.errors?.[0]?.code ?? ErrorCodes.INTERNAL_SERVER_ERROR;

            toast({
                title: t('Could not create user'),
                description: getErrorText(errorCode),
                variant: 'destructive',
            });
        },
    });
};
