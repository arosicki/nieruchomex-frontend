import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';

export const createMarkerIcon = () => {
    return L.divIcon({
        html: ReactDOMServer.renderToString(
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                className="w-10 h-10"
            >
                <mask id="hole-mask">
                    <rect width="100%" height="100%" fill="white" />
                    <circle cx="12" cy="10" r="3" fill="black" />
                </mask>

                <path
                    d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
                    mask="url(#hole-mask)"
                    className="fill-foreground"
                />
            </svg>,
        ),
        className: '', // clear default class
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });
};
