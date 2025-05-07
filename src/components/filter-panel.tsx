import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel } from './ui/form';
import { useForm } from 'react-hook-form';
import { NumberInput } from './ui/number-input';
import { Button } from './ui/button';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { t as globalT } from 'i18next';

const formSchema = z
    .object({
        type: z.enum(['ALL', 'SALE', 'RENTAL'], {
            message: globalT('Type is required.'),
        }),
        minArea: z
            .number({
                coerce: true,
            })
            .min(0, {
                message: globalT('Minimum area must be a positive number.'),
            })
            .optional(),
        maxArea: z
            .number({
                coerce: true,
            })
            .min(0, {
                message: globalT('Maximum area must be a positive number.'),
            })
            .optional(),

        minPrice: z
            .number({
                coerce: true,
            })
            .min(0, {
                message: globalT('Minimum price must be a positive number.'),
            })
            .optional(),
        maxPrice: z
            .number({
                coerce: true,
            })
            .min(0, {
                message: globalT('Maximum price must be a positive number.'),
            })
            .optional(),
        minRooms: z
            .number({
                coerce: true,
            })
            .min(0, {
                message: globalT('Minimum rooms must be a positive number.'),
            })
            .optional(),
        maxRooms: z
            .number({
                coerce: true,
            })
            .min(0, {
                message: globalT('Maximum rooms must be a positive number.'),
            })
            .optional(),
        search: z.string().optional(),
    })
    .refine(
        (data) =>
            !data.minArea || !data.maxArea || data.minArea <= data.maxArea,
        {
            message: globalT(
                'Minimum area must be less than or equal to maximum area.',
            ),
            path: ['minArea'],
        },
    )
    .refine(
        (data) =>
            !data.minPrice || !data.maxPrice || data.minPrice <= data.maxPrice,
        {
            message: globalT(
                'Minimum price must be less than or equal to maximum price.',
            ),
        },
    );

export type PostSearchFormModel = z.infer<typeof formSchema>;

interface Props {
    onSubmit: (data: PostSearchFormModel) => void;
    onClear: () => Promise<void>;
    defaultValues?: PostSearchFormModel;
    className?: string;
}

export const FilterPanel = ({
    onSubmit,
    onClear,
    defaultValues,
    className,
}: Props) => {
    const { t } = useTranslation();

    const form = useForm<PostSearchFormModel>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const type = form.watch('type');

    const priceStepper = type === 'RENTAL' ? 250 : 10000;

    useEffect(() => {
        form.resetField('minPrice');
        form.resetField('maxPrice');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    const onClearWrapper = async () => {
        await onClear?.();
        form.reset({
            type: 'ALL',
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(
                    'flex flex-col gap-4 px-2 bg-background',
                    className,
                )}
            >
                <div className="flex flex-col gap-4 items-center w-full sm:flex-row">
                    <div className="flex gap-2 flex-col w-full sm:w-auto">
                        <FormLabel>{t('Type')}</FormLabel>
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        autoComplete="off"
                                    >
                                        <SelectTrigger className="sm:w-[180px]">
                                            <SelectValue
                                                placeholder={t(
                                                    'Select post type',
                                                )}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="ALL">
                                                    {t('Any')}
                                                </SelectItem>
                                                <SelectItem value="SALE">
                                                    {t('Sale')}
                                                </SelectItem>
                                                <SelectItem value="RENTAL">
                                                    {t('Rental')}
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-2 flex-1 w-full sm:w-auto">
                        <FormLabel>{t('Price')}</FormLabel>
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="minPrice"
                                render={({ field: { onChange, ...field } }) => (
                                    <FormItem className="flex-1">
                                        <NumberInput
                                            min={0}
                                            unit={t('PLN')}
                                            placeholder={t('Min')}
                                            stepper={priceStepper}
                                            autoComplete="off"
                                            onValueChange={onChange}
                                            {...field}
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="maxPrice"
                                render={({ field: { onChange, ...field } }) => (
                                    <FormItem className="flex-1">
                                        <NumberInput
                                            min={0}
                                            unit={t('PLN')}
                                            stepper={priceStepper}
                                            placeholder={t('Max')}
                                            autoComplete="off"
                                            onValueChange={onChange}
                                            {...field}
                                        />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 flex-1 sm:flex-row">
                    <div className="flex flex-col gap-2 flex-1">
                        <FormLabel>{t('Area')}</FormLabel>
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="minArea"
                                render={({ field: { onChange, ...field } }) => (
                                    <FormItem className="flex-1">
                                        <NumberInput
                                            min={0}
                                            unit={t('m²')}
                                            placeholder={t('Min')}
                                            stepper={5}
                                            autoComplete="off"
                                            onValueChange={onChange}
                                            {...field}
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="maxArea"
                                render={({ field: { onChange, ...field } }) => (
                                    <FormItem className="flex-1">
                                        <NumberInput
                                            min={0}
                                            unit={t('m²')}
                                            placeholder={t('Max')}
                                            stepper={5}
                                            autoComplete="off"
                                            onValueChange={onChange}
                                            {...field}
                                        />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                        <FormLabel>{t('Rooms')}</FormLabel>
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="minRooms"
                                render={({ field: { onChange, ...field } }) => (
                                    <FormItem className="flex-1">
                                        <NumberInput
                                            min={0}
                                            placeholder={t('Min')}
                                            autoComplete="off"
                                            onValueChange={onChange}
                                            {...field}
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="maxRooms"
                                render={({ field: { onChange, ...field } }) => (
                                    <FormItem className="flex-1">
                                        <NumberInput
                                            min={0}
                                            placeholder={t('Max')}
                                            autoComplete="off"
                                            onValueChange={onChange}
                                            {...field}
                                        />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div className="ml-auto flex items-center gap-4">
                    <Button
                        type="button"
                        className="w-fit"
                        variant="secondary"
                        onClick={onClearWrapper}
                    >
                        {t('Clear')}
                    </Button>

                    <Button type="submit" className="w-fit">
                        <MagnifyingGlassIcon className="size-5" />
                        {t('Search')}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
