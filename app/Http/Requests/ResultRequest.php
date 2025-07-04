<?php

namespace App\Http\Requests;

use App\Enums\PeriodEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class ResultRequest extends FormRequest
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
        return [
            'level_id' => [
                'required',
                'exists:levels,id'
            ],

            'year_id' => [
                'required',
                'exists:years,id'
            ],

            'student_id' => [
                'required',
                'exists:students,id'
            ],

            'period' => [
                'required',
                new Enum(PeriodEnum::class)
            ],

            'percent' => [
                'required'
            ]
        ];
    }
}
