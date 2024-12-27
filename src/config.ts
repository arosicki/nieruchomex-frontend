export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
export const DEFAULT_LIMIT = +(import.meta.env.VITE_DEFAULT_LIMIT ?? 16);
export const TOKEN_EXPIRATION_TIME =
    +(import.meta.env.VITE_TOKEN_EXPIRATION_DAYS ?? 30) * 1000 * 60 * 60 * 24;
export const TOKEN_REFRESH_THRESHOLD =
    +(import.meta.env.VITE_TOKEN_REFRESH_THRESHOLD_DAYS ?? 7) *
    1000 *
    60 *
    60 *
    24;

export const MAX_FILE_SIZE =
    +(import.meta.env.VITE_MAX_FILE_SIZE_MB ?? 5) * 1024 * 1024;

export const MAP_URL =
    import.meta.env.VITE_MAP_URL ??
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const SATELLITE_MAP_URL =
    import.meta.env.VITE_SATELLITE_MAP_URL ??
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
export const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const MAPBOX_BASE_URL =
    import.meta.env.VITE_MAPBOX_BASE_URL ?? 'https://api.mapbox.com';

export const MAPBOX_SESSION_ID =
    import.meta.env.VITE_MAPBOX_SESSION_ID ??
    '7b54317a-1a02-4567-93c0-c2b0be0d2a75';

export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};
