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

const STRINGS = {
    OF: 'of',
    PER_MONTH: 'per month',
    ADDRESS: 'Address',
    AREA: 'Area',
    ROOMS: 'Rooms',
    METERS_SQUARED: 'm²',
    CREATED_AT: 'Added',
    UPDATED_AT: 'Last update',
};

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
    return (
        <dl className="border rounded-xl grid grid-cols-2 p-4 gap-1">
            <dt className="flex gap-2 text-md font-medium items-center">
                <MapPinIcon size={20} />
                {STRINGS.ADDRESS}
            </dt>
            <dd>
                {isEditing ? (
                    <FormField
                        control={control}
                        name={'address' as Path<T>}
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <Input
                                    placeholder={STRINGS.ADDRESS}
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
                {STRINGS.AREA}
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
                                    unit={STRINGS.METERS_SQUARED}
                                    placeholder={STRINGS.AREA}
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
                        {area} {STRINGS.METERS_SQUARED}
                    </>
                )}
            </dd>
            <dt className="flex gap-2 font-medium text-md items-center">
                <BoxIcon size={20} />
                {STRINGS.ROOMS}
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
                                    placeholder={STRINGS.ROOMS}
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
                        {STRINGS.CREATED_AT}
                    </dt>
                    <dd>
                        <RelativeDate date={createdAt} />
                    </dd>
                    <dt className="flex gap-2 font-medium text-md items-center">
                        <SquarePenIcon size={20} />
                        {STRINGS.UPDATED_AT}
                    </dt>
                    <dd>
                        <RelativeDate date={updatedAt} />
                    </dd>
                </>
            )}
        </dl>
    );
};
