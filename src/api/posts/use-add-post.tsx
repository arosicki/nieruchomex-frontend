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

interface Variables {
    image: File;
    description?: string;
}

export const useAddPost = () => {
    const queryClient = useQueryClient();

    return useMutation<Response<Post>, FetchError, Variables>({
        mutationFn: async ({ image, description }) => {
            const formData = new FormData();
<<<<<<< HEAD
            for (const image of images) {
                formData.append('images', image);
            }
            if (description)
                formData.append('description', JSON.stringify(description));
            if (address) formData.append('address', address);
            if (area) formData.append('area', area.toString());
            if (latitude) formData.append('latitude', latitude.toString());
            if (longitude) formData.append('longitude', longitude.toString());
            if (price) formData.append('price', price.toString());
            if (rooms) formData.append('rooms', rooms.toString());
            if (status) formData.append('status', status);
            if (title) formData.append('title', title);
            if (type) formData.append('type', type);
=======
            formData.append('image', image);
            if (description) formData.append('description', description);
>>>>>>> parent of c5f64a8 (Almost done)

            return callApi(Endpoints.POSTS, {
                method: 'POST',
                body: formData,
            });
        },
        onSuccess: (data) => {
            queryClient.setQueryData<Response<Post>>(
                [QueryKeys.POST, data.data.id],
                () => data,
            );

            queryClient.setQueriesData<InfiniteData<Response<Post[]>, number>>(
                { queryKey: [QueryKeys.POSTS, undefined] },
                (oldData) => {
                    if (!oldData) return oldData;

                    const newPages = oldData.pages.map((page, index) => {
                        if (index !== 0) return page;

                        const newPosts = [data.data, ...page.data];

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

            queryClient.setQueriesData<InfiniteData<Response<Post[]>, number>>(
                { queryKey: [QueryKeys.POSTS, data.data.author.id] },
                (oldData) => {
                    if (!oldData) return oldData;

                    const newPages = oldData.pages.map((page, index) => {
                        if (index !== 0) return page;

                        const newPosts = [data.data, ...page.data];

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
                <Toast title="Post Added" message="Post added successfully" />,
            );
        },
        onError: (error) => {
            const errorCode =
                error.errors[0]?.code ?? ErrorCodes.INTERNAL_SERVER_ERROR;

            toast.error(
                <Toast
                    title="Could not add post"
                    message={getErrorText(errorCode)}
                />,
            );
        },
    });
};
