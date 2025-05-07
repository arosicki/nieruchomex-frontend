import { RelativeDate } from '@/components/relative-date';
import { FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NumberInput } from '@/components/ui/number-input';
import {
    BoxIcon,
    CirclePlusIcon,
    LandPlotIcon,
    MapPinIcon,
    SquarePenIcon,
} from 'lucide-react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface ViewProps {
    address: string;
    area: number;
    rooms: number;
    createdAt: string;
    updatedAt: string;
    isEditing: false;
}

interface EditProps {
    address?: string;
    area?: number;
    rooms?: number;
    createdAt?: string;
    updatedAt?: string;
    isEditing: true;
}

type Props<T extends FieldValues> = (ViewProps | EditProps) & {
    control: Control<T>;
};

export const Details = <T extends FieldValues>({
    address,
    area,
    rooms,
    createdAt,
    updatedAt,
    isEditing,
    control,
}: Props<T>) => {
    const { t } = useTranslation();
    return (
        <dl className="border rounded-xl grid grid-cols-2 p-4 gap-1">
            <dt className="flex gap-2 text-md font-medium items-center">
                <MapPinIcon size={20} />
                {t('Address')}
            </dt>
            <dd>
                {isEditing ? (
                    <FormField
                        control={control}
                        name={'address' as Path<T>}
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <Input
                                    placeholder={t('Address')}
                                    autoComplete="off"
                                    {...field}
                                />
                            </FormItem>
                        )}
                    />
                ) : (
                    address
                )}
            </dd>
            <dt className="flex gap-2 text-md font-medium items-center">
                <LandPlotIcon size={20} />
                {t('Area')}
            </dt>
            <dd>
                {isEditing ? (
                    <FormField
                        control={control}
                        name={'area' as Path<T>}
                        render={({ field: { onChange, ...field } }) => (
                            <FormItem className="flex-1">
                                <NumberInput
                                    min={1}
                                    unit={t('m²')}
                                    placeholder={t('Area')}
                                    stepper={1}
                                    autoComplete="off"
                                    onValueChange={onChange}
                                    {...field}
                                />
                            </FormItem>
                        )}
                    />
                ) : (
                    <>
                        {area} {t('m²')}
                    </>
                )}
            </dd>
            <dt className="flex gap-2 font-medium text-md items-center">
                <BoxIcon size={20} />
                {t('Rooms')}
            </dt>
            <dd>
                {isEditing ? (
                    <FormField
                        control={control}
                        name={'rooms' as Path<T>}
                        render={({ field: { onChange, ...field } }) => (
                            <FormItem className="flex-1">
                                <NumberInput
                                    min={1}
                                    placeholder={t('Rooms')}
                                    stepper={1}
                                    autoComplete="off"
                                    onValueChange={onChange}
                                    {...field}
                                />
                            </FormItem>
                        )}
                    />
                ) : (
                    rooms
                )}
            </dd>
            {!isEditing && (
                <>
                    <dt className="flex gap-2 font-medium text-md items-center">
                        <CirclePlusIcon size={20} />
                        {t('Created at')}
                    </dt>
                    <dd>
                        <RelativeDate date={createdAt} />
                    </dd>
                    <dt className="flex gap-2 font-medium text-md items-center">
                        <SquarePenIcon size={20} />
                        {t('Updated at')}
                    </dt>
                    <dd>
                        <RelativeDate date={updatedAt} />
                    </dd>
                </>
            )}
        </dl>
    );
};
