import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MarkdownTextarea } from '@/components/ui/markdown-textarea';
import { Textarea } from '@/components/ui/textarea';
import { SchoolModel } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface SchoolFormForm {
    id: number | null;
    name: string;
    alias: string;
    address: string;
    description: string;
}

interface SchoolFormProps {
    school?: SchoolModel | null;
}

export function SchoolForm({ school }: SchoolFormProps) {
    const { data, setData, post, processing, errors, put } = useForm<Required<SchoolFormForm>>({
        id: school ? school.id : null,
        name: school ? school.name : '',
        alias: school ? school.alias : '',
        address: school ? school.address : '',
        description: school ? school.description : '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        school
            ? put(route('#school.update', { id: school.id }), {
                  preserveScroll: true,
              })
            : post(route('#school.store'), {
                  preserveScroll: true,
              });
    };

    return (
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

                <div>
                    <Button
                        type="submit"
                        className="mt-4 flex items-center justify-center gap-2"
                        tabIndex={3}
                        disabled={processing}
                        aria-disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {processing ? 'Enregistrement en cours...' : 'Sauvegarder et continuer'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
