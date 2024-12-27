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
                title: 'User created',
                description: 'The user has been created successfully',
            });
        },
        onError: (error) => {
            const errorCode =
                error.errors?.[0]?.code ?? ErrorCodes.INTERNAL_SERVER_ERROR;

            toast({
                title: 'Could not create user',
                description: getErrorText(errorCode),
                variant: 'destructive',
            });
        },
    });
};
