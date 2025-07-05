import { Heading } from '@/components/heading';
import { Card, CardContent } from '@/components/ui/card';
import { CourseForm } from '@/features/course/course-form';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { CourseModel, LevelModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cours',
        href: route('#course.index'),
    },
    {
        title: "Édition d'un cours",
        href: '',
    },
];

interface EditProps {
    course: CourseModel;
    levels: LevelModel[]
}

export default function Edit() {
    const { course , levels } = usePage<SharedData & EditProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Édition d'un cours" />
            <div className="mb-5 flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Édition d'un cours"
                    description="Modifiez un cours existant pour mettre à jour ses informations, telles que le nom, la description ou le niveau."
                />

                <div className="max-w-4xl">
                    <Card>
                        <CardContent>
                            <CourseForm levels={levels} course={course} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
