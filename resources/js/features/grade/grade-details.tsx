'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { GradeModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { ArrowLeft, BookOpen, Calendar, Clock, Edit, GraduationCap, Trash2, TrendingUp, User, Users } from 'lucide-react';

interface GradeCardDetailsProps {
    grade: GradeModel;
    studentGrades?: GradeModel[]; // Autres notes de l'étudiant
    courseGrades?: GradeModel[]; // Autres notes du cours
    variant?: 'admin' | 'other';
}

export function GradeCardDetails({ grade, studentGrades = [], courseGrades = [], variant = 'other' }: GradeCardDetailsProps) {
    // Fonctions utilitaires
    const getScoreBadgeVariant = (score: number) => {
        if (score >= 16) return 'default';
        if (score >= 14) return 'secondary';
        if (score >= 12) return 'outline';
        if (score >= 10) return 'outline';
        return 'destructive';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 16) return 'Excellent';
        if (score >= 14) return 'Bien';
        if (score >= 12) return 'Assez bien';
        if (score >= 10) return 'Passable';
        return 'Insuffisant';
    };

    // Statistiques de l'étudiant
    const studentAverage = studentGrades.length > 0 ? studentGrades.reduce((sum, g) => sum + g.score, 0) / studentGrades.length : 0;

    // Statistiques du cours
    const courseAverage = courseGrades.length > 0 ? courseGrades.reduce((sum, g) => sum + g.score, 0) / courseGrades.length : 0;

    const coursePassRate = courseGrades.length > 0 ? (courseGrades.filter((g) => g.score >= 10).length / courseGrades.length) * 100 : 0;

    // Position de l'élèvedans la classe
    const betterGrades = courseGrades.filter((g) => g.score > grade.score).length;
    const classRank = betterGrades + 1;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={variant === 'admin' ? '/admin/grades' : '/grades'}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">{grade.student.name}</h1>
                        <p className="text-muted-foreground">
                            {grade.course.name} - {grade.year.name}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Badge variant={getScoreBadgeVariant(grade.score)} className="px-4 py-2 text-lg font-bold">
                        {grade.score}/20
                    </Badge>
                    {variant === 'admin' && (
                        <div className="flex gap-2">
                            <Button variant="outline" asChild>
                                <Link href={`/admin/grades/${grade.id}/edit`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Éditer
                                </Link>
                            </Button>
                            <Button variant="destructive" asChild>
                                <Link href={`/admin/grades/${grade.id}/delete`}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Supprimer
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Informations principales */}
                <div className="space-y-6 lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Détails de la note</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <h4 className="mb-2 font-medium">Note obtenue</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold">{grade.score}/20</span>
                                        <Badge variant={getScoreBadgeVariant(grade.score)}>{getScoreLabel(grade.score)}</Badge>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="mb-2 font-medium">Position dans la classe</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold">#{classRank}</span>
                                        <span className="text-muted-foreground">sur {courseGrades.length}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span>Étudiant: {grade.student.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                        Cours: {grade.course.name} ({grade.course.alias})
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                        {grade.course.credits} crédit{grade.course.credits > 1 ? 's' : ''}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                    <span>Niveau: {grade.level.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>Année: {grade.year.name}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Comparaison avec les moyennes */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <TrendingUp className="h-5 w-5" />
                                Comparaison des performances
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-lg bg-muted/50 p-4 text-center">
                                    <div className="text-2xl font-bold text-primary">{grade.score}</div>
                                    <div className="text-sm text-muted-foreground">Note obtenue</div>
                                </div>
                                <div className="rounded-lg bg-muted/50 p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">{courseAverage.toFixed(1)}</div>
                                    <div className="text-sm text-muted-foreground">Moyenne du cours</div>
                                </div>
                                <div className="rounded-lg bg-muted/50 p-4 text-center">
                                    <div className="text-2xl font-bold text-green-600">{studentAverage.toFixed(1)}</div>
                                    <div className="text-sm text-muted-foreground">Moyenne de l'étudiant</div>
                                </div>
                            </div>

                            <div className="mt-4 rounded-lg bg-muted/30 p-3">
                                <div className="text-sm">
                                    {grade.score > courseAverage ? (
                                        <span className="font-medium text-green-600">
                                            ✓ Note supérieure à la moyenne du cours (+{(grade.score - courseAverage).toFixed(1)} points)
                                        </span>
                                    ) : (
                                        <span className="font-medium text-red-600">
                                            ✗ Note inférieure à la moyenne du cours ({(grade.score - courseAverage).toFixed(1)} points)
                                        </span>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Historique de l'élève*/}
                    {studentGrades.length > 0 && (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Autres notes de l'étudiant</CardTitle>
                                    {variant === 'admin' && (
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/admin/students/${grade.student.id}/grades`}>Voir toutes</Link>
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {studentGrades.slice(0, 5).map((g) => (
                                        <div key={g.id} className="flex items-center justify-between rounded-lg border p-3">
                                            <div>
                                                <div className="font-medium">{g.course.name}</div>
                                                <div className="text-sm text-muted-foreground">{new Date(g.created_at).toLocaleDateString()}</div>
                                            </div>
                                            <Badge variant={getScoreBadgeVariant(g.score)}>{g.score}/20</Badge>
                                        </div>
                                    ))}
                                    {studentGrades.length > 5 && (
                                        <div className="text-center">
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/admin/students/${grade.student.id}/grades`}>
                                                    Voir {studentGrades.length - 5} autres notes
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Statistiques du cours */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Users className="h-5 w-5" />
                                Statistiques du cours
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{courseGrades.length}</div>
                                <div className="text-sm text-muted-foreground">élèves notés</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">{courseAverage.toFixed(1)}</div>
                                <div className="text-sm text-muted-foreground">Moyenne générale</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">{coursePassRate.toFixed(1)}%</div>
                                <div className="text-sm text-muted-foreground">Taux de réussite</div>
                            </div>
                            {variant === 'admin' && (
                                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                                    <Link href={`/admin/courses/${grade.course.id}`}>Voir le cours</Link>
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    {/* Actions rapides */}
                    {variant === 'admin' && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Actions rapides</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                                    <Link href={`/admin/students/${grade.student.id}`}>Voir l'étudiant</Link>
                                </Button>
                                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                                    <Link href={`/admin/courses/${grade.course.id}`}>Voir le cours</Link>
                                </Button>
                                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                                    <Link href={`/admin/students/${grade.student.id}/grades/create`}>Ajouter une note</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Métadonnées */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Clock className="h-5 w-5" />
                                Informations
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div>
                                <div className="text-muted-foreground">Note saisie le</div>
                                <div>{new Date(grade.created_at).toLocaleDateString()}</div>
                            </div>
                            <div>
                                <div className="text-muted-foreground">Modifiée le</div>
                                <div>{new Date(grade.updated_at).toLocaleDateString()}</div>
                            </div>
                            <div>
                                <div className="text-muted-foreground">ID</div>
                                <div className="font-mono">#{grade.id}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
