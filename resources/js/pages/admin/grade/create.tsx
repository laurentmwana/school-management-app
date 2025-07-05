import { Heading } from '@/components/heading';
import { Card, CardContent } from '@/components/ui/card';
import { SchoolForm } from '@/features/school/school-form';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Écoles',
        href: route('#school.index'), // Supposé route correcte
    },
    {
        title: "Création d'une école",
        href: '',
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Création d'une école" />
            <div className="mb-5 flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Création d'une école"
                    description="Ajoutez une nouvelle école pour démarrer la gestion des élèves, des cours et des années scolaires."
                />

                <div className="max-w-4xl">
                    <Card>
                        <CardContent>
                            <SchoolForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
