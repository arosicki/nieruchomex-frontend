import { Modal } from '../modal/modal';
import { Button } from '../button/button';
import $ from './post-modal.module.scss';
import { useState } from 'react';
import { useDeletePost } from '../../api/posts/use-delete-post';

interface Props {
    trigger: React.ReactElement;
    postId: number;
    afterDelete?: () => Promise<void>;
}

const STRINGS = {
    DELETE_POST: 'Delete Post',
    CANCEL: 'Cancel',
    CONFIRM_DELETE_POST: 'Do you want to delete the post?',
    THIS_CANOT_BE_UNDONE:
        'This action cannot be undone. This will permanently remove data from our servers.',
};

export const DeletePostModal = ({ trigger, postId, afterDelete }: Props) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync, isPending } = useDeletePost({ id: postId });

    const onConfirm = async () => {
        await mutateAsync();
        afterDelete?.();
        setOpen(false);
    };

    return (
        <Modal
            trigger={trigger}
            title={STRINGS.CONFIRM_DELETE_POST}
            open={open}
            onOpenChange={setOpen}
        >
            <p className={$.disclaimer}>{STRINGS.THIS_CANOT_BE_UNDONE}</p>

            <div className={$.buttons}>
                <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setOpen(false)}
                >
                    {STRINGS.CANCEL}
                </Button>
                <Button
                    isLoading={isPending}
                    variant="danger"
                    type="button"
                    onClick={onConfirm}
                >
                    {STRINGS.DELETE_POST}
                </Button>
            </div>
        </Modal>
    );
};
