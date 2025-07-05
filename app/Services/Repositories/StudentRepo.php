<?php

namespace App\Services\Repositories;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Contracts\Pagination\Paginator;
use Spatie\QueryBuilder\QueryBuilder;

class StudentRepo
{
    private const STUDENT_RELATIONS = [
        'actualLevel',
        'guardians',
        'actualLevel.level',
        'actualLevel.year',
        'historicLevels',
        'historicLevels.level',
        'historicLevels.year',
    ];

    public function getStudentsSchools(Request $request): Paginator
    {
        $user = $request->user();

        $builder = $this->getQueryForUser($user->id);

        return QueryBuilder::for($builder)
            ->allowedFilters(['name', 'firstname', 'gender'])
            ->defaultSorts(['updated_at', 'id', 'created_at'])
            ->paginate(4);
    }

    public function getStudentSchoolOrFail(Request $request, string $id): Student
    {
        $user = $request->user();

        return $this->getQueryForUser($user->id)->findOrFail($id);
    }

    private function getQueryForUser(int $userId)
    {
        return Student::with(self::STUDENT_RELATIONS)
            ->whereHas('school', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            });
    }
}
