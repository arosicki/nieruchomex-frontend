import { ChangeEvent, useRef } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Image } from '@/api/models/image';
import { getImageUrl } from '@/utils/getImageUrl';
import { InputImage } from './input-image';
import { PlusIcon } from 'lucide-react';
import { MAX_FILE_SIZE } from '@/config';

interface Props<T extends FieldValues> {
    name: Path<T>;
    initialImages: Image[]; // w/o removed images
    addedImages: File[];
    setImages: (options: {
        add?: File[];
        remove?: (number | string)[];
    }) => void;
}

const STRINGS = {
    TOAST_TITLE:
        'Some files were rejected due to their type, size or duplicate name.',
};

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/gif'];

export const MultiImageInput = <T extends FieldValues>({
    name,
    initialImages,
    addedImages,
    setImages,
}: Props<T>) => {
    const { toast } = useToast();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const rejectedFiles = [];
        const acceptedFiles = [];

        const existingFileNames = [
            ...initialImages.map((image) => image.name),
            ...addedImages.map((file) => file.name),
        ];

        for (const file of e.target.files) {
            if (
                !acceptedFileTypes.includes(file.type) ||
                existingFileNames.includes(file.name) ||
                file.size > MAX_FILE_SIZE
            ) {
                rejectedFiles.push(file);
                continue;
            }

            acceptedFiles.push(file);
        }

        if (rejectedFiles.length)
            toast({
                title: STRINGS.TOAST_TITLE,
                description: rejectedFiles.map((file) => file.name).join(', '),
                variant: 'destructive',
            });

        if (acceptedFiles.length) {
            setImages({
                add: acceptedFiles,
            });
        }

        e.target.value = '';
    };

    const handleImageUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!e.dataTransfer.files?.length) return;

        const rejectedFiles = [];
        const acceptedFiles = [];

        const existingFileNames = [
            ...initialImages.map((image) => image.name),
            ...addedImages.map((file) => file.name),
        ];

        for (const file of e.dataTransfer.files) {
            if (
                !acceptedFileTypes.includes(file.type) ||
                existingFileNames.includes(file.name) ||
                file.size > MAX_FILE_SIZE
            ) {
                rejectedFiles.push(file);
                continue;
            }

            acceptedFiles.push(file);
        }

        if (rejectedFiles.length)
            toast({
                title: STRINGS.TOAST_TITLE,
                description: rejectedFiles.map((file) => file.name).join(', '),
                variant: 'destructive',
            });

        if (acceptedFiles.length)
            setImages({
                add: acceptedFiles,
            });
    };

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] auto-cols-auto gap-4 justify-start py-4">
            {initialImages?.map((image) => (
                <InputImage
                    key={image.id}
                    url={getImageUrl(image.url)}
                    alt={image.name}
                    onDelete={() =>
                        setImages({
                            remove: [image.id],
                        })
                    }
                />
            ))}

            {addedImages?.map((file) => (
                <InputImage
                    key={file.name}
                    url={URL.createObjectURL(file)}
                    alt={file.name}
                    onDelete={() => setImages({ remove: [file.name] })}
                />
            ))}
            <div
                className="relative size-32 border-2 border-dashed rounded-lg border-foreground text-foreground cursor-pointer hover:border-foreground/80 hover:text-foreground/80"
                onDragOver={handleDragOver}
                onDrop={handleFileDrop}
                onClick={handleImageUploadClick}
            >
                <input
                    id={name}
                    name={name}
                    ref={fileInputRef}
                    type="file"
                    accept={acceptedFileTypes.join(',')}
                    className="hidden"
                    onChange={updateImage}
                    multiple
                />

                <span className="absolute inset-0 flex items-center justify-center">
                    <PlusIcon size={28} />
                </span>
            </div>
        </div>
    );
};
