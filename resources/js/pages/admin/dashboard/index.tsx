import { Heading } from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Activity, Bell, Calendar, MessageSquare, TrendingUp, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: '/dashboard',
    },
];

interface IndexProps {
    countSchools: number;
    countStudents: number;
    countCourses: number;
}

export default function Dashboard() {
    const { auth, countStudents, countSchools, countCourses } = usePage<SharedData & IndexProps>().props;

    const stats = [
        {
            title: 'Écoles',
            value: countSchools,
            description: 'Écoles actives',
            icon: Users,
            trend: '+12%',
        },
        {
            title: 'Élèves',
            value: countStudents,
            description: 'Élèves enregistrés',
            icon: MessageSquare,
            trend: '+8%',
        },
        {
            title: 'Cours',
            value: countCourses,
            description: 'Cours disponibles',
            icon: Bell,
            trend: '+15%',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tableau de bord" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <Heading
                    title="Tableau de bord"
                    description="Suivez en temps réel l’activité de votre établissement, les statistiques clés et accédez rapidement aux fonctions essentielles."
                />

                {/* Statistiques */}
                <div className="grid gap-4 md:grid-cols-3">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={index} className="relative">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                                    <div className="rounded-full bg-muted p-2">
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            <TrendingUp className="mr-1 h-3 w-3" />
                                            {stat.trend}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Activité et journal */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Graphique d'activité */}
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5" />
                                Activité récente
                            </CardTitle>
                            <CardDescription>Aperçu des 30 derniers jours</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed bg-muted/50">
                                <div className="text-center text-muted-foreground">
                                    <Activity className="mx-auto mb-4 h-12 w-12 opacity-50" />
                                    <p className="font-medium">Graphique d'activité</p>
                                    <p className="text-sm">Les données seront affichées ici</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Activités récentes */}
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Journal des événements
                            </CardTitle>
                            <CardDescription>Dernières actions enregistrées</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    {
                                        action: 'Nouvelle école enregistrée',
                                        time: 'Il y a 2 heures',
                                        user: 'Marie Dubois',
                                        icon: Users,
                                    },
                                    {
                                        action: 'Ajout d’un élève',
                                        time: 'Il y a 4 heures',
                                        user: 'Jean Martin',
                                        icon: MessageSquare,
                                    },
                                    {
                                        action: 'Nouveau cours publié',
                                        time: 'Il y a 6 heures',
                                        user: 'Sophie Laurent',
                                        icon: Bell,
                                    },
                                    {
                                        action: 'Profil mis à jour',
                                        time: 'Il y a 1 jour',
                                        user: 'Pierre Durand',
                                        icon: Activity,
                                    },
                                ].map((activity, index) => {
                                    const Icon = activity.icon;
                                    return (
                                        <div key={index} className="flex items-center space-x-4">
                                            <div className="rounded-full bg-muted p-2">
                                                <Icon className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{activity.action}</p>
                                                <p className="text-xs text-muted-foreground">par {activity.user}</p>
                                            </div>
                                            <div className="text-xs text-muted-foreground">{activity.time}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Raccourcis */}
                <Card>
                    <CardHeader>
                        <CardTitle>Actions rapides</CardTitle>
                        <CardDescription>Accédez rapidement aux fonctions essentielles</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-4">
                            {[
                                { title: 'Ajouter une école', icon: Users },
                                { title: 'Enregistrer un élève', icon: MessageSquare },
                                { title: 'Créer un cours', icon: Bell },
                                { title: 'Voir les statistiques', icon: TrendingUp },
                            ].map((action, index) => {
                                const Icon = action.icon;
                                return (
                                    <Card key={index} className="cursor-pointer border-dashed transition-colors hover:bg-muted/50">
                                        <CardContent className="flex flex-col items-center justify-center p-6">
                                            <div className="mb-3 rounded-full bg-muted p-3">
                                                <Icon className="h-6 w-6 text-muted-foreground" />
                                            </div>
                                            <p className="text-center text-sm font-medium">{action.title}</p>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
