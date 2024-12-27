import { Image } from '@/api/models/image';
import { MultiImageInput } from '@/components/multi-image-input/multi-image-input';
import { FormField, FormItem } from '@/components/ui/form';
import {
    Control,
    FieldValues,
    Path,
    PathValue,
    UseFormSetValue,
    useWatch,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
    control: Control<T>;
    images: Image[];
    setValue: UseFormSetValue<T>;
}

export const ImageInput = <T extends FieldValues>({
    control,
    images,
    setValue,
}: Props<T>) => {
    const removeImages = useWatch({
        control,
        name: 'removeImages' as Path<T>,
        defaultValue: [] as PathValue<T, Path<T>>,
    });

    return (
        <FormField
            control={control}
            name={'images' as Path<T>}
            render={({ field }) => {
                const setImages = (options: {
                    add?: File[];
                    remove?: (number | string)[];
                }) => {
                    const addedImages = options.add ?? [];
                    const removedImages = options.remove ?? [];
                    const [removedIds, removedFilenames] = removedImages.reduce(
                        ([ids, filenames], image) => {
                            if (typeof image === 'number') {
                                return [[...ids, image], filenames];
                            }

                            return [ids, [...filenames, image.toString()]];
                        },
                        [[], []] as [number[], string[]],
                    );

                    field.onChange([
                        ...field.value.filter(
                            (file: File) =>
                                !removedFilenames.includes(file.name),
                        ),
                        ...addedImages,
                    ]);

                    setValue(
                        'removeImages' as Path<T>,
                        [...removeImages, ...removedIds] as PathValue<
                            T,
                            Path<T>
                        >,
                    );
                };

                return (
                    <FormItem>
                        <MultiImageInput
                            name={field.name}
                            initialImages={images.filter(
                                (image) => !removeImages.includes(image.id),
                            )}
                            addedImages={field.value as File[]}
                            setImages={setImages}
                        />
                    </FormItem>
                );
            }}
        />
    );
};
