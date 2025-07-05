import { Heading } from '@/components/heading';
import { Card, CardContent } from '@/components/ui/card';
import { StudentForm } from '@/features/student/student-form';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { LevelModel, StudentModel, YearModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Élèves',
        href: route('#student.index'),
    },
    {
        title: "Édition d'un(e) élève",
        href: '',
    },
];

interface EditProps {
    student: StudentModel;
    years: YearModel[];
    levels: LevelModel[];
}

export default function Edit() {
    const { student, levels, years } = usePage<SharedData & EditProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Édition d'un(e) élève" />
            <div className="mb-5 flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Édition d'un(e) élève"
                    description="Modifiez les informations personnelles de l’élève, sa classe ou son année scolaire."
                />

                <div className="max-w-4xl">
                    <Card>
                        <CardContent>
                            <StudentForm student={student} levels={levels} years={years} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
