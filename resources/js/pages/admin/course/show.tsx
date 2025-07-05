import { Heading } from '@/components/heading';
import { CourseCardDetails } from '@/features/course/course-details';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { CourseModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cours',
        href: route('#course.index'),
    },
    {
        title: "Détails d'un cours",
        href: '',
    },
];

interface IndexProps {
    course: CourseModel;
}

export default function Index() {
    const { course } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Détails du cours" /> {/* corrigé */}
            <div className="mb-5 flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Détails du cours" // corrigé
                    description="Consultez les informations complètes du cours, y compris le titre, la description, le niveau associé et les intervenants." // adapté
                />

                <CourseCardDetails variant="admin" course={course} />
            </div>
        </AppLayout>
    );
}
