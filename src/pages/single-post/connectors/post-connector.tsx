import { usePost } from '../../../api/posts/use-post';
import { Post } from '../../../components/post/post';
import { getImageUrl } from '../../../utils/getImageUrl';

type Props = {
<<<<<<< HEAD
    id: string;
    isEditing?: boolean;
};

export const PostConnector = ({ id, isEditing }: Props) => {
=======
    id: number;
};

export const SinglePostConnector = ({ id }: Props) => {
>>>>>>> parent of 075a5bc (Add richtext editor)
    const { data } = usePost({
        id,
    });

<<<<<<< HEAD
    return <PostEditor post={data.data} disabled={!isEditing} />;
=======
    const { image, author, createdAt, description, isLiked } = data.data;

    return (
        <Post
            id={id}
            imageSrc={getImageUrl(image)}
            description={description}
            authorName={author.name}
            createdAt={createdAt}
            authorId={author.id}
            isLiked={isLiked}
        />
    );
>>>>>>> parent of 075a5bc (Add richtext editor)
};
