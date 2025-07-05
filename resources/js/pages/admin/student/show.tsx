import { Heading } from '@/components/heading';
import { StudentCardDetails } from '@/features/student/student-details';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { StudentModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Élèves',
        href: route('#student.index'),
    },
    {
        title: "Détails d'un(e) élève",
        href: '',
    },
];

interface IndexProps {
    student: StudentModel;
}

export default function Index() {
    const { student } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Détails de l'élève" />
            <div className="mb-5 flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Détails de l'élève"
                    description="Consultez les informations complètes de l’élève, telles que le nom, la date de naissance, le niveau fréquenté et d’autres informations liées à sa scolarité."
                />

                <StudentCardDetails variant="admin" student={student} />
            </div>
        </AppLayout>
    );
}
