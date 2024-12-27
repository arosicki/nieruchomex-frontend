import { Post } from '../../api/models/post';
import { PostListItem } from './item/post-list-item';

interface Props {
    posts: Post[];
    displayMode?: 'status' | 'favorite';
    displayFormat?: 'list' | 'grid';
    editButton?: boolean;
}

export const PostList = ({
    posts,
    displayMode = 'favorite',
    displayFormat = 'list',
    editButton = false,
}: Props) => {
    return (
        <ul className="flex flex-col gap-6 w-full h-full pt-6">
            {posts.map((post) => (
                <PostListItem
                    key={post.id}
                    {...post}
                    displayMode={displayMode}
                    displayFormat={displayFormat}
                    editButton={editButton}
                />
            ))}
            <div className="w-full pb-1" />
        </ul>
    );
};
