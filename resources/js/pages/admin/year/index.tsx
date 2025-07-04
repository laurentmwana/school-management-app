import { Heading } from '@/components/heading';
import { Pagination } from '@/components/ui/pagination';
import { LevelCardCollection } from '@/features/level/level-collection';
import { YearCardCollection } from '@/features/year/year-collection';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { LevelModel, YearModel } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Année scolaire',
        href: route('#year.index'),
    },
];

interface IndexProps {
    years: PaginationData<YearModel>;
}

export default function Index() {
    const { years } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Année scolaire" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Année scolaire"
                    description="Parcourez la liste des Année scolaire disponibles et accédez à leurs informations détaillées."
                />

                <div className="mb-4 flex items-center justify-between">
                    <div>{/* Zone pour filtres ou recherche future */}</div>
                </div>

                <div className="h-full">
                    <YearCardCollection variant="admin" years={years.data} />
                </div>

                <Pagination items={years} />
            </div>
        </AppLayout>
    );
}
