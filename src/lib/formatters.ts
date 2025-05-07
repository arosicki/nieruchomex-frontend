import { PostType } from '@/api/models/post';
import { TFunction } from 'i18next';

export const formatPrice = (price: number, type: PostType, t: TFunction) => {
    const formattedPrice = price.toLocaleString('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        maximumFractionDigits: 0,
    });

    if (type === 'RENTAL') {
        return `${formattedPrice} ${t('per month')}`;
    }

    return formattedPrice;
};

export const formatPricePerMeter = (price: number, area: number) => {
    const pricePerMeter = price / area;

    return `${pricePerMeter.toLocaleString('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        maximumFractionDigits: 0,
    })}/m²`;
};
