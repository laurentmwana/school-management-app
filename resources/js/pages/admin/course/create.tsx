import { Heading } from '@/components/heading';
import { Card, CardContent } from '@/components/ui/card';
import { CourseForm } from '@/features/course/course-form';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { LevelModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cours',
        href: route('#course.index'),
    },
    {
        title: "Création d'un cours",
        href: '',
    },
];

export default function Create() {
    const { levels } = usePage<SharedData & { levels: LevelModel[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Création d'une école" />
            <div className="mb-5 flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Création d'un cours"
                    description="Ajoutez une nouvelle école pour démarrer la gestion des élèves, des cours et des années scolaires."
                />

                <div className="max-w-4xl">
                    <Card>
                        <CardContent>
                            <CourseForm levels={levels} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
