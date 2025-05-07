import { t } from 'i18next';
import { z } from 'zod';

export const postFormSchema = z.object({
    description: z.any(),
    title: z
        .string({
            required_error: t('Title is required.'),
        })
        .max(255, {
            message: t('Title can be at most 255 characters long.'),
        }),
    address: z.string().max(255, {
        message: 'Address can be at most 255 characters long.',
    }),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'], {
        invalid_type_error: t(
            `Status must be one of "DRAFT", "PUBLISHED", or "ARCHIVED".`,
        ),
    }),
    type: z.enum(['SALE', 'RENTAL'], {
        invalid_type_error: t(`Type must be one of "RENTAL", or "SALE".`),
        required_error: t('Type is required.'),
    }),
    price: z
        .number({
            coerce: true,
            invalid_type_error: t('Price must be a number.'),
            required_error: t('Price is required.'),
        })
        .int(t('Price must be a positive integer.'))
        .positive(t('Price must be a positive integer.')),
    area: z
        .number({
            coerce: true,
            invalid_type_error: t('Area must be a number.'),
            required_error: t('Area is required.'),
        })
        .positive(t('Area must be a positive number.')),
    rooms: z
        .number({
            coerce: true,
            invalid_type_error: t('Rooms must be a number.'),
            required_error: t('Rooms is required.'),
        })
        .int(t('Rooms must be a positive integer.'))
        .positive(t('Rooms must be a positive integer.')),
    removeImages: z.array(z.number()),
    images: z.array(z.any()),
    latitude: z.number(),
    longitude: z.number(),
});

export type PostFormFields = z.infer<typeof postFormSchema>;
