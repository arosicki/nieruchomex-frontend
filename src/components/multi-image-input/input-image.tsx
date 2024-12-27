import { Trash2Icon } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
    url: string;
    alt: string;
    onDelete: () => void;
}

export const InputImage = ({ url, alt, onDelete }: Props) => {
    return (
        <div className="relative size-32 group">
            <img
                className="w-full h-full object-cover rounded-lg"
                src={url}
                alt={alt}
            />
            <Button
                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10 shadow-sm rounded-full"
                size="icon-sm"
                type="button"
                variant="secondary"
                onClick={onDelete}
            >
                <Trash2Icon />
            </Button>
        </div>
    );
};
