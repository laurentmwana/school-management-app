import { Heading } from '@/components/heading';
import { YearDetails } from '@/features/year/year-details';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { LevelModel, YearModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Année scolaire',
        href: route('#year.index'), // ✅ si intentionnel, sinon remplacer par route('level.index')
    },
    {
        title: "Détails d'une année scolaire",
        href: '',
    },
];

interface IndexProps {
    year: YearModel;
}

export default function Index() {
    const { year } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Détails de la classe" />
            <div className="mb-5 flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Détails de la classe"
                    description="Consultez les informations complètes de cette classe, y compris son nom, acronyme, année scolaire et autres détails associés."
                />
                <YearDetails variant="admin" year={year} />
            </div>
        </AppLayout>
    );
}
