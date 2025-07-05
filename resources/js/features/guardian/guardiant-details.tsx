'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { GuardianModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Clock, Edit, GraduationCap, Phone, Trash2, Users } from 'lucide-react';

interface GuardianCardDetailsProps {
    guardian: GuardianModel;
    variant?: 'admin' | 'other';
}

export function GuardianCardDetails({ guardian, variant = 'other' }: GuardianCardDetailsProps) {
    const genderIcon = guardian.gender === 'M' ? '👨' : guardian.gender === 'F' ? '👩' : '👤';
    const genderLabel = guardian.gender === 'M' ? 'Masculin' : guardian.gender === 'F' ? 'Féminin' : 'Non spécifié';

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={variant === 'admin' ? '/admin/guardians' : '/guardians'}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Link>
                    </Button>
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">{genderIcon}</span>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {guardian.firstname} {guardian.name}
                            </h1>
                            <p className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                {guardian.phone}
                            </p>
                        </div>
                    </div>
                </div>

                {variant === 'admin' && (
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={`/admin/guardians/${guardian.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Éditer
                            </Link>
                        </Button>
                        <Button variant="destructive" asChild>
                            <Link href={`/admin/guardians/${guardian.id}/delete`}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
                            </Link>
                        </Button>
                    </div>
                )}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Informations principales */}
                <div className="space-y-6 lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Informations personnelles</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <h4 className="mb-2 font-medium">Nom complet</h4>
                                    <p className="text-muted-foreground">
                                        {guardian.firstname} {guardian.name}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="mb-2 font-medium">Genre</h4>
                                    <div className="flex items-center gap-2">
                                        <span>{genderIcon}</span>
                                        <span className="text-muted-foreground">{genderLabel}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>Téléphone: {guardian.phone}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>
                                    Tuteur de {guardian.students.length} étudiant{guardian.students.length > 1 ? 's' : ''}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* élèves sous tutelle */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Users className="h-5 w-5" />
                                    élèves sous tutelle ({guardian.students.length})
                                </CardTitle>
                                {variant === 'admin' && (
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/guardians/${guardian.id}/students/add`}>Ajouter étudiant</Link>
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {guardian.students.length > 0 ? (
                                <div className="space-y-4">
                                    {guardian.students.map((student) => (
                                        <div key={student.id} className="rounded-lg border p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 font-medium">
                                                        <span>{student.gender === 'M' ? '👨‍🎓' : student.gender === 'F' ? '👩‍🎓' : '🎓'}</span>
                                                        {student.firstname} {student.name}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Né(e) le {new Date(student.birth).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                                        <span className="text-sm">Niveau actuel: {student.actual_level.level.name}</span>
                                                        <Badge variant="outline" className="text-xs">
                                                            {student.actual_level.year.name}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/admin/students/${student.id}`}>Voir</Link>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center text-muted-foreground">
                                    <Users className="mx-auto mb-4 h-12 w-12 opacity-50" />
                                    <p>Aucun élèvesous tutelle</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Actions rapides */}
                    {variant === 'admin' && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Actions rapides</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                                    <Link href={`/admin/guardians/${guardian.id}/students/add`}>Ajouter étudiant</Link>
                                </Button>
                                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                                    <Link href={`/admin/guardians/${guardian.id}/contact`}>Contacter</Link>
                                </Button>
                                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                                    <Link href={`/admin/guardians/${guardian.id}/reports`}>Rapports</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Statistiques */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Statistiques</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{guardian.students.length}</div>
                                <div className="text-sm text-muted-foreground">élèves</div>
                            </div>
                            {guardian.students.length > 0 && (
                                <>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {new Set(guardian.students.map((s) => s.actual_level.level.id)).size}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Niveaux différents</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {new Set(guardian.students.map((s) => s.actual_level.year.id)).size}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Années scolaires</div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

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
                                <div>{new Date(guardian.created_at).toLocaleDateString()}</div>
                            </div>
                            <div>
                                <div className="text-muted-foreground">Modifié le</div>
                                <div>{new Date(guardian.updated_at).toLocaleDateString()}</div>
                            </div>
                            <div>
                                <div className="text-muted-foreground">ID</div>
                                <div className="font-mono">#{guardian.id}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
