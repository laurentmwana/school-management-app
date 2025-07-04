'use client';

import { ConfirmationPasswordDialog } from '@/components/dialog-confirmation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { YearModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Calendar, Eye, Minus, MoreHorizontal, School } from 'lucide-react';
import { useState } from 'react';

interface YearDetailsProps {
    year: YearModel;
    variant?: 'admin' | 'other';
}

export function YearDetails({ year, variant = 'other' }: YearDetailsProps) {
    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-1">
                        <CardTitle className="text-lg leading-tight">{year.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-sm">
                            <School className="h-3 w-3" />
                            {year.school.name}
                        </CardDescription>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge variant={year.is_closed ? 'secondary' : 'default'} className="text-xs">
                            {year.is_closed ? 'Fermée' : 'Active'}
                        </Badge>

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
                                        {year.is_closed ? (
                                            <DropdownMenuItem asChild>
                                                <Link href={`/admin/year/${year.id}`}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Voir
                                                </Link>
                                            </DropdownMenuItem>
                                        ) : (
                                            <DropdownMenuItem onClick={() => setOpenModal(true)}>
                                                <Minus className="mr-2 h-4 w-4" />
                                                Cloturer
                                            </DropdownMenuItem>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <ConfirmationPasswordDialog url={route('#year.closed', { id: year.id })} open={openModal} setOpen={setOpenModal} />
                            </>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span>{year.name}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-muted-foreground">Créé le {new Date(year.created_at).toLocaleDateString()}</div>
                </div>
            </CardContent>
        </Card>
    );
}
