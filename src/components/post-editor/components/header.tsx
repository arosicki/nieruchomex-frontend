import { PostType } from '@/api/models/post';
import { FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NumberInput } from '@/components/ui/number-input';
import { formatPrice, formatPricePerMeter } from '@/lib/formatters';
import { Control, FieldValues, Path, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface DisplayProps {
    isEditing: false;
    price: number;
    type: PostType;
    area: number;
    title: string;
}

interface EditingProps {
    isEditing: true;
    price?: number;
    type?: PostType;
    area?: number;
    title?: string;
}

type Props<T extends FieldValues> = (DisplayProps | EditingProps) & {
    control: Control<T>;
};

export const Header = <T extends FieldValues>({
    price,
    type,
    area,
    title,
    isEditing,
    control,
}: Props<T>) => {
    const { t } = useTranslation();

    const formPrice = useWatch({
        control,
        name: 'price' as Path<T>,
    });

    const formArea = useWatch({
        control,
        name: 'area' as Path<T>,
    });

    const formType = useWatch({
        control,
        name: 'type' as Path<T>,
    });

    const hasBothValues = formPrice && formArea;

    const currentPrice = isEditing ? (hasBothValues ? formPrice : 0) : price;
    const currentArea = isEditing ? (hasBothValues ? formArea : 1) : area;

    const priceStepper = formType === 'RENTAL' ? 250 : 10000;
    const priceUnit = formType === 'RENTAL' ? t('PLN per month') : t('PLN');

    return (
        <div className="py-2 gap-2 flex flex-col">
            <div className="flex justify-between items-center gap-4">
                {isEditing ? (
                    <FormField
                        control={control}
                        name={'price' as Path<T>}
                        render={({ field: { onChange, ...field } }) => (
                            <FormItem className="flex-1">
                                <NumberInput
                                    min={0}
                                    unit={priceUnit}
                                    placeholder={t('Price')}
                                    stepper={priceStepper}
                                    autoComplete="off"
                                    onValueChange={onChange}
                                    {...field}
                                />
                            </FormItem>
                        )}
                    />
                ) : (
                    <h1 className="text-2xl font-bold">
                        {formatPrice(price, type, t)}
                    </h1>
                )}
                <p className="text-md min-w-24 text-right">
                    {formatPricePerMeter(currentPrice, currentArea)}
                </p>
            </div>
            {isEditing ? (
                <FormField
                    control={control}
                    name={'title' as Path<T>}
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <Input
                                placeholder={t('Title')}
                                autoComplete="off"
                                {...field}
                            />
                        </FormItem>
                    )}
                />
            ) : (
                <p className="text-md">{title}</p>
            )}
        </div>
    );
};
