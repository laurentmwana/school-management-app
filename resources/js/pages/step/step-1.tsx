import { Button } from '@/components/ui/button';
import { StepCardLayout } from '@/layouts/step-layout';

import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function StepWelcome() {
    return (
        <StepCardLayout
            title="Bienvenue sur School Management"
            description="Créez et gérez facilement votre école en ligne. Organisez les promotions, les années académiques, les étudiants et bien plus encore en quelques étapes simples."
            totalSteps={4}
            currentStep={1}
        >
            <Head title="Bienvenue" />

            <Button className="w-full" size="lg" asChild>
                <Link href={route('step', { step: 2 })} className="flex items-center justify-center gap-2">
                    Commencer
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </Button>
        </StepCardLayout>
    );
}
