import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectSingle } from '@/components/ui/select-single';
import { LevelModel, StudentModel, YearModel } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface StudentFormForm {
    id: number | null;
    name: string;
    firstname: string;
    gender: string;
    birth: string;
    level_id: string;
    year_id: string;
}

interface StudentFormProps {
    student?: StudentModel | null;
    levels: LevelModel[];
    years: YearModel[];
}

export function StudentForm({ student, levels, years }: StudentFormProps) {
    const { data, setData, post, processing, errors, put } = useForm<Required<StudentFormForm>>({
        id: student ? student.id : null,
        name: student ? student.name : '',
        firstname: student ? student.firstname : '',
        gender: student ? student.gender : '',
        birth: student ? student.birth : '',
        level_id: student ? String(student.actual_level.level_id) : '',
        year_id: student ? String(student.actual_level.year_id) : '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (student) {
            put(route('#student.update', { id: student.id }), {
                preserveScroll: true,
            });
        } else {
            post(route('#student.store'), {
                preserveScroll: true,
            });
        }
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={submit} noValidate>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="firstname">Prénom</Label>
                    <Input
                        id="firstname"
                        type="text"
                        required
                        autoFocus
                        value={data.firstname}
                        onChange={(e) => setData('firstname', e.target.value)}
                        aria-invalid={!!errors.firstname}
                    />
                    <InputError message={errors.firstname} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input
                        id="name"
                        type="text"
                        required
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        aria-invalid={!!errors.name}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="gender">Sexe</Label>
                    <SelectSingle
                        value={data.gender}
                        placeholder="Sélectionner le sexe"
                        onChange={(value) => setData('gender', value)}
                        options={[
                            { label: 'Masculin', value: 'masculin' },
                            { label: 'Féminin', value: 'féminin' },
                        ]}
                    />
                    <InputError message={errors.gender} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="birth">Date de naissance</Label>
                    <Input
                        id="birth"
                        type="date"
                        required
                        value={data.birth}
                        onChange={(e) => setData('birth', e.target.value)}
                        aria-invalid={!!errors.birth}
                    />
                    <InputError message={errors.birth} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="level_id">Classe</Label>
                    <SelectSingle
                        value={data.level_id}
                        placeholder="Sélectionner une classe"
                        onChange={(value) => setData('level_id', value)}
                        options={levels.map((level) => ({
                            label: level.name,
                            value: level.id.toString(),
                            group: level.cycle,
                        }))}
                    />
                    <InputError message={errors.level_id} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="year_id">Année scolaire</Label>
                    <SelectSingle
                        value={data.year_id}
                        placeholder="Sélectionner une année scolaire"
                        onChange={(value) => setData('year_id', value)}
                        options={years.map((year) => ({
                            label: year.name,
                            value: year.id.toString(),
                            group: year.is_closed ? 'Cloturée' : 'Actuelle',
                        }))}
                    />
                    <InputError message={errors.year_id} />
                </div>

                <div>
                    <Button type="submit" className="mt-4 flex items-center justify-center gap-2" disabled={processing} aria-disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {processing ? 'Enregistrement en cours...' : 'Sauvegarder'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
