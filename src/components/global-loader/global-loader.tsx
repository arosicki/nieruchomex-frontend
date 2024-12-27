import $ from './global-loader.module.scss';

export const GlobalLoader = () => {
    return (
        <div className={$.layout}>
            <img src="/logo.webp" alt="Loader" className={$.loader} />
        </div>
    );
};
