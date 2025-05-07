import { MAP_CENTER, MAP_URL, SATELLITE_MAP_URL } from '@/config';
import { cn } from '@/lib/utils';
import { LatLngTuple, Map as LeafletMap } from 'leaflet';
import { ReactNode, useEffect, useRef } from 'react';
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';

interface Props {
    children?: ReactNode;
    className?: string;
    orientation?: 'horizontal' | 'vertical';
    center?: LatLngTuple;
}

export const Map = ({
    children,
    className,
    orientation = 'vertical',
    center = MAP_CENTER,
}: Props) => {
    const mapRef = useRef<LeafletMap>(null);

    useEffect(() => {
        const map = mapRef.current;
        if (map) {
            map?.invalidateSize();
        }
    }, [orientation]);

    useEffect(() => {
        const map = mapRef.current;
        if (map) map.setView(center);
    }, [center]);

    return (
        <MapContainer
            center={center}
            zoom={20}
            className={cn('h-full sticky', className)}
            scrollWheelZoom={true}
            minZoom={1}
            ref={mapRef}
        >
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Default">
                    <TileLayer
                        className="topography"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url={MAP_URL}
                    />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="Satellite">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url={SATELLITE_MAP_URL}
                    />
                </LayersControl.BaseLayer>
            </LayersControl>

            {children}
        </MapContainer>
    );
};
