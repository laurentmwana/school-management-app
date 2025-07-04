<?php

namespace App\Services\Repositories;

use App\Models\Level;
use Illuminate\Http\Request;
use Illuminate\Contracts\Pagination\Paginator;
use Spatie\QueryBuilder\QueryBuilder;

class CourseRepo
{
    public function getCourseeSchools(Request $request): Paginator
    {
        $user = $request->user();

        $builder = $this->getQueryForUser($user->id);

        $queryBuilder = QueryBuilder::for($builder)
            ->allowedFilters(['name', 'alias', 'cycle', 'sub_cycle'])
            ->defaultSorts(['updated_at', 'id', 'created_at']);

        return $queryBuilder->paginate(4);
    }

    public function getLevelSchoolOrFail(Request $request, string $id): Level
    {
        $user = $request->user();

        return $this->getQueryForUser($user->id)
            ->findOrFail($id);
    }


    private function getQueryForUser(int $userId)
    {
        return Level::with(['school'])
            ->whereHas('school', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            });
    }
}
