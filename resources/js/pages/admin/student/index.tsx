import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { StudentCardCollection } from '@/features/student/student-collection';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { StudentModel } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Élèves',
        href: route('#student.index'),
    },
];

interface IndexProps {
    students: PaginationData<StudentModel>;
}

export default function Index() {
    const { students } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des élèves" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Élèves"
                    description="Parcourez la liste des élèves enregistrés et accédez à leurs informations détaillées."
                />

                <div className="mb-4 flex items-center justify-between">
                    <div>{/* Zone pour filtres ou recherche future */}</div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route('#student.create')} className="flex items-center gap-2">
                            <Plus size={15} />
                            Ajouter un(e) élève
                        </Link>
                    </Button>
                </div>

                <div className="h-full">
                    <StudentCardCollection variant="admin" students={students.data} />
                </div>

                <Pagination items={students} />
            </div>
        </AppLayout>
    );
}
