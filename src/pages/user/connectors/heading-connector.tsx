import { useUser } from '../../../api/users/use-user';
import { Heading } from '../../../components/heading/heading';
import { useUserContext } from '../../../context/user-context';
import { capitalize } from '../../../utils/capitalize';

type Props = {
    userId: number;
};

const STRINGS = {
    MY_POSTS: 'My posts',
};

export const UserHeadingConnector = ({ userId }: Props) => {
    const { data } = useUser({
        userId,
    });

    const currentUser = useUserContext();

    const heading =
        currentUser?.id === userId
            ? STRINGS.MY_POSTS
            : `${capitalize(data.data.name)}'s posts`;

    return (
        <Heading
            heading={heading}
            isCreateButtonVisible={currentUser?.id === userId}
        />
    );
};
