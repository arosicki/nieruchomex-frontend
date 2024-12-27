import { useForm } from 'react-hook-form';
import { Modal } from '../modal/modal';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../button/button';
import $ from './post-modal.module.scss';
import { Textarea } from '../textarea/textarea';
import { useCallback, useState } from 'react';
import { useEditPost } from '../../api/posts/use-edit-post';
import { ImagePreview } from './image-preview/image-preview';

interface Props {
    trigger: React.ReactElement;
    postId: number;
    imageUrl: string;
    initialDescription: string | null;
}

const STRINGS = {
    EDIT_POST: 'Edit Post',
    YOU_MAY_ONLY_EDIT_DESC: 'You may only edit image description',
    IMAGE: 'Image',
    DESCRIPTION: 'Description (optional)',
    TYPE_DESCRIPTION: 'Type your description here...',
};

const formSchema = z.object({
    description: z.string().max(255).optional(),
});

type FormModel = z.infer<typeof formSchema>;

export const EditPostModal = ({
    trigger,
    imageUrl,
    postId,
    initialDescription,
}: Props) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync, isPending } = useEditPost({ id: postId });

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<FormModel>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialDescription ?? undefined,
        },
    });

    const onOpenChange = useCallback(
        (open: boolean) => {
            if (!open) reset();
            setOpen(open);
        },
        [reset],
    );

    const onSubmit = async ({ description }: FormModel) => {
        await mutateAsync({ description });
        onOpenChange(false);
    };

    return (
        <Modal
            trigger={trigger}
            title={STRINGS.EDIT_POST}
            open={open}
            onOpenChange={onOpenChange}
        >
            <p className={$.disclaimer}>{STRINGS.YOU_MAY_ONLY_EDIT_DESC}</p>
            <form onSubmit={handleSubmit(onSubmit)} className={$.form}>
                <ImagePreview label={STRINGS.IMAGE} imageUrl={imageUrl} />
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
                        {STRINGS.EDIT_POST}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
