import $ from './textarea.module.scss';
import { cn } from '../../utils/join-class-names';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type Props<T extends FieldValues> = {
    id: Path<T>;
    label: string;
    placeholder?: string;
    error?: string;
    register: UseFormRegister<T>;
    required?: boolean;
};

export const Textarea = <T extends FieldValues>({
    label,
    placeholder,
    id,
    error,
    register,
    required,
}: Props<T>) => {
    return (
        <fieldset className={$.wrapper}>
            <label className={cn($.label, error && $.labelError)} htmlFor={id}>
                {label}
            </label>
            <div className={$.textareaWrapper}>
                <textarea
                    className={cn($.textarea, error && $.textareaError)}
                    placeholder={placeholder}
                    id={id}
                    {...register(id, { required })}
                />
                {error && <p className={$.error}>{error}</p>}
            </div>
        </fieldset>
    );
};
