import { useUsers } from '@/api/users/use-users';
import { RelativeDate } from '@/components/relative-date';
import { capitalize } from '../../../utils/capitalize';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Pagination } from '@/components/pagination';
import { EditUserDialog } from '@/pages/admin/dialogs/edit-user-dialog';
import { Button } from '@/components/ui/button';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { DeleteUserDialog } from '@/pages/admin/dialogs/delete-user-dialog';
import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const UsersConnector = () => {
    const { t } = useTranslation();
    const { data } = useUsers();

    const totalPages = Math.ceil(data.info.total / data.info.limit);
    const currentPage = Math.ceil(data.info.offset / data.info.limit) + 1;

    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">{t('ID')}</TableHead>
                        <TableHead>{t('Username')}</TableHead>
                        <TableHead>{t('Type')}</TableHead>
                        <TableHead>{t('Created')}</TableHead>
                        <TableHead>{t('Updated')}</TableHead>
                        <TableHead className="w-24" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.data.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{t(capitalize(user.type))}</TableCell>
                            <TableCell>
                                <RelativeDate date={user.createdAt} />
                            </TableCell>
                            <TableCell>
                                <RelativeDate date={user.updatedAt} />
                            </TableCell>
                            <TableCell className="flex gap-2">
                                <EditUserDialog
                                    userId={user.id}
                                    userType={user.type}
                                    userEmail={user.email}
                                    userPhone={user.phone}
                                >
                                    <Button size="icon" variant="ghost">
                                        <Pencil1Icon />
                                    </Button>
                                </EditUserDialog>
                                <DeleteUserDialog userId={user.id}>
                                    <Button size="icon" variant="destructive">
                                        <Trash2 />
                                    </Button>
                                </DeleteUserDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    linkTo="/admin"
                />
            </Table>
        </div>
    );
};
