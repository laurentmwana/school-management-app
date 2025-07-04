<?php

namespace App\Http\Requests;

use App\Rules\UniqueSchoolRule;
use Illuminate\Foundation\Http\FormRequest;

class SchoolRequest extends FormRequest
{
    /**
     * Détermine si l'utilisateur est autorisé à faire cette requête.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Règles de validation pour la création ou modification d'une école.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user = $this->user();
        $id = $this->input('id');

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                (new UniqueSchoolRule($id, $user)),
            ],
            'alias' => [
                'required',
                'string',
                'max:100',
            ],
            'address' => [
                'required',
                'string',
                'max:255',
            ],
            'description' => [
                'required',
                'string',
                'between:30,9000',
            ],
        ];
    }
}
