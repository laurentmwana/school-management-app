'use client';

import type { CourseModel } from '@/types/model';
import { CourseCard } from './course-card';

interface CourseCardCollectionProps {
    courses: CourseModel[];
    variant?: 'admin' | 'other';
}

export function CourseCardCollection({ courses, variant = 'other' }: CourseCardCollectionProps) {
    if (courses.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="text-muted-foreground">
                    <div className="mb-2 text-lg font-medium">Aucun cours trouvé</div>
                    <p className="text-sm">Il n'y a pas encore de cours enregistrés.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} variant={variant} />
            ))}
        </div>
    );
}
