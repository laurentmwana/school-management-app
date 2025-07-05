'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { LevelModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Eye, GraduationCap, School } from 'lucide-react';

interface LevelCardProps {
    level: LevelModel;
    variant?: 'admin' | 'other';
}

export function LevelCard({ level, variant = 'other' }: LevelCardProps) {
    return (
        <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-1">
                        <CardTitle className="text-lg leading-tight">{level.name}</CardTitle>
                        <CardDescription className="text-sm">
                            <span className="font-medium">{level.alias}</span>
                        </CardDescription>
                        <CardDescription className="flex items-center gap-2 text-sm">
                            <School className="h-3 w-3" />
                            {level.school.name}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <div className="flex gap-2">
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
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-muted-foreground">Créé le {new Date(level.created_at).toLocaleDateString()}</div>

                    <Button variant="outline" size="sm" asChild>
                        <Link href={variant === 'admin' ? `/admin/level/${level.id}` : `/levels/${level.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir détails
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
