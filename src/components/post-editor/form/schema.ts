import { z } from 'zod';

export const postFormSchema = z.object({
    description: z.any(),
    title: z
        .string({
            required_error: 'Title is required.',
        })
        .max(255, {
            message: 'Title can be at most 255 characters long.',
        }),
    address: z.string().max(255, {
        message: 'Address can be at most 255 characters long.',
    }),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'], {
        invalid_type_error: `Status must be one of "DRAFT", "PUBLISHED", or "ARCHIVED".`,
    }),
    type: z.enum(['SALE', 'RENTAL'], {
        invalid_type_error: `Type must be one of "RENTAL", or "SALE".`,
        required_error: 'Type is required.',
    }),
    price: z
        .number({
            coerce: true,
            invalid_type_error: 'Price must be a number.',
            required_error: 'Price is required.',
        })
        .int('Price must be a positive integer.')
        .positive('Price must be a positive integer.'),
    area: z
        .number({
            coerce: true,
            invalid_type_error: 'Area must be a number.',
            required_error: 'Area is required.',
        })
        .positive('Area must be a positive number.'),
    rooms: z
        .number({
            coerce: true,
            invalid_type_error: 'Rooms must be a number.',
            required_error: 'Rooms is required.',
        })
        .int('Rooms must be a positive integer.')
        .positive('Rooms must be a positive integer.'),
    removeImages: z.array(z.number()),
    images: z.array(z.any()),
    latitude: z.number(),
    longitude: z.number(),
});

export type PostFormFields = z.infer<typeof postFormSchema>;
