import { usePost } from '../../../api/posts/use-post';
import { Post } from '../../../components/post/post';
import { getImageUrl } from '../../../utils/getImageUrl';

type Props = {
<<<<<<< HEAD
    id: string;
};

<<<<<<< HEAD
export const PostConnector = ({ id, isEditing }: Props) => {
=======
    id: number;
};

export const SinglePostConnector = ({ id }: Props) => {
>>>>>>> parent of 075a5bc (Add richtext editor)
=======
export const PostConnector = ({ id }: Props) => {
>>>>>>> parent of c5f64a8 (Almost done)
    const { data } = usePost({
        id,
    });

<<<<<<< HEAD
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
=======
    return <PostEditor post={data.data} disabled />;
>>>>>>> parent of c5f64a8 (Almost done)
};
