<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GradeRequest extends FormRequest
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
            'course_id' => [
                'required',
                'exists:courses,id'
            ],
            'year_id' => [
                'required',
                'exists:years,id'
            ],
            'student_id' => [
                'required',
                'exists:levels,id'
            ],

            'score' => [
                'required',
                'numeric',
                'between:0,20'
            ]
        ];
    }
}
