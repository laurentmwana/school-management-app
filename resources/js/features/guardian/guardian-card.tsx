'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { GuardianModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Edit, Eye, MoreHorizontal, Phone, Trash2, UserCheck, Users } from 'lucide-react';

interface GuardianCardProps {
    guardian: GuardianModel;
    variant?: 'admin' | 'other';
}

export function GuardianCard({ guardian, variant = 'other' }: GuardianCardProps) {
    const studentsCount = guardian.students.length;
    const genderIcon = guardian.gender === 'M' ? '👨' : guardian.gender === 'F' ? '👩' : '👤';

    return (
        <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-1">
                        <CardTitle className="flex items-center gap-2 text-lg leading-tight">
                            <span>{genderIcon}</span>
                            {guardian.firstname} {guardian.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3" />
                            {guardian.phone}
                        </CardDescription>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                            {studentsCount} étudiant{studentsCount > 1 ? 's' : ''}
                        </Badge>

                        {variant === 'admin' && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/guardians/${guardian.id}`}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            Voir
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/guardians/${guardian.id}/edit`}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Éditer
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/guardians/${guardian.id}/delete`} className="text-destructive focus:text-destructive">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Supprimer
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <UserCheck className="h-4 w-4 shrink-0" />
                        <span>Genre: {guardian.gender === 'M' ? 'Masculin' : guardian.gender === 'F' ? 'Féminin' : 'Non spécifié'}</span>
                    </div>

                    {studentsCount > 0 && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4 shrink-0" />
                            <span>
                                Tuteur de {studentsCount} étudiant{studentsCount > 1 ? 's' : ''}
                            </span>
                        </div>
                    )}
                </div>

                {/* élèves sous tutelle */}
                {guardian.students.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">élèves :</h4>
                        <div className="space-y-1">
                            {guardian.students.slice(0, 3).map((student) => (
                                <div key={student.id} className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>
                                        {student.firstname} {student.name}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                        {student.actual_level.level.name}
                                    </Badge>
                                </div>
                            ))}
                            {guardian.students.length > 3 && (
                                <div className="text-xs text-muted-foreground">+{guardian.students.length - 3} autres</div>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-muted-foreground">Créé le {new Date(guardian.created_at).toLocaleDateString()}</div>

                    <Button variant="outline" size="sm" asChild>
                        <Link href={variant === 'admin' ? `/admin/guardians/${guardian.id}` : `/guardians/${guardian.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir détails
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
