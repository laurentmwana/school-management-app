'use client';

import { ConfirmationPasswordDialog } from '@/components/dialog-confirmation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { SchoolModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Calendar, Edit, Eye, GraduationCap, MapPin, MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface SchoolCardProps {
    school: SchoolModel;
    variant?: 'admin' | 'other';
}

export function SchoolCard({ school, variant = 'other' }: SchoolCardProps) {
    const currentYear = school.years.find((year) => !year.is_closed);
    const activeLevelsCount = school.levels.length;
    const [openModal, setModalOpen] = useState<boolean>(false);

    return (
        <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-1">
                        <CardTitle className="text-lg leading-tight">{school.name}</CardTitle>
                        <CardDescription className="text-sm">
                            <span className="font-medium">{school.alias}</span>
                        </CardDescription>
                    </div>

                    {variant === 'admin' && (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/school/${school.id}`}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            Voir
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/school/${school.id}/edit`}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Éditer
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setModalOpen(true)}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        <span>Supprimer</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <ConfirmationPasswordDialog url={route('#school.destroy', { id: school.id })} open={openModal} setOpen={setModalOpen} />
                        </>
                    )}
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="truncate">{school.address}</span>
                    </div>

                    {currentYear && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>Année: {currentYear.name}</span>
                            <Badge variant={currentYear.is_closed ? 'secondary' : 'default'} className="text-xs">
                                {currentYear.is_closed ? 'Fermée' : 'Active'}
                            </Badge>
                        </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="h-4 w-4 shrink-0" />
                        <span>
                            {activeLevelsCount} niveau{activeLevelsCount > 1 ? 'x' : ''}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-muted-foreground">Créé le {new Date(school.created_at).toLocaleDateString()}</div>

                    <Button variant="outline" size="sm" asChild>
                        <Link href={variant === 'admin' ? `/admin/school/${school.id}` : `/school/${school.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir détails
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
