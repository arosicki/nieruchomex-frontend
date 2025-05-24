import { Outlet } from '@tanstack/react-router';
import { useCurrentUser } from '../api/users/use-current-user';
import { UserContext } from '../context/user-context';
import { Toaster } from '@/components/ui/toaster';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const GlobalLayout = () => {
    const { data } = useCurrentUser();

    return (
        <UserContext.Provider value={data.data}>
            <Outlet />
            <Toaster />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </UserContext.Provider>
    );
};
