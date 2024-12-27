import type { Post } from '@/api/models/post';
import type { PostFormFields } from './schema';
import { MAP_CENTER } from '@/config';

export const createDefaultValues = (post?: Post): PostFormFields => {
    if (!post)
        return {
            description: undefined,
            title: '',
            address: '',
            status: 'DRAFT',
            type: 'SALE',
            price: 0,
            area: 1,
            rooms: 1,
            removeImages: [],
            images: [],
            latitude: MAP_CENTER[0],
            longitude: MAP_CENTER[1],
        };

    const {
        description,
        title,
        address,
        status,
        type,
        price,
        area,
        rooms,
        latitude,
        longitude,
    } = post;

    let postDescription = undefined;

    if (description) {
        try {
            postDescription = JSON.parse(description);
        } catch (error) {
            console.error('Failed to parse post description', error);
        }
    }

    return {
        description: postDescription,
        title,
        address,
        status,
        type,
        price,
        area,
        rooms,
        removeImages: [],
        images: [],
        latitude,
        longitude,
    };
};
