import { Button } from '@/components/ui/button';
import { StepCardLayout } from '@/layouts/step-layout';

import { UserModel } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Grid } from 'lucide-react';

interface StepIdentityProps {
    step: number;
    user: UserModel;
}

export default function StepFinish({ step }: StepIdentityProps) {
    const { post, processing } = useForm();

    const onFinish = () => {
        post(route('step', { step }));
    };

    return (
        <StepCardLayout
            currentStep={7}
            onPrevious={() => router.get(route('step', { step: 6 }))}
            previousStep={6}
            totalSteps={7}
            title="Félicitations 🎉"
            description="Votre école a été configurée avec succès. Vous pouvez maintenant accéder à votre tableau de bord pour gérer les promotions, les années académiques, les étudiants et bien plus encore."
        >
            <Head title="Félicitations" />

            <Button className="w-full" size="lg" onClick={onFinish} disabled={processing} aria-disabled={processing}>
                {processing ? (
                    'Finalisation...'
                ) : (
                    <div className="flex items-center justify-center gap-2">
                        Accéder au tableau de bord
                        <Grid className="h-4 w-4" />
                    </div>
                )}
            </Button>
        </StepCardLayout>
    );
}
