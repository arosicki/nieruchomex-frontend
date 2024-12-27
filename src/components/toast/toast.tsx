import $ from './toast.module.scss';

interface Props {
    title: string;
    message: string;
}

export const Toast = ({ title, message }: Props) => {
    return (
        <div className={$.container}>
            <h3 className={$.title}>{title}</h3>
            <div className={$.message}>{message}</div>
        </div>
    );
};
