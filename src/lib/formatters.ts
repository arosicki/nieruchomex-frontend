import { STRINGS } from '@/strings';

export const formatPrice = (price: number, type: 'RENTAL' | 'SALE') => {
    const formattedPrice = price.toLocaleString('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        maximumFractionDigits: 0,
    });

    if (type === 'RENTAL') {
        return `${formattedPrice} ${STRINGS.PER_MONTH}`;
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
