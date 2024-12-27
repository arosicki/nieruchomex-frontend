import { ChangeEvent, useRef } from 'react';
import { cn } from '../../utils/join-class-names';
import $ from './image-input.module.scss';
import { toast } from 'react-toastify';
import { Toast } from '../toast/toast';
import { FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues> {
    label: string;
    error?: string;
    id: Path<T>;
    placeholder: string;
    file: File;
    setFile: (file: File) => void;
}

const STRINGS = {
    UPLOADED_FILE: 'Uploaded File',
    TOAST_TITLE: 'Cannot select this file',
    TOAST_MESSAGE: 'Only png, jpeg and gif formats are supported.',
};

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/gif'];

// TODO: Accessibility
export const ImageInput = <T extends FieldValues>({
    label,
    error,
    id,
    placeholder,
    file,
    setFile,
}: Props<T>) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;

        const file = e.target.files[0];

        if (!acceptedFileTypes.includes(file.type)) {
            e.target.files = null;
            toast.error(
                <Toast
                    message={STRINGS.TOAST_MESSAGE}
                    title={STRINGS.TOAST_TITLE}
                />,
            );
            return;
        }

        setFile(file);
    };

    const handleImageUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];

            if (!acceptedFileTypes.includes(file.type)) {
                toast.error(
                    <Toast
                        message={STRINGS.TOAST_MESSAGE}
                        title={STRINGS.TOAST_TITLE}
                    />,
                );
                return;
            }

            setFile(file);
        }
    };

    return (
        <fieldset className={$.wrapper}>
            <label className={cn($.label, error && $.labelError)} htmlFor={id}>
                {label}
            </label>

            <div
                className={cn($.dropZone, error && $.dropZoneError)}
                onDragOver={handleDragOver}
                onDrop={handleFileDrop}
                onClick={handleImageUploadClick}
            >
                {file ? (
                    <img
                        src={URL.createObjectURL(file)}
                        alt={STRINGS.UPLOADED_FILE}
                        className={$.uploadedImage}
                    />
                ) : (
                    <span>{placeholder}</span>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={acceptedFileTypes.join(',')}
                    style={{ display: 'none' }}
                    onChange={updateImage}
                />
            </div>
            {error && <p className={$.error}>{error}</p>}
        </fieldset>
    );
};
