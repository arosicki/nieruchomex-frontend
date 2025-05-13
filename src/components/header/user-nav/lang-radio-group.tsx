'use client';

import {
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '../../ui/dropdown-menu';
import { useTranslation } from 'react-i18next';

export const LangRadioGroup = () => {
    const { t, i18n } = useTranslation();

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>{t('Language')}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                        value={i18n.language}
                        onValueChange={i18n.changeLanguage}
                    >
                        <DropdownMenuRadioItem value="en" data-testid="lang-en">
                            {t('English')}
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="pl" data-testid="lang-pl">
                            {t('Polish')}
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
};
