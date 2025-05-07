import { useMutation } from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../helpers/endpoints';
import { callApi } from '../helpers/call-api';
import { User } from '../models/user';
import { FetchError } from '../helpers/fetch-error';

export interface SignUpVariables {
    name: string;
    password: string;
    email: string;
    phone: string;
}

export const useSignUp = () => {
    return useMutation<Response<User>, FetchError, SignUpVariables>({
        mutationFn: async ({ name, password, email, phone }) => {
            return callApi(Endpoints.REGISTER, {
                method: 'POST',
                body: {
                    name,
                    password,
                    email,
                    phone,
                },
            });
        },
    });
};
