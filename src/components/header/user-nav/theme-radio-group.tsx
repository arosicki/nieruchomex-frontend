'use client';

import { useTheme } from '@/components/theme-provider';
import {
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '../../ui/dropdown-menu';
import { useTranslation } from 'react-i18next';

export const ThemeRadioGroup = () => {
    const { t } = useTranslation();
    const { setTheme, theme } = useTheme();

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>{t('Theme')}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                        value={theme}
                        onValueChange={setTheme as (value: string) => void}
                    >
                        <DropdownMenuRadioItem value="light">
                            {t('Light')}
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="dark">
                            {t('Dark')}
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="system">
                            {t('System')}
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
};
