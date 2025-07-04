'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { SchoolModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Calendar, Clock, GraduationCap, MapPin } from 'lucide-react';

interface SchoolCardDetailsProps {
    school: SchoolModel;
    variant?: 'admin' | 'other';
}

export function SchoolCardDetails({ school, variant = 'other' }: SchoolCardDetailsProps) {
    const currentYear = school.years.find((year) => !year.is_closed);
    const closedYears = school.years.filter((year) => year.is_closed);

    return (
        <div className="space-y-6">
            {/* Header */}

            <div className="w-full">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">{school.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{school.address}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Separator className='mb-4' />
                        <div className="prose w-full prose-stone" dangerouslySetInnerHTML={{ __html: school.description }}></div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Informations principales */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Niveaux */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <GraduationCap className="h-5 w-5" />
                                    Niveaux ({school.levels.length})
                                </CardTitle>
                                {variant === 'admin' && (
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/school/${school.id}/levels`}>Voir tous</Link>
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {school.levels.slice(0, 4).map((level) => (
                                    <div key={level.id} className="rounded-lg border p-3">
                                        <div className="font-medium">{level.name}</div>
                                        <div className="text-sm text-muted-foreground">{level.alias}</div>
                                        <div className="mt-2 flex gap-2">
                                            <Badge variant="outline" className="text-xs">
                                                {level.cycle}
                                            </Badge>
                                            {level.sub_cycle && (
                                                <Badge variant="secondary" className="text-xs">
                                                    {level.sub_cycle}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {school.levels.length > 4 && (
                                <div className="mt-4 text-center">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/admin/school/${school.id}/levels`}>Voir {school.levels.length - 4} autres niveaux</Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Année actuelle */}
                    {currentYear && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Calendar className="h-5 w-5" />
                                    Année actuelle
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div>
                                        <div className="font-medium">{currentYear.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {new Date(currentYear.start).toLocaleDateString()} - {new Date(currentYear.end).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <Badge variant="default">Active</Badge>
                                    {variant === 'admin' && (
                                        <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                                            <Link href={`/admin/school/${school.id}/years/${currentYear.id}`}>Gérer l'année</Link>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Années précédentes */}
                    {closedYears.length > 0 && (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Années précédentes</CardTitle>
                                    {variant === 'admin' && (
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/admin/school/${school.id}/years`}>Voir toutes</Link>
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {closedYears.slice(0, 3).map((year) => (
                                        <div key={year.id} className="flex items-center justify-between text-sm">
                                            <span>{year.name}</span>
                                            <Badge variant="secondary" className="text-xs">
                                                Fermée
                                            </Badge>
                                        </div>
                                    ))}
                                    {closedYears.length > 3 && (
                                        <div className="text-xs text-muted-foreground">+{closedYears.length - 3} autres années</div>
                                    )}
                                </div>
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
                                <div>{new Date(school.created_at).toLocaleDateString()}</div>
                            </div>
                            <div>
                                <div className="text-muted-foreground">Modifié le</div>
                                <div>{new Date(school.updated_at).toLocaleDateString()}</div>
                            </div>
                            <div>
                                <div className="text-muted-foreground">ID</div>
                                <div className="font-mono">#{school.id}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
