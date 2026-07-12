import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import type { LatLngTuple } from 'leaflet';
import { Clock, Heart, Navigation, Star, Utensils } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    ZoomControl,
} from 'react-leaflet';

import { cn } from '@/lib/utils';

type Restaurant = {
    name: string;
    category: string;
    rating: number;
    reviews: number;
    price: string;
    distance: string;
    time: string;
    position: LatLngTuple;
    image: string;
};

const mirafloresCenter: LatLngTuple = [-12.1211, -77.0305];

const restaurants: Restaurant[] = [
    {
        name: 'Sakana Sushi Bar',
        category: 'Sushi',
        rating: 4.7,
        reviews: 512,
        price: 'S/45',
        distance: '2.1 km',
        time: '12 min',
        position: [-12.1211, -77.0305],
        image: '/images/foodpoint/categories/sushi.jpg',
    },
    {
        name: 'La Brasa Roja',
        category: 'Polleria',
        rating: 4.5,
        reviews: 1241,
        price: 'S/28',
        distance: '1.6 km',
        time: '8 min',
        position: [-12.1254, -77.0248],
        image: '/images/foodpoint/categories/pollerias.jpg',
    },
    {
        name: 'Cafe Aurora',
        category: 'Cafeteria',
        rating: 4.8,
        reviews: 389,
        price: 'S/22',
        distance: '1.2 km',
        time: '6 min',
        position: [-12.1192, -77.0361],
        image: '/images/foodpoint/categories/cafeterias.jpg',
    },
    {
        name: 'Pasta Lima',
        category: 'Pastas',
        rating: 4.6,
        reviews: 724,
        price: 'S/35',
        distance: '1.9 km',
        time: '10 min',
        position: [-12.1148, -77.0301],
        image: '/images/foodpoint/categories/pastas.jpg',
    },
];

function makeRestaurantIcon(isSelected: boolean) {
    const size = isSelected ? 42 : 34;

    return L.divIcon({
        className: '',
        iconAnchor: [size / 2, size],
        iconSize: [size, size],
        popupAnchor: [0, -size],
        html: `
            <div style="
                width: ${size}px;
                height: ${size}px;
                display: grid;
                place-items: center;
                border-radius: 50% 50% 50% 0;
                background: #fb5a16;
                border: 3px solid #ffffff;
                box-shadow: 0 16px 34px rgba(129, 51, 14, 0.28);
                transform: rotate(-45deg);
            ">
                <div style="
                    width: ${isSelected ? 14 : 10}px;
                    height: ${isSelected ? 14 : 10}px;
                    border-radius: 999px;
                    background: #ffffff;
                    transform: rotate(45deg);
                "></div>
            </div>
        `,
    });
}

function RestaurantPreview({ restaurant }: { restaurant: Restaurant }) {
    return (
        <article className="flex gap-3">
            <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-orange-50">
                <div className="absolute inset-0 grid place-items-center text-orange-500">
                    <Utensils className="size-7" />
                </div>
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="relative h-full w-full object-cover"
                    onError={(event) => {
                        event.currentTarget.style.display = 'none';
                    }}
                />
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="truncate text-sm font-bold text-neutral-950">
                            {restaurant.name}
                        </h3>
                        <p className="text-xs text-neutral-500">
                            {restaurant.category}
                        </p>
                    </div>
                    <Heart className="size-4 shrink-0 text-neutral-400" />
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-600">
                    <span className="inline-flex items-center gap-1 font-semibold text-neutral-900">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        {restaurant.rating}
                    </span>
                    <span>({restaurant.reviews} resenas)</span>
                    <span className="font-semibold text-emerald-600">
                        {restaurant.price}
                    </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                    <span className="inline-flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {restaurant.time}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <Navigation className="size-3.5" />
                        {restaurant.distance}
                    </span>
                </div>
            </div>
        </article>
    );
}

export default function InteractiveMap() {
    const [selectedRestaurant, setSelectedRestaurant] = useState(
        restaurants[0],
    );
    const icons = useMemo(
        () => ({
            active: makeRestaurantIcon(true),
            default: makeRestaurantIcon(false),
        }),
        [],
    );

    return (
        <section className="relative h-full min-h-[420px] overflow-hidden bg-[#edf4ef]">
            <MapContainer
                center={mirafloresCenter}
                className="h-full w-full"
                scrollWheelZoom
                zoom={14}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {restaurants.map((restaurant) => (
                    <Marker
                        eventHandlers={{
                            click: () => setSelectedRestaurant(restaurant),
                        }}
                        icon={
                            selectedRestaurant.name === restaurant.name
                                ? icons.active
                                : icons.default
                        }
                        key={restaurant.name}
                        position={restaurant.position}
                    >
                        <Popup>
                            <div className="min-w-52">
                                <p className="font-semibold">
                                    {restaurant.name}
                                </p>
                                <p className="text-xs text-neutral-500">
                                    {restaurant.category} - {restaurant.price}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                <ZoomControl position="bottomright" />
            </MapContainer>

            <div className="pointer-events-none absolute top-5 left-5 z-[500] hidden rounded-lg bg-white/95 px-4 py-3 shadow-xl shadow-neutral-900/10 md:block">
                <p className="text-xs font-semibold tracking-[0.18em] text-orange-600 uppercase">
                    Zona activa
                </p>
                <p className="text-lg font-bold text-neutral-950">Miraflores</p>
            </div>

            <div className="absolute right-4 bottom-4 left-4 z-[500] rounded-xl bg-white/95 p-3 shadow-2xl shadow-neutral-900/20 backdrop-blur md:left-auto md:w-[360px]">
                <RestaurantPreview restaurant={selectedRestaurant} />
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[450] h-28 bg-gradient-to-t from-white/70 to-transparent" />

            <div
                className={cn(
                    'pointer-events-none absolute top-4 right-4 z-[500] rounded-full bg-orange-600 px-4 py-2 text-xs font-bold text-white shadow-xl shadow-orange-950/20',
                    'hidden sm:block',
                )}
            >
                4 restaurantes cerca de ti
            </div>
        </section>
    );
}
