import { forwardRef } from 'react';
import { cn } from '../../utils/join-class-names';
import $ from './button.module.scss';
import { Loader2 } from 'lucide-react';

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    asChild?: boolean;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    iconOnly?: boolean;
    isLoading?: boolean;
    ariaExpanded?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
    (
        {
            onClick,
            children,
            className,
            type = 'button',
            disabled,
            asChild,
            variant = 'primary',
            iconOnly,
            isLoading,
            ariaExpanded,
        },
        ref,
    ) => {
        const Comp = asChild ? 'span' : 'button';

        if (isLoading) {
            return (
                <Comp
                    ref={ref}
                    className={cn(
                        $.button,
                        $.disabled,
                        variant === 'primary' && $.primary,
                        variant === 'secondary' && $.secondary,
                        variant === 'danger' && $.danger,
                        variant === 'ghost' && $.ghost,
                        iconOnly && $.iconOnly,
                        className,
                    )}
                    type={type}
                    disabled
                    aria-expanded={ariaExpanded}
                >
                    <Loader2 size={16} className={$.loader} />
                    {children}
                </Comp>
            );
        }

        return (
            <Comp
                ref={ref}
                onClick={!disabled ? onClick : undefined}
                disabled={disabled}
                aria-expanded={ariaExpanded}
                className={cn(
                    $.button,
                    variant === 'primary' && $.primary,
                    variant === 'secondary' && $.secondary,
                    variant === 'danger' && $.danger,
                    variant === 'ghost' && $.ghost,
                    iconOnly && $.iconOnly,
                    disabled && $.disabled,
                    className,
                )}
                type={type}
            >
                {children}
            </Comp>
        );
    },
);

Button.displayName = 'Button';

export { Button };
