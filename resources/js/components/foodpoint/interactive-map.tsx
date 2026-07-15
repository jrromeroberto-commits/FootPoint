import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import type { LatLngTuple } from 'leaflet';
import { Clock, Heart, Navigation, Star, Utensils } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    ZoomControl,
} from 'react-leaflet';

import { cn } from '@/lib/utils';

export type Restaurant = {
    id: number;
    name: string;
    category: string;
    district: string;
    address: string | null;
    keywords: string[];
    rating: number;
    reviews: number;
    price: string;
    distance: string;
    time: string;
    position: LatLngTuple;
    image: string;
};

export type MapSearchFilters = {
    food: string;
    location: string;
};

type InteractiveMapProps = {
    filters: MapSearchFilters;
    restaurants: Restaurant[];
};

const fallbackCenter: LatLngTuple = [-12.1211, -77.0305];

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

function normalizeSearch(value: string) {
    return value
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function restaurantMatchesFilters(
    restaurant: Restaurant,
    filters: MapSearchFilters,
) {
    const food = normalizeSearch(filters.food);
    const location = normalizeSearch(filters.location);
    const searchableFood = normalizeSearch(
        [
            restaurant.name,
            restaurant.category,
            restaurant.price,
            ...restaurant.keywords,
        ].join(' '),
    );
    const searchableLocation = normalizeSearch(
        [restaurant.district, restaurant.address].filter(Boolean).join(' '),
    );

    return (
        (!food || searchableFood.includes(food)) &&
        (!location || searchableLocation.includes(location))
    );
}

function MapViewSync({ center }: { center: LatLngTuple }) {
    const map = useMap();

    useEffect(() => {
        map.setView(center, 14, {
            animate: true,
        });
    }, [center, map]);

    return null;
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
                            {restaurant.category} - {restaurant.district}
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

function EmptySearchState() {
    return (
        <div className="rounded-xl bg-white/95 p-4 text-sm shadow-2xl shadow-neutral-900/20 backdrop-blur">
            <p className="font-bold text-neutral-950">
                No encontramos restaurantes
            </p>
            <p className="mt-1 text-neutral-500">
                Prueba con sushi, pollo, cafe, pastas, Miraflores o San Isidro.
            </p>
        </div>
    );
}

export default function InteractiveMap({
    filters,
    restaurants,
}: InteractiveMapProps) {
    const initialCenter = restaurants[0]?.position ?? fallbackCenter;
    const initialLocationLabel = restaurants[0]?.district ?? 'Tu zona';
    const [userCenter, setUserCenter] = useState(initialCenter);
    const [locationLabel, setLocationLabel] = useState(initialLocationLabel);
    const filteredRestaurants = useMemo(
        () =>
            restaurants.filter((restaurant) =>
                restaurantMatchesFilters(restaurant, filters),
            ),
        [filters, restaurants],
    );
    const [selectedRestaurantName, setSelectedRestaurantName] = useState<
        string | null
    >(restaurants[0]?.name ?? null);
    const icons = useMemo(
        () => ({
            active: makeRestaurantIcon(true),
            default: makeRestaurantIcon(false),
        }),
        [],
    );
    const activeRestaurantCount = filteredRestaurants.length;
    const selectedRestaurant =
        filteredRestaurants.find(
            (restaurant) => restaurant.name === selectedRestaurantName,
        ) ??
        filteredRestaurants[0] ??
        restaurants[0] ??
        null;
    const hasSearchQuery =
        filters.food.trim() !== '' || filters.location.trim() !== '';
    const mapCenter =
        hasSearchQuery && filteredRestaurants[0]
            ? filteredRestaurants[0].position
            : userCenter;

    useEffect(() => {
        window.navigator.geolocation?.getCurrentPosition(
            (position) => {
                setUserCenter([
                    position.coords.latitude,
                    position.coords.longitude,
                ]);
                setLocationLabel('Tu ubicacion');
            },
            () => {
                setLocationLabel(initialLocationLabel);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 60000,
                timeout: 5000,
            },
        );
    }, [initialLocationLabel]);

    return (
        <section className="relative isolate z-0 h-full min-h-[420px] overflow-hidden bg-[#edf4ef]">
            <MapContainer
                center={initialCenter}
                className="relative z-0 h-full w-full"
                scrollWheelZoom
                zoom={14}
                zoomControl={false}
            >
                <MapViewSync center={mapCenter} />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {filteredRestaurants.map((restaurant) => (
                    <Marker
                        eventHandlers={{
                            click: () =>
                                setSelectedRestaurantName(restaurant.name),
                        }}
                        icon={
                            selectedRestaurant?.name === restaurant.name
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
                                    {restaurant.category} -{' '}
                                    {restaurant.district} - {restaurant.price}
                                </p>
                                {restaurant.address ? (
                                    <p className="mt-1 text-xs text-neutral-500">
                                        {restaurant.address}
                                    </p>
                                ) : null}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                <ZoomControl position="bottomright" />
            </MapContainer>

            <div className="pointer-events-none absolute top-5 left-5 z-30 hidden rounded-lg bg-white/95 px-4 py-3 shadow-xl shadow-neutral-900/10 md:block">
                <p className="text-xs font-semibold tracking-[0.18em] text-orange-600 uppercase">
                    Zona activa
                </p>
                <p className="text-lg font-bold text-neutral-950">
                    {filters.location || locationLabel}
                </p>
            </div>

            <div className="absolute right-4 bottom-4 left-4 z-30 rounded-xl bg-white/95 p-3 shadow-2xl shadow-neutral-900/20 backdrop-blur md:left-auto md:w-[360px]">
                {selectedRestaurant ? (
                    <RestaurantPreview restaurant={selectedRestaurant} />
                ) : (
                    <EmptySearchState />
                )}
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-white/70 to-transparent" />

            <div
                className={cn(
                    'pointer-events-none absolute top-4 right-4 z-30 rounded-full bg-orange-600 px-4 py-2 text-xs font-bold text-white shadow-xl shadow-orange-950/20',
                    'hidden sm:block',
                )}
            >
                {activeRestaurantCount} restaurantes cerca de ti
            </div>
        </section>
    );
}
