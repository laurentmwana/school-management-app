<?php

namespace App\Services\Repositories;

use App\Models\Course;
use App\Models\Level;
use Illuminate\Http\Request;
use Illuminate\Contracts\Pagination\Paginator;
use Spatie\QueryBuilder\QueryBuilder;

class CourseRepo
{
    public function getCourseSchools(Request $request): Paginator
    {
        $user = $request->user();

        $builder = $this->getQueryForUser($user->id);

        return QueryBuilder::for($builder)
            ->allowedFilters(['name', 'alias', 'credits'])
            ->defaultSorts(['updated_at', 'id', 'created_at'])
            ->paginate(4);
    }

    public function getCourseSchoolOrFail(Request $request, string $id): Course
    {
        $user = $request->user();

        return $this->getQueryForUser($user->id)->findOrFail($id);
    }

    private function getQueryForUser(int $userId)
    {
        return Course::with(['level', 'level.school'])
            ->whereHas('level.school', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            });
    }
}
