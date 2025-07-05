'use client';

import type { SchoolModel } from '@/types/model';
import { SchoolCard } from './school-card';

interface SchoolCardCollectionProps {
    schools: SchoolModel[];
    variant?: 'admin' | 'other';
}

export function SchoolCardCollection({ schools, variant = 'other' }: SchoolCardCollectionProps) {
    if (schools.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="text-muted-foreground">
                    <div className="mb-2 text-lg font-medium">Aucune école trouvée</div>
                    <p className="text-sm">Il n'y a pas encore d'écoles enregistrées.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {schools.map((school) => (
                <SchoolCard key={school.id} school={school} variant={variant} />
            ))}
        </div>
    );
}
