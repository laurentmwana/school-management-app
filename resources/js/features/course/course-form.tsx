import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectSingle } from '@/components/ui/select-single';
import { CourseModel, LevelModel } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface CourseFormForm {
    id: number | null;
    name: string;
    alias: string;
    credits: number;
    level_id: string;
}

interface CourseFormProps {
    course?: CourseModel | null;
    levels: LevelModel[];
}

export function CourseForm({ course, levels }: CourseFormProps) {
    const { data, setData, post, processing, errors, put } = useForm<Required<CourseFormForm>>({
        id: course ? course.id : null,
        name: course ? course.name : '',
        alias: course ? course.alias : '',
        credits: course ? course.credits : 0,
        level_id: course ? String(course.level_id) : '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (course) {
            put(route('#course.update', { id: course.id }), {
                preserveScroll: true,
            });
        } else {
            post(route('#course.store'), {
                preserveScroll: true,
            });
        }
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={submit} noValidate>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nom du cours</Label>
                    <Input
                        id="name"
                        type="text"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="off"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        aria-describedby="nameHelp"
                        aria-invalid={!!errors.name}
                    />
                    <p id="nameHelp" className="mt-1 text-xs text-muted-foreground">
                        Entrez le nom complet du cours (ex : Mathématiques Avancées).
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
                        Entrez un acronyme court et unique (ex : MATH_ADV).
                    </p>
                    <InputError message={errors.alias} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="credits">Crédits</Label>
                    <Input
                        id="credits"
                        type="number"
                        required
                        min={0}
                        tabIndex={3}
                        autoComplete="off"
                        value={data.credits}
                        onChange={(e) => setData('credits', Number(e.target.value))}
                        aria-describedby="creditsHelp"
                        aria-invalid={!!errors.credits}
                    />
                    <p id="creditsHelp" className="mt-1 text-xs text-muted-foreground">
                        Entrez le nombre de crédits pour ce cours.
                    </p>
                    <InputError message={errors.credits} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="level_id">Classe</Label>
                    <SelectSingle
                        value={data.level_id}
                        placeholder="Selectionner une classe"
                        onChange={(v) => setData('level_id', v)}
                        options={levels.map((l) => {
                            return {
                                label: l.name,
                                group: l.cycle,
                                value: l.id.toString(),
                            };
                        })}
                    />
                    <InputError message={errors.level_id} />
                </div>

                <div>
                    <Button
                        type="submit"
                        className="mt-4 flex items-center justify-center gap-2"
                        tabIndex={5}
                        disabled={processing}
                        aria-disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {processing ? 'Enregistrement en cours...' : 'Sauvegarder'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
