import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../helpers/endpoints';
import { callApi } from '../helpers/call-api';
import { Post, PostStatus, PostType } from '../models/post';
import { QueryKeys } from '../helpers/query-keys';
import { getErrorText } from '../helpers/get-error-text';
import { ErrorCodes } from '../helpers/error-codes';
import { FetchError } from '../helpers/fetch-error';
import { useToast } from '@/hooks/use-toast';

interface Params {
    id: number;
}

interface Variables {
    images: File[];
    title?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    description?: Record<string, any>;
    latitude?: number;
    longitude?: number;
    address?: string;
    area?: number;
    price?: number;
    rooms?: number;
    status?: PostStatus;
    type?: PostType;
    removeImages?: number[];
}

export const useEditPost = ({ id }: Params) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation<Response<Post>, FetchError, Variables>({
        mutationFn: async ({
            images,
            description,
            address,
            area,
            latitude,
            longitude,
            price,
            rooms,
            status,
            title,
            type,
            removeImages,
        }) => {
            const formData = new FormData();
            for (const image of images) {
                formData.append('images', image);
            }
            if (description)
                formData.append('description', JSON.stringify(description));
            if (address) formData.append('address', address);
            if (area) formData.append('area', area.toString());
            if (price) formData.append('price', price.toString());
            if (rooms) formData.append('rooms', rooms.toString());
            if (status) formData.append('status', status);
            if (title) formData.append('title', title);
            if (type) formData.append('type', type);
            if (removeImages)
                formData.append('removeImages', removeImages.join(','));
            if (latitude) formData.append('latitude', latitude.toString());
            if (longitude) formData.append('longitude', longitude.toString());

            return callApi(Endpoints.POST, {
                method: 'PATCH',
                body: formData,
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

            queryClient.invalidateQueries({
                queryKey: [QueryKeys.POSTS],
            });

            queryClient.invalidateQueries({
                queryKey: [QueryKeys.FAVORITES],
            });

            toast({
                title: 'Post Edited',
                description: 'Post edited successfully',
            });
        },
        onError: (error) => {
            const errorCode =
                error.errors?.[0]?.code ?? ErrorCodes.INTERNAL_SERVER_ERROR;

            toast({
                title: 'Could not edit post',
                description: getErrorText(errorCode),
                variant: 'destructive',
            });
        },
    });
};
