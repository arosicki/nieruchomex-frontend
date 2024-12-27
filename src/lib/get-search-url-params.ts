import { PostSearchFormModel } from '@/components/filter-panel';

const ALLOWED_TYPE_OPTIONS = ['SALE', 'RENTAL'];

export const getFiltersSearchParams = (
    searchParams: Record<string, unknown>,
): PostSearchFormModel & {
    distance?: number;
    mapboxId?: string;
    page?: number;
} => {
    const {
        type,
        minArea,
        maxArea,
        minPrice,
        maxPrice,
        search,
        distance,
        mapboxId,
        page,
    } = searchParams;

    const newType = ALLOWED_TYPE_OPTIONS.includes(type as string)
        ? (type as 'SALE' | 'RENTAL' | 'ANY')
        : 'ANY';

    const newMinArea =
        !isNaN(Number(minArea)) && Number(minArea) >= 0
            ? Number(minArea)
            : undefined;
    const newMaxArea =
        !isNaN(Number(maxArea)) && Number(maxArea) >= 0
            ? Number(maxArea)
            : undefined;
    const newMinPrice =
        !isNaN(Number(minPrice)) && Number(minPrice) >= 0
            ? Number(minPrice)
            : undefined;
    const newMaxPrice =
        !isNaN(Number(maxPrice)) && Number(maxPrice) >= 0
            ? Number(maxPrice)
            : undefined;
    const newDistance = mapboxId ? Number(distance || 1) : undefined;

    const newPage =
        !isNaN(Number(page)) && Number(page) >= 0 ? Number(page) : undefined;

    const shouldAddMaxPrice =
        newMinPrice !== undefined &&
        newMaxPrice !== undefined &&
        newMinPrice <= newMaxPrice;

    const shouldAddMaxArea =
        newMinArea !== undefined &&
        newMaxArea !== undefined &&
        newMinArea <= newMaxArea;

    return {
        type: newType,
        minArea: newMinArea,
        maxArea: shouldAddMaxArea ? newMaxArea : undefined,
        minPrice: newMinPrice,
        maxPrice: shouldAddMaxPrice ? newMaxPrice : undefined,
        search: (search as string) || undefined,
        distance: newDistance,
        mapboxId: (mapboxId as string) || undefined,
        page: newPage,
    };
};
