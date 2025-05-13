import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from './theme-provider';
import { useTranslation } from 'react-i18next';

export const ThemeToggle = () => {
    const { t } = useTranslation();
    const { setTheme, theme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">{t('Toggle theme')}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={setTheme as (value: string) => void}
                >
                    <DropdownMenuRadioItem value="light" data-testid="light-theme">
                        {t('Light')}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark" data-testid="dark-theme">
                        {t('Dark')}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system" data-testid="system-theme">
                        {t('System')}
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
