import { Heading } from '@/components/heading';
import { LevelDetails } from '@/features/level/level-details';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { LevelModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Classes',
        href: route('#level.index'), // ✅ si intentionnel, sinon remplacer par route('level.index')
    },
    {
        title: "Détails d'une classe",
        href: '',
    },
];

interface IndexProps {
    level: LevelModel;
}

export default function Index() {
    const { level } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Détails de la classe" />
            <div className="mb-5 flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Détails de la classe"
                    description="Consultez les informations complètes de cette classe, y compris son nom, acronyme, année scolaire et autres détails associés."
                />
                <LevelDetails variant="admin" level={level} />
            </div>
        </AppLayout>
    );
}
