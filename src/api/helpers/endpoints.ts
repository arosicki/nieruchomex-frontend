export const Endpoints = {
    POSTS: '/posts',
    POST: '/posts/[id]',

    USERS: '/users',
    USER: '/users/[id]',

    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    EXTEND_SESSION: '/auth/extend-session',

    WHO_AM_I: '/who-am-i',

    SET_FAVORITE: '/posts/[id]/set-favorite',
    RESTORE_POST: '/posts/[id]/restore',
} as const;

export const MapboxEndpoints = {
    SUGGEST: '/search/searchbox/v1/suggest',
    RETRIEVE: '/search/searchbox/v1/retrieve/[id]',
} as const;

export type Endpoint =
    | (typeof Endpoints)[keyof typeof Endpoints]
    | (typeof MapboxEndpoints)[keyof typeof MapboxEndpoints];
