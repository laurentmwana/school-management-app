import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StepCardLayout } from '@/layouts/step-layout';
import { UserModel } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface StepSchoolNamesForm {
    name: string;
    alias: string;
}

interface StepSchoolNamesProps {
    step: number;
    user: UserModel;
    dataSession: {
        name?: string;
        alias?: string;
    };
}

export default function StepSchoolNames({ step, user, dataSession }: StepSchoolNamesProps) {
    const { data, setData, post, processing, errors } = useForm<Required<StepSchoolNamesForm>>({
        name: user.school?.name ?? dataSession?.name ?? '',
        alias: user.school?.alias ?? dataSession?.alias ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('step', { step }));
    };

    return (
        <StepCardLayout
            currentStep={2}
            onPrevious={() => router.get(route('step', { step: 1 }))}
            totalSteps={4}
            previousStep={1}
            title="Nom de l’école"
            description="Définissez clairement le nom officiel et l’acronyme de votre établissement pour une identification unique et professionnelle."
        >
            <Head title="Identité de l’école" />

            <form className="flex flex-col gap-6" onSubmit={submit} noValidate>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nom complet de l’école</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="organization"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            aria-describedby="nameHelp"
                            aria-invalid={!!errors.name}
                        />
                        <p id="nameHelp" className="mt-1 text-xs text-muted-foreground">
                            Entrez le nom officiel de votre établissement (ex : Lycée Sainte-Marie).
                        </p>
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="alias">Alias / Acronyme</Label>
                        <Input
                            id="alias"
                            type="text"
                            required
                            tabIndex={2}
                            autoComplete="off"
                            value={data.alias}
                            onChange={(e) => setData('alias', e.target.value)}
                            aria-describedby="aliasHelp"
                            aria-invalid={!!errors.alias}
                        />
                        <p id="aliasHelp" className="mt-1 text-xs text-muted-foreground">
                            Entrez un acronyme court et unique (ex : LSM).
                        </p>
                        <InputError message={errors.alias} />
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
