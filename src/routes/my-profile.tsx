import { createFileRoute } from '@tanstack/react-router';
import { ErrorPage } from '@/pages/error';
import { MyProfilePage } from '@/pages/my-profile';

export const Route = createFileRoute('/my-profile')({
    component: MyProfilePage,
    errorComponent: ErrorPage,
});
