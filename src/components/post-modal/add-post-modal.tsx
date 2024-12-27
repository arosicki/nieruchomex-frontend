import { useForm, useWatch } from 'react-hook-form';
import { Modal } from '../modal/modal';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../button/button';
import $ from './post-modal.module.scss';
import { ImageInput } from '../image-input/image-input';
import { Textarea } from '../textarea/textarea';
import { MAX_FILE_SIZE } from '../../config';
import { useAddPost } from '../../api/posts/use-add-post';
import { useCallback, useEffect, useState } from 'react';

interface Props {
    trigger: React.ReactElement;
}

const STRINGS = {
    ADD_POST: 'Add Post',
    IMAGE: 'Image',
    DESCRIPTION: 'Description (optional)',
    DROP_IMAGE: 'Choose file or drag it here',
    TYPE_DESCRIPTION: 'Type your description here...',
};

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/gif'];

const formSchema = z.object({
    image: z
        .any()
        .refine((file: File) => file?.size > 0, 'File is required')
        .refine((file) => file?.size < MAX_FILE_SIZE, 'Max size is 5MB.')
        .refine(
            (file) => acceptedFileTypes.includes(file?.type),
            'Only png, jpeg and gif formats are supported.',
        ),
    description: z.string().max(255).optional(),
});

type FormModel = z.infer<typeof formSchema>;

export const AddPostModal = ({ trigger }: Props) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync, isPending } = useAddPost();

    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
        setValue,
        trigger: revalidate,
        reset,
    } = useForm<FormModel>({
        resolver: zodResolver(formSchema),
    });

    const image = useWatch({ control, name: 'image' });

    useEffect(() => {
        if (!image) return;
        revalidate('image');
    }, [image, setValue, revalidate]);

    const onOpenChange = useCallback(
        (open: boolean) => {
            if (!open) reset();
            setOpen(open);
        },
        [reset],
    );

    const onSubmit = async ({ image, description }: FormModel) => {
        await mutateAsync({ image, description });
        onOpenChange(false);
    };

    return (
        <Modal
            trigger={trigger}
            title={STRINGS.ADD_POST}
            open={open}
            onOpenChange={onOpenChange}
        >
            <form onSubmit={handleSubmit(onSubmit)} className={$.form}>
                <ImageInput
                    id="image"
                    label={STRINGS.IMAGE}
                    placeholder={STRINGS.DROP_IMAGE}
                    file={image}
                    setFile={(file) => setValue('image', file)}
                    error={errors.image?.message?.toString()}
                />
                <Textarea
                    register={register}
                    id="description"
                    label={STRINGS.DESCRIPTION}
                    placeholder={STRINGS.TYPE_DESCRIPTION}
                    error={errors.description?.message}
                />
                <div className={$.buttonContainer}>
                    <Button
                        isLoading={isPending}
                        variant="primary"
                        type="submit"
                    >
                        {STRINGS.ADD_POST}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
