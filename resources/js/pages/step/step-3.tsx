import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MarkdownTextarea } from '@/components/ui/markdown-textarea';
import { Textarea } from '@/components/ui/textarea';
import { StepCardLayout } from '@/layouts/step-layout';
import { UserModel } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface StepSchoolNamesForm {
    address: string;
    description: string;
}

interface StepSchoolNamesProps {
    step: number;
    user: UserModel;
    dataSession: {
        address?: string;
        description?: string;
    };
}

export default function StepSchoolNames({ step, user, dataSession }: StepSchoolNamesProps) {
    const { data, setData, post, processing, errors } = useForm<Required<StepSchoolNamesForm>>({
        address: user.schools[0]?.address ?? dataSession?.address ?? '',
        description: user.schools[0]?.description ?? dataSession?.description ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('step', { step }));

        console.log(errors);
    };

    return (
        <StepCardLayout
            className="max-w-2xl"
            currentStep={3}
            onPrevious={() => router.get(route('step', { step: 2 }))}
            totalSteps={4}
            previousStep={2}
            title="Adresse & Description"
            description="Précisez l’adresse physique de votre établissement ainsi qu’une brève description pour mieux le présenter."
        >
            <Head title="Adresse & Description" />

            <form className="flex flex-col gap-6" onSubmit={submit} noValidate>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="address">Adresse de l’école</Label>
                        <Textarea
                            id="address"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="street-address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            aria-describedby="addressHelp"
                            aria-invalid={!!errors.address}
                        />
                        <p id="addressHelp" className="mt-1 text-xs text-muted-foreground">
                            Ex : 123 Avenue des écoles, Quartier Campus, Ville.
                        </p>
                        <InputError message={errors.address} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <MarkdownTextarea
                            id="description"
                            defaultValue={data.description}
                            onChange={(e) => setData('description', e)}
                            placeholder="Décrivez brièvement l’école, sa mission, ses valeurs ou ses particularités."
                        />
                        <InputError message={errors.description} />
                    </div>

                    <Button
                        type="submit"
                        className="mt-4 flex w-full items-center justify-center gap-2"
                        tabIndex={3}
                        disabled={processing}
                        aria-disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {processing ? 'Enregistrement en cours...' : 'Sauvegarder et continuer'}
                    </Button>
                </div>
            </form>
        </StepCardLayout>
    );
}
