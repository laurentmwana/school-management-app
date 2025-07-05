import { Heading } from '@/components/heading';
import { Card, CardContent } from '@/components/ui/card';
import { StudentForm } from '@/features/student/student-form';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { LevelModel, YearModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Élèves',
        href: route('#student.index'),
    },
    {
        title: "Création d'un(e) élève",
        href: '',
    },
];

export default function Create() {
    const { levels, years } = usePage<SharedData & { levels: LevelModel[]; years: YearModel[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Création d'un(e) élève" />
            <div className="mb-5 flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Création d'un(e) élève"
                    description="Ajoutez un nouvel élève avec ses informations personnelles, sa classe et son année scolaire."
                />

                <div className="max-w-4xl">
                    <Card>
                        <CardContent>
                            <StudentForm levels={levels} years={years} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
