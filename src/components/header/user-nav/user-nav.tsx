import { User } from '../../../api/models/user';
import { getInitials } from '../../../utils/getInitials';
import { capitalize } from '../../../utils/capitalize';
import { useAuth } from '../../../hooks/use-auth';
import { Link, useNavigate } from '@tanstack/react-router';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    // DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeRadioGroup } from './theme-radio-group';
import { useTranslation } from 'react-i18next';

interface Props {
    user: User;
}

export const UserNav = ({ user }: Props) => {
    const { t } = useTranslation();
    const { signOut } = useAuth();
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full mr-4"
                >
                    <Avatar className="h-8 w-8">
                        {/* TODO: Stretch add user avatars */}
                        {/* <AvatarImage src="/avatars/01.png" alt="@shadcn" /> */}
                        <AvatarFallback>
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {capitalize(user.type)}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={() =>
                            navigate({
                                to: '/my-posts',
                            })
                        }
                    >
                        {t('My posts')}
                        {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() =>
                            navigate({
                                to: '/favorites',
                            })
                        }
                    >
                        {t('My favorites')}
                        {/* <DropdownMenuShortcut>⇧⌘F</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() =>
                            navigate({
                                to: '/my-profile',
                            })
                        }
                    >
                        {t('My profile')}
                        {/* <DropdownMenuShortcut>⇧⌘M</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                    {user.type === 'ADMIN' && (
                        <DropdownMenuItem asChild>
                            <Link to="/admin">
                                {t('Admin panel')}
                                {/* <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut> */}
                            </Link>
                        </DropdownMenuItem>
                    )}
                    <ThemeRadioGroup />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                    {t('Sign out')}
                    {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
