import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { CourseCardCollection } from '@/features/course/course-collection';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { CourseModel } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cours',
        href: route('#course.index'),
    },
];

interface IndexProps {
    courses: PaginationData<CourseModel>;
}

export default function Index() {
    const { courses } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des cours" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Cours"
                    description="Parcourez la liste des cours enregistrés et accédez à leurs informations détaillées."
                />

                <div className="mb-4 flex items-center justify-between">
                    <div>{/* Zone pour filtres ou recherche future */}</div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route('#course.create')} className="flex items-center gap-2">
                            <Plus size={15} />
                            Ajouter un cours
                        </Link>
                    </Button>
                </div>

                <div className="h-full">
                    <CourseCardCollection variant="admin" courses={courses.data} />
                </div>

                <Pagination items={courses} />
            </div>
        </AppLayout>
    );
}
