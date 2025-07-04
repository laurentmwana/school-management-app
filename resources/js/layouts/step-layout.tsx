'use client';

import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import type { PropsWithChildren } from 'react';

export const StepCardLayout = ({
    children,
    title,
    description,
    currentStep,
    totalSteps,
    previousStep,
    onPrevious,
    className
}: PropsWithChildren<{
    title?: string;
    description?: string;
    currentStep: number;
    totalSteps: number;
    previousStep?: number;
    className?: string
    onPrevious?: () => void;
}>) => {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-4">
            <div className={cn("w-full max-w-md space-y-4", className)}>
                {/* Logo */}
                <Link href={route('home')} className="flex items-center justify-center">
                    <div className="flex h-8 w-8 items-center justify-center">
                        <AppLogoIcon className="size-8" />
                    </div>
                </Link>

                {/* Step Progress */}
                <div className="flex items-center justify-between">
                    {previousStep && onPrevious ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onPrevious}
                            className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                        >
                            <ChevronLeft className="size-4" />
                            Retour
                        </Button>
                    ) : (
                        <div />
                    )}
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalSteps }, (_, i) => (
                            <div key={i} className={`h-2 w-2 rounded-full transition-colors ${i + 1 <= currentStep ? 'bg-primary' : 'bg-muted'}`} />
                        ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {currentStep}/{totalSteps}
                    </div>
                </div>

                {/* Main Card */}
                <Card>
                    <CardHeader className="pb-4 text-center">
                        <CardTitle className="text-xl">{title}</CardTitle>
                        {description && <CardDescription>{description}</CardDescription>}
                    </CardHeader>
                    <CardContent className="pt-0">{children}</CardContent>
                </Card>
            </div>
        </div>
    );
};
