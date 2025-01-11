import { PostEditor } from '@/components/post-editor/post-editor';
import { usePost } from '../../../api/posts/use-post';
import { useUserContext } from '@/context/user-context';

type Props = {
    id: string;
    isEditing?: boolean;
};

export const PostConnector = ({ id, isEditing }: Props) => {
    const { data } = usePost({
        id,
    });

    const user = useUserContext();

    if (user?.id !== data.data.author.id && isEditing) {
        throw new Response('You do not have permission to view this page.', {
            status: 403,
            statusText: 'You do not have permission to view this page.',
        });
    }

    return <PostEditor post={data.data} disabled={!isEditing} />;
};
