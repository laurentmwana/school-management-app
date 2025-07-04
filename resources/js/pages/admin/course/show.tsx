import { Heading } from '@/components/heading';
import { SchoolCardDetails } from '@/features/school/school-details';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { SchoolModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Écoles',
        href: route('#school.index'),
    },
    {
        title: "Détails d'une école",
        href: '',
    },
];

interface IndexProps {
    school: SchoolModel;
}

export default function Index() {
    const { school } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Détails de l'école" />
            <div className="mb-5 flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title={`Détails de l'école`}
                    description="Consultez les informations complètes de l’établissement, y compris l’adresse, l’acronyme, la description et les membres associés."
                />

                <SchoolCardDetails variant="admin" school={school} />
            </div>
        </AppLayout>
    );
}
