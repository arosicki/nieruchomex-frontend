import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { GlobalLayout } from '../layouts/global';
import { GlobalLoader } from '../components/global-loader/global-loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotFoundPage } from '../pages/not-found';
import { ThemeProvider } from '@/components/theme-provider';

const queryClient = new QueryClient();

export const Route = createRootRoute({
    component: () => (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Suspense fallback={<GlobalLoader />}>
                    <GlobalLayout />
                </Suspense>
            </ThemeProvider>
        </QueryClientProvider>
    ),
    notFoundComponent: () => (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<GlobalLoader />}>
                <NotFoundPage />
            </Suspense>
            <ToastContainer position="bottom-right" theme="dark" />
        </QueryClientProvider>
    ),
});
