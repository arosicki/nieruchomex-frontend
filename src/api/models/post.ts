import { Image } from './image';
import { User } from './user';

export interface Post {
    id: number;
    images: Image[];
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    favorites: number;
    isFavorite: boolean | null;
    latitude: number;
    longitude: number;
    address: string;
    area: number;
    price: number;
    rooms: number;
    status: string;
    type: 'RENTAL' | 'SALE';
}
