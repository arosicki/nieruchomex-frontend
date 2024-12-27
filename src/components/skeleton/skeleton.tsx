import $ from './skeleton.module.scss';
import { cn } from '../../utils/join-class-names';

interface Props {
    width?: string;
    height?: string;
    className?: string;
}

export const Skeleton = ({
    width = '100%',
    height = '2.5rem',
    className,
}: Props) => {
    return (
        <div
            className={cn($.skeleton, className)}
            style={{
                width,
                height,
            }}
        />
    );
};
