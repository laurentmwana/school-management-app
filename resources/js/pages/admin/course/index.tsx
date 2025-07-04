import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { SchoolCardCollection } from '@/features/school/school-collection';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { SchoolModel } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Écoles',
        href: route('#school.index'),
    },
];

interface IndexProps {
    schools: PaginationData<SchoolModel>;
}

export default function Index() {
    const { schools } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des écoles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Écoles"
                    description="Parcourez la liste des établissements scolaires enregistrés et accédez à leurs informations détaillées."
                />

                <div className="mb-4 flex items-center justify-between">
                    <div>{/* Zone pour filtres ou recherche future */}</div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route('#school.create')} className="flex items-center gap-2">
                            <Plus size={15} />
                            Ajouter une école
                        </Link>
                    </Button>
                </div>

                <div className="h-full">
                    <SchoolCardCollection variant="admin" schools={schools.data} />
                </div>

                <Pagination items={schools} />
            </div>
        </AppLayout>
    );
}
