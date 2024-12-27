import $ from './image-preview.module.scss';

interface Props {
    label: string;
    imageUrl: string;
}

const STRINGS = {
    UPLOADED_FILE: 'Uploaded File',
};

export const ImagePreview = ({ label, imageUrl }: Props) => {
    return (
        <fieldset className={$.wrapper}>
            <label className={$.label}>{label}</label>

            <div className={$.imageWrapper}>
                <img
                    src={imageUrl}
                    alt={STRINGS.UPLOADED_FILE}
                    className={$.image}
                />
            </div>
        </fieldset>
    );
};
