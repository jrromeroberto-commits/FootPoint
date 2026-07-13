import { Head, Link, usePage } from '@inertiajs/react';
import {
    CakeSlice,
    ChevronRight,
    Coffee,
    Drumstick,
    MapPin,
    Salad,
    Sandwich,
    Search,
    Soup,
    Star,
    Tag,
    UserRound,
    Users,
    Utensils,
} from 'lucide-react';
import { lazy, Suspense, useEffect, useState } from 'react';
import type { FormEvent } from 'react';

import { dashboard, login } from '@/routes';
import type { User } from '@/types';

const InteractiveMap = lazy(
    () => import('@/components/foodpoint/interactive-map'),
);

type WelcomePageProps = {
    auth: {
        user: User | null;
    };
};

const categories = [
    {
        name: 'Criolla',
        image: '/images/foodpoint/categories/comida_criolla.png',
        icon: Soup,
        searchTerm: 'criolla',
    },
    {
        name: 'Sushi',
        image: '/images/foodpoint/categories/sushi.png',
        icon: Utensils,
        searchTerm: 'sushi',
    },
    {
        name: 'Pollerias',
        image: '/images/foodpoint/categories/polleria.png',
        icon: Drumstick,
        searchTerm: 'pollo',
    },
    {
        name: 'Hamburguesas',
        image: '/images/foodpoint/categories/hamburguesa.png',
        icon: Sandwich,
        searchTerm: 'hamburguesa',
    },
    {
        name: 'Pastas',
        image: '/images/foodpoint/categories/pastas.png',
        icon: Utensils,
        searchTerm: 'pastas',
    },
    {
        name: 'Cafeterias',
        image: '/images/foodpoint/categories/cafeteria.png',
        icon: Coffee,
        searchTerm: 'cafe',
    },
    {
        name: 'Postres',
        image: '/images/foodpoint/categories/postres.png',
        icon: CakeSlice,
        searchTerm: 'postres',
    },
    {
        name: 'Saludable',
        image: '/images/foodpoint/categories/comida_saludable.png',
        icon: Salad,
        searchTerm: 'saludable',
    },
];

function FoodPointLogo() {
    return (
        <Link className="flex items-center gap-2" href="/">
            <span className="grid size-11 place-items-center rounded-full bg-orange-600 text-white shadow-lg shadow-orange-200">
                <Utensils className="size-6" />
            </span>
            <span className="text-2xl font-black tracking-tight text-neutral-950">
                FooD<span className="text-orange-600">Point</span>
            </span>
        </Link>
    );
}

function CategoryImage({ alt, src }: { alt: string; src: string }) {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-orange-50 via-white to-lime-50 text-orange-500">
                <Utensils className="size-10" />
            </div>
        );
    }

    return (
        <img
            alt={alt}
            className="h-full w-full object-cover"
            src={src}
            onError={() => setHasError(true)}
        />
    );
}

function SectionMark() {
    return (
        <div className="mx-auto mb-5 flex items-center justify-center gap-3 text-orange-600">
            <span className="h-1 w-16 rounded-full bg-orange-600" />
            <span className="grid size-12 place-items-center rounded-full bg-orange-600 text-white">
                <Utensils className="size-6" />
            </span>
            <span className="h-1 w-16 rounded-full bg-orange-600" />
        </div>
    );
}

function MapFallback() {
    return (
        <div className="grid h-full min-h-[420px] place-items-center bg-[#edf4ef]">
            <div className="h-24 w-64 rounded-lg bg-white/70 shadow-xl shadow-neutral-900/10" />
        </div>
    );
}

export default function Welcome() {
    const { auth } = usePage<WelcomePageProps>().props;
    const [isBrowserReady, setIsBrowserReady] = useState(false);
    const [foodQuery, setFoodQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');

    useEffect(() => {
        const animationFrame = window.requestAnimationFrame(() => {
            setIsBrowserReady(true);
        });

        return () => window.cancelAnimationFrame(animationFrame);
    }, []);

    function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    return (
        <>
            <Head title="FoodPoint" />

            <div className="min-h-screen bg-white text-neutral-950">
                <header className="sticky top-0 z-[1000] border-b border-neutral-100 bg-white shadow-sm">
                    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
                        <FoodPointLogo />

                        <nav className="hidden items-center gap-8 text-sm font-black tracking-wide lg:flex">
                            <a href="#inicio">INICIO</a>
                            <a href="#explorar">EXPLORAR</a>
                            <a href="#mapa">MAPA</a>
                            <a href="#resenas">RESENAS</a>
                            <a href="#ayuda">AYUDA</a>
                        </nav>

                        <div className="flex items-center gap-2">
                            <Link
                                className="hidden items-center gap-1 rounded-full border border-neutral-300 px-4 py-2 text-sm font-black shadow-sm transition hover:border-orange-400 md:inline-flex"
                                href={auth.user ? dashboard() : login()}
                            >
                                <UserRound className="size-4" />
                                {auth.user ? 'PANEL' : 'INICIAR SESION'}
                            </Link>

                            <a
                                className="inline-flex items-center gap-1 rounded-full bg-orange-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-orange-200 transition hover:bg-orange-700"
                                href="#mapa"
                            >
                                <Search className="size-4" />
                                <span className="hidden sm:inline">
                                    BUSCAR RESTAURANTES
                                </span>
                                <span className="sm:hidden">BUSCAR</span>
                            </a>
                        </div>
                    </div>
                </header>

                <main id="inicio">
                    <section className="relative grid min-h-[calc(100vh-80px)] overflow-hidden lg:grid-cols-[1.08fr_0.92fr]">
                        <div className="relative z-10 flex flex-col justify-center px-5 py-12 lg:px-8 lg:pr-10 xl:pl-[max(2rem,calc((100vw-1280px)/2))]">
                            <div className="max-w-3xl">
                                <h1 className="[font-family:Georgia,serif] text-5xl leading-[1.08] font-black tracking-normal text-neutral-950 sm:text-6xl xl:text-[4.45rem]">
                                    <span className="block">ENCUENTRA EL</span>
                                    <span className="block text-orange-600">
                                        RESTAURANTE IDEAL
                                    </span>
                                    <span className="block">CERCA DE TI</span>
                                </h1>

                                <p className="mt-6 max-w-2xl text-lg leading-7 text-neutral-700">
                                    Busca restaurantes en Lima, revisa
                                    calificaciones y resenas reales, compara
                                    precios, reserva lugares y estima el tiempo
                                    de viaje para tomar la mejor decision.
                                </p>
                            </div>

                            <form
                                className="relative mt-8 w-full max-w-3xl rounded-2xl bg-white p-4 shadow-2xl shadow-neutral-900/20"
                                onSubmit={handleSearchSubmit}
                            >
                                <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] xl:items-center">
                                    <label className="flex items-center gap-4 border-neutral-200 md:border-r md:pr-4">
                                        <Search className="size-7 shrink-0 text-orange-600" />
                                        <span className="min-w-0 flex-1">
                                            <span className="block text-base font-medium text-neutral-950">
                                                Que deseas comer hoy?
                                            </span>
                                            <input
                                                aria-label="Buscar por plato"
                                                className="mt-1 w-full border-0 bg-transparent p-0 text-sm text-neutral-700 outline-none placeholder:text-neutral-400"
                                                name="food"
                                                placeholder="Ej. sushi, pollo a la brasa, pizza"
                                                type="search"
                                                value={foodQuery}
                                                onChange={(event) =>
                                                    setFoodQuery(
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                        </span>
                                    </label>

                                    <label className="flex items-center gap-4">
                                        <MapPin className="size-7 shrink-0 text-emerald-500" />
                                        <span className="min-w-0 flex-1">
                                            <span className="block text-base font-medium text-neutral-950">
                                                Distrito o ubicacion
                                            </span>
                                            <input
                                                aria-label="Buscar por distrito o ubicacion"
                                                className="mt-1 w-full border-0 bg-transparent p-0 text-sm text-neutral-700 outline-none placeholder:text-neutral-400"
                                                name="location"
                                                placeholder="Ej. Miraflores, San Isidro"
                                                type="search"
                                                value={locationQuery}
                                                onChange={(event) =>
                                                    setLocationQuery(
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                        </span>
                                    </label>

                                    <button
                                        className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 font-black text-white shadow-lg shadow-orange-200 transition hover:bg-orange-700 xl:h-16"
                                        type="submit"
                                    >
                                        <Search className="size-5" />
                                        BUSCAR
                                    </button>
                                </div>
                            </form>

                            <div className="mt-8 flex flex-wrap gap-3 text-xs font-black">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-xl shadow-neutral-900/10">
                                    <MapPin className="size-4 text-emerald-600" />
                                    CERCA DE MI
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-xl shadow-neutral-900/10">
                                    <Star className="size-4 text-lime-500" />
                                    MEJOR CALIFICADO
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-xl shadow-neutral-900/10">
                                    <Tag className="size-4 text-orange-500" />
                                    MENOS DE S/30
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-xl shadow-neutral-900/10">
                                    <Users className="size-4 text-emerald-600" />
                                    FAMILIAR
                                </span>
                            </div>
                        </div>

                        <div
                            className="min-h-[460px] border-t border-neutral-100 lg:border-t-0"
                            id="mapa"
                        >
                            {isBrowserReady ? (
                                <Suspense fallback={<MapFallback />}>
                                    <InteractiveMap
                                        filters={{
                                            food: foodQuery,
                                            location: locationQuery,
                                        }}
                                    />
                                </Suspense>
                            ) : (
                                <MapFallback />
                            )}
                        </div>
                    </section>

                    <section className="px-5 py-16 lg:px-8" id="explorar">
                        <SectionMark />
                        <div className="mx-auto max-w-7xl">
                            <div className="text-center">
                                <h2 className="[font-family:Georgia,serif] text-4xl font-black text-neutral-950 sm:text-5xl">
                                    EXPLORA POR{' '}
                                    <span className="text-orange-600">
                                        TIPO DE COMIDA
                                    </span>
                                </h2>
                                <p className="mt-4 text-neutral-600">
                                    Descubre restaurantes segun antojos y
                                    encuentra tu proximo favorito
                                </p>
                            </div>

                            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
                                {categories.map((category) => {
                                    const Icon = category.icon;

                                    return (
                                        <button
                                            className="group overflow-hidden rounded-lg bg-white text-left shadow-xl ring-1 shadow-neutral-900/15 ring-neutral-100 transition hover:-translate-y-1 hover:shadow-2xl"
                                            key={category.name}
                                            onClick={() =>
                                                setFoodQuery(
                                                    category.searchTerm,
                                                )
                                            }
                                            type="button"
                                        >
                                            <div className="h-32 overflow-hidden">
                                                <CategoryImage
                                                    alt={category.name}
                                                    src={category.image}
                                                />
                                            </div>

                                            <div className="flex items-center gap-4 px-5 py-4">
                                                <Icon className="size-8 shrink-0 text-orange-500" />
                                                <span className="min-w-0 flex-1 text-base font-medium text-neutral-900">
                                                    {category.name}
                                                </span>
                                                <ChevronRight className="size-6 shrink-0 text-neutral-950 transition group-hover:translate-x-1 group-hover:text-orange-600" />
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
