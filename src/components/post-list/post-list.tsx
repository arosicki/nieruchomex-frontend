import { Post } from '../../api/models/post';
import { PostListItem } from './item/post-list-item';

interface Props {
    posts: Post[];
    displayMode?: 'status' | 'favorite';
    displayFormat?: 'list' | 'grid';
    editButton?: boolean;
}

// const STRINGS = {
//     NO_POSTS_FOUND: 'No posts found',
//     SIGN_UP_TO_ADD_POST: 'Sign up and add a post',
//     ADD_YOUR_FIRST_POST: 'Add your first post',
//     USER_HASNT_ADDED_POSTS_YET: "User hasn't added any posts yet",
//     ADD_POST: 'Add Post',
// };

// const CallToAction = ({
//     user,
//     isOtherUserWall = false,
// }: {
//     user: User | null;
//     isOtherUserWall: boolean;
// }) => {
//     if (isOtherUserWall)
//         return (
//             <p className={$.emptyDescription}>
//                 {STRINGS.USER_HASNT_ADDED_POSTS_YET}
//             </p>
//         );
//     if (!user)
//         return (
//             <Link to="/sign-up">
//                 <Button asChild>
//                     {STRINGS.SIGN_UP_TO_ADD_POST}
//                     <LogIn size={20} />
//                 </Button>
//             </Link>
//         );
//     return (
//         <AddPostModal
//             trigger={
//                 <Button asChild>
//                     {STRINGS.ADD_POST}
//                     <PlusIcon size={20} />
//                 </Button>
//             }
//         />
//     );
// };

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
