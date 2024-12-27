import $ from './text-input.module.scss';
import { cn } from '../../utils/join-class-names';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type Props<T extends FieldValues> = {
    id: Path<T>;
    label: string;
    placeholder?: string;
    type?: 'text' | 'password';
    error?: string;
    register: UseFormRegister<T>;
    required?: boolean;
};

export const TextInput = <T extends FieldValues>({
    label,
    placeholder,
    type = 'text',
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
            <div className={$.inputWrapper}>
                <input
                    className={cn($.input, error && $.inputError)}
                    type={type}
                    placeholder={placeholder}
                    id={id}
                    {...register(id, { required })}
                />
                {error && <p className={$.error}>{error}</p>}
            </div>
        </fieldset>
    );
};
