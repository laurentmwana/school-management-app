import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import type { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="School Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-background p-6 text-foreground lg:justify-center lg:p-8">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        <AppearanceToggleDropdown />
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-border px-5 py-1.5 text-sm leading-normal text-foreground hover:border-border/70 hover:bg-accent"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-foreground hover:border-border hover:bg-accent"
                                >
                                    Se connecter
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-border px-5 py-1.5 text-sm leading-normal text-foreground hover:border-border/70 hover:bg-accent"
                                >
                                    S'inscrire
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg border bg-card p-6 pb-12 text-[13px] leading-[20px] shadow-sm lg:rounded-tl-lg lg:rounded-br-none lg:p-20">
                            <h1 className="mb-1 text-2xl font-medium text-foreground">Système de Gestion Scolaire</h1>
                            <p className="mb-2 text-muted-foreground">
                                Bienvenue dans votre plateforme de gestion éducative complète.
                                <br />
                                Commencez par explorer les fonctionnalités suivantes.
                            </p>
                            <ul className="mb-4 flex flex-col lg:mb-6">
                                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-1/2 before:bottom-0 before:left-[0.4rem] before:border-l before:border-border">
                                    <span className="relative bg-card py-1">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                                        </span>
                                    </span>
                                    <span>
                                        Gestion des
                                        <a
                                            href="#"
                                            className="ml-1 inline-flex items-center space-x-1 font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                                        >
                                            <span>élèves</span>
                                            <svg
                                                width={10}
                                                height={11}
                                                viewBox="0 0 10 11"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-2.5 w-2.5"
                                            >
                                                <path
                                                    d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
                                                    stroke="currentColor"
                                                    strokeLinecap="square"
                                                />
                                            </svg>
                                        </a>
                                    </span>
                                </li>
                                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-0 before:bottom-0 before:left-[0.4rem] before:border-l before:border-border">
                                    <span className="relative bg-card py-1">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                                        </span>
                                    </span>
                                    <span>
                                        Suivi des
                                        <a
                                            href="#"
                                            className="ml-1 inline-flex items-center space-x-1 font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                                        >
                                            <span>Notes & Présences</span>
                                            <svg
                                                width={10}
                                                height={11}
                                                viewBox="0 0 10 11"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-2.5 w-2.5"
                                            >
                                                <path
                                                    d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
                                                    stroke="currentColor"
                                                    strokeLinecap="square"
                                                />
                                            </svg>
                                        </a>
                                    </span>
                                </li>
                                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-0 before:bottom-1/2 before:left-[0.4rem] before:border-l before:border-border">
                                    <span className="relative bg-card py-1">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                                        </span>
                                    </span>
                                    <span>
                                        Administration des
                                        <a
                                            href="#"
                                            className="ml-1 inline-flex items-center space-x-1 font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                                        >
                                            <span>Cours & Horaires</span>
                                            <svg
                                                width={10}
                                                height={11}
                                                viewBox="0 0 10 11"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-2.5 w-2.5"
                                            >
                                                <path
                                                    d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
                                                    stroke="currentColor"
                                                    strokeLinecap="square"
                                                />
                                            </svg>
                                        </a>
                                    </span>
                                </li>
                            </ul>
                            <ul className="flex gap-3 text-sm leading-normal">
                                <li>
                                    <a
                                        href={auth.user ? route('dashboard') : route('login')}
                                        className="inline-block rounded-sm bg-primary px-5 py-1.5 text-sm leading-normal text-primary-foreground transition-colors hover:bg-primary/90"
                                    >
                                        Commencer maintenant
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-muted lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg">
                            {/* School Management Icon/Logo */}
                            <div className="flex h-full items-center justify-center">
                                <div className="text-center opacity-100 transition-all duration-750 starting:opacity-0">
                                    <div className="mb-4">
                                        <svg className="mx-auto h-24 w-24 text-primary" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                                        </svg>
                                    </div>
                                    <h2 className="mb-2 text-2xl font-bold text-foreground">École Numérique</h2>
                                    <p className="text-sm text-muted-foreground">Gestion moderne et efficace</p>
                                </div>
                            </div>
                            <div className="absolute inset-0 rounded-t-lg border lg:rounded-t-none lg:rounded-r-lg" />
                        </div>
                    </main>
                </div>

                {/* Footer */}
                <footer className="mt-8 w-full max-w-4xl border-t border-border pt-6">
                    <div className="text-center text-xs text-muted-foreground">
                        <p className="mb-2">
                            <strong className="text-foreground">School Management System</strong>
                        </p>
                        <p className="mb-1">
                            Développé par <span className="font-medium text-foreground">Mwanamputu Labeya Laurent</span>
                        </p>
                        <p className="mb-1">Dans le cadre d'un travail de séminaire informatique</p>
                        <p>
                            Dirigé par le <span className="font-medium text-foreground">Chef de Travaux Senghor</span>
                        </p>
                        <div className="mt-4 border-t border-border pt-4">
                            <p>&copy; {new Date().getFullYear()} - Tous droits réservés</p>
                        </div>
                    </div>
                </footer>

                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
