import { GlobeIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';

export const LangToggle = () => {
    const { t, i18n } = useTranslation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <GlobeIcon className="size-[1.2rem]" />
                    <span className="sr-only">{t('Change language')}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                    value={i18n.language}
                    onValueChange={i18n.changeLanguage}
                >
                    <DropdownMenuRadioItem value="en">
                        {t('English')}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="pl">
                        {t('Polish')}
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
