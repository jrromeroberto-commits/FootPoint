import { Form, Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    Lock,
    Mail,
    MapPin,
    Search,
    ShieldCheck,
    Store,
    UserPlus,
    UserRound,
    Utensils,
} from 'lucide-react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { home } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

function FoodPointLogo() {
    return (
        <Link className="flex items-center gap-2" href={home()}>
            <span className="grid size-11 place-items-center rounded-full bg-orange-600 text-white shadow-lg shadow-orange-200">
                <Utensils className="size-6" />
            </span>
            <span className="text-2xl font-black tracking-tight text-neutral-950">
                FooD<span className="text-orange-600">Point</span>
            </span>
        </Link>
    );
}

function LoginIllustration() {
    const [hasError, setHasError] = useState(false);

    if (!hasError) {
        return (
            <img
                alt="FoodPoint mobile preview"
                className="h-full w-full object-contain"
                src="/images/foodpoint/login-illustration.png"
                onError={() => setHasError(true)}
            />
        );
    }

    return (
        <div className="relative h-full min-h-[300px] overflow-hidden rounded-lg bg-gradient-to-br from-orange-50 via-white to-lime-50">
            <div className="absolute top-8 left-10 h-72 w-40 rotate-[-8deg] rounded-[2rem] border-[10px] border-neutral-950 bg-white shadow-2xl shadow-neutral-900/20">
                <div className="mx-auto mt-3 h-3 w-14 rounded-full bg-neutral-900" />
                <div className="mx-4 mt-6 rounded-lg bg-orange-50 p-3">
                    <div className="mb-3 h-3 w-24 rounded-full bg-neutral-900" />
                    <div className="h-24 rounded-lg bg-[#dbeee8]">
                        <div className="grid h-full place-items-center text-orange-600">
                            <MapPin className="size-8" />
                        </div>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((item) => (
                            <div
                                className="h-14 rounded-lg bg-white shadow-sm"
                                key={item}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-36 h-32 w-44 rounded-t-3xl border border-orange-100 bg-white shadow-xl">
                <div className="h-10 rounded-t-3xl bg-orange-500" />
                <div className="mx-auto mt-5 h-14 w-20 rounded-md bg-sky-100" />
            </div>

            <MapPin className="absolute top-20 right-16 size-14 fill-orange-600 text-orange-600" />
            <Utensils className="absolute right-20 bottom-16 size-12 rounded-full bg-white p-2 text-orange-600 shadow-xl" />
        </div>
    );
}

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Iniciar sesion" />

            <div className="min-h-screen bg-white text-neutral-950">
                <header className="border-b border-neutral-100 bg-white shadow-sm">
                    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
                        <FoodPointLogo />

                        <nav className="hidden items-center gap-8 text-sm font-black tracking-wide lg:flex">
                            <Link href={home()}>INICIO</Link>
                            <a href="/#explorar">EXPLORAR</a>
                            <a href="/#mapa">MAPA</a>
                            <a href="/#resenas">RESENAS</a>
                            <a href="/#ayuda">AYUDA</a>
                        </nav>

                        <div className="flex items-center gap-2">
                            <Link
                                className="hidden items-center gap-1 rounded-full border border-neutral-300 px-4 py-2 text-sm font-black shadow-sm md:inline-flex"
                                href="/login"
                            >
                                <UserRound className="size-4" />
                                INICIAR SESION
                            </Link>

                            <a
                                className="inline-flex items-center gap-1 rounded-full bg-orange-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-orange-200 transition hover:bg-orange-700"
                                href="/#mapa"
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

                <main className="grid min-h-[calc(100vh-80px)] lg:grid-cols-[1fr_430px] xl:grid-cols-[1fr_500px]">
                    <section className="px-5 py-10 lg:px-12 xl:pl-[max(3rem,calc((100vw-1280px)/2))]">
                        <div className="max-w-4xl">
                            <h1 className="[font-family:Georgia,serif] text-5xl leading-tight font-black sm:text-6xl">
                                INICIAR{' '}
                                <span className="text-orange-600">SESION</span>
                            </h1>
                            <p className="mt-4 max-w-2xl text-lg leading-7 text-neutral-700">
                                Inicia sesion para continuar con tu busqueda
                                como cliente o mira las reservas que tiene tu
                                restaurante.
                            </p>
                        </div>

                        <div className="mt-10 grid items-center gap-8 xl:grid-cols-[1fr_310px]">
                            <div className="h-[360px] max-w-xl">
                                <LoginIllustration />
                            </div>

                            <div className="grid gap-5">
                                <div className="flex items-center gap-4">
                                    <span className="grid size-14 place-items-center rounded-full bg-white text-orange-600 shadow-xl shadow-neutral-900/10">
                                        <Search className="size-7" />
                                    </span>
                                    <span className="font-black">
                                        EXPLORA RESTAURANTES
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="grid size-14 place-items-center rounded-full bg-white text-orange-600 shadow-xl shadow-neutral-900/10">
                                        <CheckCircle2 className="size-7 fill-orange-100" />
                                    </span>
                                    <span className="font-black">
                                        GUARDA TUS FAVORITOS
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="grid size-14 place-items-center rounded-full bg-white text-orange-600 shadow-xl shadow-neutral-900/10">
                                        <Store className="size-7" />
                                    </span>
                                    <span className="font-black">
                                        GESTIONA TU RESTAURANTE
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <aside className="border-t border-neutral-100 bg-neutral-50 px-5 py-10 shadow-[-20px_0_60px_rgba(15,23,42,0.08)] lg:border-t-0 lg:px-8">
                        <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-2xl shadow-neutral-900/10">
                            <div className="text-center">
                                <span className="mx-auto grid size-14 place-items-center rounded-full bg-orange-50 text-orange-600">
                                    <Lock className="size-7" />
                                </span>
                                <h2 className="mt-5 text-3xl font-black">
                                    Iniciar sesion
                                </h2>
                                <p className="mt-2 text-sm text-neutral-500">
                                    Accede con tu correo y continua tu
                                    experiencia en FooDPoint.
                                </p>
                            </div>

                            {status && (
                                <div className="mt-6 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                                    {status}
                                </div>
                            )}

                            <Form
                                {...store.form()}
                                className="mt-8 grid gap-5"
                                resetOnSuccess={['password']}
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">
                                                Correo electronico
                                            </Label>
                                            <div className="relative">
                                                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
                                                <Input
                                                    autoComplete="email"
                                                    autoFocus
                                                    className="h-12 rounded-lg pl-10"
                                                    id="email"
                                                    name="email"
                                                    placeholder="correo@ejemplo.com"
                                                    required
                                                    tabIndex={1}
                                                    type="email"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="password">
                                                Contrasena
                                            </Label>
                                            <div className="relative">
                                                <Lock className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-neutral-400" />
                                                <PasswordInput
                                                    autoComplete="current-password"
                                                    className="h-12 rounded-lg pl-10"
                                                    id="password"
                                                    name="password"
                                                    placeholder="********"
                                                    required
                                                    tabIndex={2}
                                                />
                                            </div>
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <label className="flex items-center gap-2 text-sm text-neutral-600">
                                                <Checkbox
                                                    id="remember"
                                                    name="remember"
                                                    tabIndex={3}
                                                />
                                                Recordarme
                                            </label>

                                            {canResetPassword && (
                                                <Link
                                                    className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                                                    href={request()}
                                                    tabIndex={5}
                                                >
                                                    Olvidaste tu contrasena?
                                                </Link>
                                            )}
                                        </div>

                                        <Button
                                            className="h-12 w-full rounded-lg bg-orange-600 text-base font-black text-white shadow-lg shadow-orange-200 hover:bg-orange-700"
                                            data-test="login-button"
                                            disabled={processing}
                                            tabIndex={4}
                                            type="submit"
                                        >
                                            {processing && <Spinner />}
                                            Iniciar sesion
                                            <ArrowRight className="size-5" />
                                        </Button>
                                    </>
                                )}
                            </Form>

                            <div className="mt-6 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800">
                                <div className="flex gap-3">
                                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                                    <p>
                                        Si tu cuenta pertenece a un restaurante,
                                        te llevaremos automaticamente a tu panel
                                        de restaurante.
                                    </p>
                                </div>
                            </div>

                            <div className="my-6 flex items-center gap-4">
                                <span className="h-px flex-1 bg-neutral-200" />
                                <span className="text-sm text-neutral-400">
                                    o
                                </span>
                                <span className="h-px flex-1 bg-neutral-200" />
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <a
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-neutral-200 px-3 text-sm font-bold text-neutral-700 transition hover:border-orange-300 hover:text-orange-600"
                                    href="/register"
                                >
                                    <UserPlus className="size-4" />
                                    Crear cuenta
                                </a>
                                <a
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-neutral-200 px-3 text-sm font-bold text-neutral-700 transition hover:border-orange-300 hover:text-orange-600"
                                    href="/restaurants/register"
                                >
                                    <Store className="size-4" />
                                    Registrar restaurante
                                </a>
                            </div>
                        </div>
                    </aside>
                </main>
            </div>
        </>
    );
}
