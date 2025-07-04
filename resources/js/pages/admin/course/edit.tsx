import { Heading } from '@/components/heading';
import { Card, CardContent } from '@/components/ui/card';
import { SchoolForm } from '@/features/school/school-form';
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
        title: "Édition d'une école",
        href: '',
    },
];

interface EditProps {
    school: SchoolModel;
}

export default function Edit() {
    const { school } = usePage<SharedData & EditProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Édition d'une école" />
            <div className="mb-5 flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Édition d'une école"
                    description="Modifiez une école existante pour mettre à jour ses informations, telles que le nom, l'adresse ou la description."
                />

                <div className="max-w-4xl">
                    <Card>
                        <CardContent>
                            <SchoolForm school={school} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
