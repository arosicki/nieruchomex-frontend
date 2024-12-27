import { PostEditor } from '@/components/post-editor/post-editor';
import { usePost } from '../../../api/posts/use-post';

type Props = {
    id: string;
    isEditing?: boolean;
};

export const PostConnector = ({ id, isEditing }: Props) => {
    const { data } = usePost({
        id,
    });

    return <PostEditor post={data.data} disabled={!isEditing} />;
};
