import { Link, useNavigate } from '@tanstack/react-router';
import $ from './post.module.scss';
import { Avatar } from '../avatar/avatar';
import { getInitials } from '../../utils/getInitials';
import { capitalize } from '../../utils/capitalize';
import { RelativeDate } from '../relative-date';
import { Button } from '../button/button';
import { Dropdown, DropdownItem } from '../dropdown/dropdown';
import { useMemo, useState } from 'react';
import { Heart, Pencil, Trash2, X } from 'lucide-react';
import { EditPostModal } from '../post-modal/edit-post-modal';
import { DeletePostModal } from '../post-modal/delete-post-modal';
import { useUserContext } from '../../context/user-context';
import { useSetLike } from '../../api/posts/favorite/use-set-favorite';

type Props = {
    id: number;
    imageSrc: string;
    description: string | null;
    isLiked: boolean | null;
    authorName: string;
    authorId: number;
    createdAt: string;
};

export const Post = ({
    id,
    imageSrc,
    description,
    authorName,
    createdAt,
    authorId,
    isLiked,
}: Props) => {
    const [isInfoLocked, setIsInfoLocked] = useState(false);
    const navigate = useNavigate();
    const user = useUserContext();
    const { mutateAsync: setLike, isPending: isPendingSetLike } = useSetLike({
        id,
    });

    const items = useMemo<DropdownItem[]>(() => {
        if (!user) return [];

        const defaultItems = [
            {
                id: 'like',
                text: isLiked ? 'Remove Like' : 'Like',
                icon: <Heart fill={isLiked ? 'white' : 'transparent'} />,
                onClick: () => setLike({ like: !isLiked }),
                disabled: isPendingSetLike,
            },
        ];

        if (user.id !== authorId) return defaultItems;

        return [
            ...defaultItems,
            {
                id: 'edit',
                text: 'Edit',
                icon: <Pencil />,
                render: (children) => (
                    <EditPostModal
                        key="edit"
                        trigger={children}
                        postId={id}
                        imageUrl={imageSrc}
                        initialDescription={description}
                    />
                ),
            },
            {
                id: 'delete',
                text: 'Delete',
                icon: <Trash2 />,
                render: (children) => (
                    <DeletePostModal
                        key="delete"
                        trigger={children}
                        postId={id}
                        afterDelete={() =>
                            navigate({
                                to: '/',
                            })
                        }
                    />
                ),
            },
        ];
    }, [
        user,
        isLiked,
        isPendingSetLike,
        authorId,
        setLike,
        id,
        imageSrc,
        navigate,
        description,
    ]);

    return (
        <main className={$.wrapper}>
            <Link to="/">
                <Button
                    variant="ghost"
                    className={$.closeButton}
                    iconOnly
                    asChild
                >
                    <X size={20} />
                </Button>
            </Link>

            {user && <Dropdown className={$.dropdown} items={items} />}
            <img src={imageSrc} alt="Post" className={$.image} />

            <aside
                className={$.info}
                onClick={() => setIsInfoLocked((prev) => !prev)}
                style={{
                    opacity: isInfoLocked ? 1 : undefined,
                    pointerEvents: isInfoLocked ? 'auto' : undefined,
                }}
            >
                <div className={$.header}>
                    <div className={$.user}>
                        <Link
                            to="/users/$userId"
                            params={{
                                userId: authorId.toString(),
                            }}
                            className={$.author}
                        >
                            <Avatar initials={getInitials(authorName)} />
                            {capitalize(authorName)}
                        </Link>
                    </div>
                    <RelativeDate className={$.createdDate} date={createdAt} />
                </div>
                <h2 className={$.description}>{description}</h2>
            </aside>
        </main>
    );
};
