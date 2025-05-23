import { MAP_CENTER, MAP_URL, SATELLITE_MAP_URL } from '@/config';
import { cn } from '@/lib/utils';
import { Map as LeafletMap } from 'leaflet';
import { ReactNode, useRef, useState } from 'react';
import {
    LayersControl,
    MapContainer,
    Marker,
    TileLayer,
    useMapEvent,
} from 'react-leaflet';
import { createMarkerIcon } from '../map/create-marker-icon';

interface Props {
    children?: ReactNode;
    className?: string;
    center?: [number, number];
    onChange?: (lat: number, lng: number) => void;
}

const icon = createMarkerIcon();

export const LocationSelector = ({
    children,
    onChange,
    className,
    center = MAP_CENTER,
}: Props) => {
    const mapRef = useRef<LeafletMap>(null);
    const [position, setPosition] = useState(center);

    const UpdateMarkerToMapCenter = () => {
        const map = useMapEvent('move', () => {
            const center = map.getCenter();
            setPosition([center.lat, center.lng]);
            onChange?.(center.lat, center.lng);
        });
        return null;
    };
    console.count('render');

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

            <Marker position={position} icon={icon} />
            <UpdateMarkerToMapCenter />
            {children}
        </MapContainer>
    );
};
