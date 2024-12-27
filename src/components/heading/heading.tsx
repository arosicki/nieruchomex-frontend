import { Button } from '../button/button';
import $ from './heading.module.scss';
import { Plus } from 'lucide-react';
import { AddPostModal } from '../post-modal/add-post-modal';

type Props = {
    heading: string;
    isCreateButtonVisible?: boolean;
};

const STRINGS = {
    ADD_POST: 'Add Post',
};

export const Heading = ({ heading, isCreateButtonVisible }: Props) => (
    <>
        <div className={$.container}>
            <h1 className={$.heading}>{heading}</h1>
            {isCreateButtonVisible && (
                <AddPostModal
                    trigger={
                        <Button variant="primary">
                            {STRINGS.ADD_POST}
                            <Plus size={20} />
                        </Button>
                    }
                />
            )}
        </div>
    </>
);
