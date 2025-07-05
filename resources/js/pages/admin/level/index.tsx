import { Heading } from '@/components/heading';
import { Pagination } from '@/components/ui/pagination';
import { LevelCardCollection } from '@/features/level/level-collection';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { LevelModel } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Classes',
        href: route('#level.index'),
    },
];

interface IndexProps {
    levels: PaginationData<LevelModel>;
}

export default function Index() {
    const { levels } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des classes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Classes"
                    description="Parcourez la liste des classes disponibles et accédez à leurs informations détaillées."
                />

                <div className="mb-4 flex items-center justify-between">
                    <div>{/* Zone pour filtres ou recherche future */}</div>
                </div>

                <div className="h-full">
                    <LevelCardCollection variant="admin" levels={levels.data} />
                </div>

                <Pagination items={levels} />
            </div>
        </AppLayout>
    );
}
