'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CourseModel, GradeModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Award, BarChart3, BookOpen, Clock, GraduationCap, MapPin } from 'lucide-react';

interface CourseCardDetailsProps {
    course: CourseModel;
    grades?: GradeModel[]; // Notes pour ce cours
    variant?: 'admin' | 'other';
}

export function CourseCardDetails({ course, grades = [], variant = 'other' }: CourseCardDetailsProps) {
    // Calculs statistiques pour les notes
    const totalGrades = grades.length;
    const averageScore = totalGrades > 0 ? grades.reduce((sum, grade) => sum + grade.score, 0) / totalGrades : 0;
    const passedGrades = grades.filter((grade) => grade.score >= 10).length;
    const passRate = totalGrades > 0 ? (passedGrades / totalGrades) * 100 : 0;
    const highestScore = totalGrades > 0 ? Math.max(...grades.map((g) => g.score)) : 0;
    const lowestScore = totalGrades > 0 ? Math.min(...grades.map((g) => g.score)) : 0;

    return (
        <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Informations principales */}
                <div className="space-y-6 lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Informations du cours</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <h4 className="mb-2 font-medium">Nom complet</h4>
                                    <p className="text-muted-foreground">{course.name}</p>
                                </div>
                                <div>
                                    <h4 className="mb-2 font-medium">Alias</h4>
                                    <p className="text-muted-foreground">{course.alias}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Award className="h-4 w-4 text-muted-foreground" />
                                    <span>Crédits: {course.credits}</span>
                                </div>
                                <Badge variant="secondary">
                                    {course.credits} crédit{course.credits > 1 ? 's' : ''}
                                </Badge>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                        Niveau: {course.level.name} ({course.level.alias})
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    <span>Cycle: {course.level.cycle}</span>
                                    {course.level.sub_cycle && (
                                        <>
                                            <span>•</span>
                                            <span>{course.level.sub_cycle}</span>
                                        </>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>École: {course.level.school.name}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Statistiques des notes */}
                    {totalGrades > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <BarChart3 className="h-5 w-5" />
                                    Statistiques des notes ({totalGrades})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                                        <div className="text-2xl font-bold text-primary">{averageScore.toFixed(1)}</div>
                                        <div className="text-sm text-muted-foreground">Moyenne</div>
                                    </div>
                                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                                        <div className="text-2xl font-bold text-green-600">{highestScore}</div>
                                        <div className="text-sm text-muted-foreground">Meilleure note</div>
                                    </div>
                                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                                        <div className="text-2xl font-bold text-red-600">{lowestScore}</div>
                                        <div className="text-sm text-muted-foreground">Note la plus basse</div>
                                    </div>
                                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                                        <div className="text-2xl font-bold text-blue-600">{passRate.toFixed(1)}%</div>
                                        <div className="text-sm text-muted-foreground">Taux de réussite</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Notes récentes */}
                    {grades.length > 0 && (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Notes récentes</CardTitle>
                                    {variant === 'admin' && (
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/admin/courses/${course.id}/grades`}>Voir toutes</Link>
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {grades.slice(0, 5).map((grade) => (
                                        <div key={grade.id} className="flex items-center justify-between rounded-lg border p-3">
                                            <div>
                                                <div className="font-medium">{grade.student.name}</div>
                                                <div className="text-sm text-muted-foreground">{new Date(grade.created_at).toLocaleDateString()}</div>
                                            </div>
                                            <Badge
                                                variant={
                                                    grade.score >= 16
                                                        ? 'default'
                                                        : grade.score >= 14
                                                          ? 'secondary'
                                                          : grade.score >= 10
                                                            ? 'outline'
                                                            : 'destructive'
                                                }
                                            >
                                                {grade.score}/20
                                            </Badge>
                                        </div>
                                    ))}
                                    {grades.length > 5 && (
                                        <div className="text-center">
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/admin/courses/${course.id}/grades`}>Voir {grades.length - 5} autres notes</Link>
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
                    {/* Niveau associé */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <GraduationCap className="h-5 w-5" />
                                Niveau
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <div className="font-medium">{course.level.name}</div>
                                <div className="text-sm text-muted-foreground">{course.level.alias}</div>
                            </div>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="text-xs">
                                    {course.level.cycle}
                                </Badge>
                                {course.level.sub_cycle && (
                                    <Badge variant="secondary" className="text-xs">
                                        {course.level.sub_cycle}
                                    </Badge>
                                )}
                            </div>
                            {variant === 'admin' && (
                                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                                    <Link href={`/admin/levels/${course.level.id}`}>Voir le niveau</Link>
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
                                    <Link href={`/admin/courses/${course.id}/grades/create`}>Ajouter une note</Link>
                                </Button>
                                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                                    <Link href={`/admin/courses/${course.id}/students`}>Voir les élèves</Link>
                                </Button>
                                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                                    <Link href={`/admin/courses/${course.id}/export`}>Exporter les notes</Link>
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
                                <div className="text-muted-foreground">Créé le</div>
                                <div>{new Date(course.created_at).toLocaleDateString()}</div>
                            </div>
                            <div>
                                <div className="text-muted-foreground">Modifié le</div>
                                <div>{new Date(course.updated_at).toLocaleDateString()}</div>
                            </div>
                            <div>
                                <div className="text-muted-foreground">ID</div>
                                <div className="font-mono">#{course.id}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
