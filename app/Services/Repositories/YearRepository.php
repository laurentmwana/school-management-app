<?php

namespace App\Services\Repositories;

use App\Models\Year;
use Illuminate\Http\Request;
use Illuminate\Contracts\Pagination\Paginator;
use Spatie\QueryBuilder\QueryBuilder;

class YearRepository
{
    public function getYearSchools(Request $request): Paginator
    {
        $user = $request->user();

        $builder = $this->getQueryForUser($user->id);

        $queryBuilder = QueryBuilder::for($builder)
            ->allowedFilters(['name', 'start', 'end', 'is_closed'])
            ->defaultSorts(['updated_at', 'id', 'is_closed']);

        return $queryBuilder->paginate(4);
    }

    public function getYearSchoolOrFail(Request $request, string $id): Year
    {
        $user = $request->user();

        return $this->getQueryForUser($user->id)
            ->findOrFail($id);
    }


    private function getQueryForUser(int $userId)
    {
        return Year::with(['school'])
            ->whereHas('school', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            });
    }
}
