'use client';

import type { StudentModel } from '@/types/model';
import { StudentCard } from './student-card';

interface StudentCardCollectionProps {
    students: StudentModel[];
    variant?: 'admin' | 'other';
}

export function StudentCardCollection({ students, variant = 'other' }: StudentCardCollectionProps) {
    if (students.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="text-muted-foreground">
                    <div className="mb-2 text-lg font-medium">Aucun élève trouvé</div>
                    <p className="text-sm">Il n'y a pas encore d'élèves enregistrés.</p>
                </div>
            </div>
        );
    }

    // Statistiques
    const averageAge =
        students.reduce((sum, student) => {
            const age = Math.floor((Date.now() - new Date(student.birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
            return sum + age;
        }, 0) / students.length;

    const genderStats = students.reduce(
        (acc, student) => {
            if (student.gender === 'M') acc.male++;
            else if (student.gender === 'F') acc.female++;
            else acc.other++;
            return acc;
        },
        { male: 0, female: 0, other: 0 },
    );

    const levelsCount = new Set(students.map((s) => s.actual_level.level.id)).size;

    return (
        <div className="space-y-6">
            {/* Statistiques */}
            <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-lg border bg-card p-4">
                    <div className="text-2xl font-bold text-primary">{students.length}</div>
                    <div className="text-sm text-muted-foreground">élèves totaux</div>
                </div>
                <div className="rounded-lg border bg-card p-4">
                    <div className="text-2xl font-bold text-primary">{averageAge.toFixed(1)} ans</div>
                    <div className="text-sm text-muted-foreground">Âge moyen</div>
                </div>
                <div className="rounded-lg border bg-card p-4">
                    <div className="text-2xl font-bold text-primary">{levelsCount}</div>
                    <div className="text-sm text-muted-foreground">Niveaux différents</div>
                </div>
                <div className="rounded-lg border bg-card p-4">
                    <div className="text-lg font-bold text-primary">
                        👨‍🎓{genderStats.male} • 👩‍🎓{genderStats.female}
                    </div>
                    <div className="text-sm text-muted-foreground">Répartition H/F</div>
                </div>
            </div>

            {/* Collection des élèves */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {students.map((student) => (
                    <StudentCard key={student.id} student={student} variant={variant} />
                ))}
            </div>
        </div>
    );
}
