import { Suspense, useEffect, useMemo, useState } from 'react';
import { WallLayout } from '../../layouts/wall';
import { PostsConnector } from './connectors/posts-connector';
import { Loader } from '../../components/loader/loader';
import { FilterPanel, PostSearchFormModel } from '@/components/filter-panel';
import { MapPointsConnector } from './connectors/map-connector';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Map } from '@/components/map/map';
import { AddressSearch } from '@/components/address-search';
import { RadiusConnector } from './connectors/radius-connector';
import { useMediaQuery } from '@/utils/useMediaQuery';
import { BREAKPOINTS } from '@/config';
import { useNavigate } from '@tanstack/react-router';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { useSearch } from '@tanstack/react-router';
import { getFiltersSearchParams } from '@/lib/get-search-url-params';
import { useRetrieveAddress } from '@/api/address/use-retrive-address';
import { LatLngTuple } from 'leaflet';
import { useTranslation } from 'react-i18next';
import { toast } from '@/hooks/use-toast';

export const SearchPage = () => {
    const { t } = useTranslation();
    const { data: address } = useRetrieveAddress();
    const [userLocation, setUserLocation] = useState<LatLngTuple | undefined>();

    const isMobile = useMediaQuery(BREAKPOINTS.lg);

    const orientation = isMobile ? 'vertical' : 'horizontal';

    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: Record<string, any> = useSearch({
        strict: false,
    });

    const parsedParams = useMemo(
        () => getFiltersSearchParams(params),
        [params],
    );

    useEffect(() => {
        const getBrowserLocation = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation([latitude, longitude]);
                    },
                    () => {
                        toast({
                            title: t('Location access denied'),
                            description: t(
                                'Allowing location access will help you find posts near you.',
                            ),
                        });
                    },
                );
            }
        };

        getBrowserLocation();
    }, [address, t]);

    const center = useMemo(() => {
        if (params.mapboxId && address?.geometry.coordinates)
            return [
                address?.geometry.coordinates[1],
                address?.geometry.coordinates[0],
            ] as LatLngTuple;

        return userLocation;
    }, [userLocation, address, params.mapboxId]);

    const onSubmit = (data: PostSearchFormModel) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newSearch: Record<string, any> = data;
        !newSearch.search && delete newSearch.search;

        if (params.mapboxId) newSearch.mapboxId = params.mapboxId;
        if (params.distance) newSearch.distance = params.distance;

        navigate({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            search: newSearch as any,
            to: '/search',
        });
    };

    const onClear = async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newSearch: Record<string, any> = {};

        if (params.mapboxId) newSearch.mapboxId = params.mapboxId;
        if (params.distance) newSearch.distance = params.distance;

        await navigate({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            search: newSearch as any,
        });
    };
    console.log('center', center);
    console.log(
        'coords',
        address?.geometry.coordinates,
        address?.geometry.coordinates === center,
    );
    console.log('userLocation', userLocation, userLocation === center);

    return (
        <WallLayout>
            <ResizablePanelGroup
                direction={isMobile ? 'vertical' : 'horizontal'}
            >
                <ResizablePanel minSize={isMobile ? 8 : 30}>
                    <AddressSearch />
                    <Map
                        className="h-[calc(100vh-8.25rem)] w-full"
                        orientation={orientation}
                        center={center}
                    >
                        <Suspense>
                            <MapPointsConnector />
                            <RadiusConnector />
                        </Suspense>
                    </Map>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel minSize={isMobile ? 0 : 50}>
                    <div className="relative w-full">
                        <div className="absolute px-6 overflow-auto h-[calc(100vh-4rem)] color-scheme-light dark:color-scheme-dark w-full">
                            <div className="sticky top-0 z-30 bg-background">
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="hover:no-underline">
                                            <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                {t('Filters')}
                                            </h1>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <FilterPanel
                                                onClear={onClear}
                                                onSubmit={onSubmit}
                                                defaultValues={parsedParams}
                                                className="px-4 pb-2"
                                            />
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                            <Suspense
                                fallback={
                                    <div className="w-full h-[calc(100vh-8.25rem)] flex justify-center items-center">
                                        <Loader />
                                    </div>
                                }
                            >
                                <PostsConnector />
                            </Suspense>
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </WallLayout>
    );
};
