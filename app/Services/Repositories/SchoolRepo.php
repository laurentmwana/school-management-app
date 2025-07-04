<?php

namespace App\Services\Repositories;

use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Contracts\Pagination\Paginator;

class SchoolRepo
{

    public function getSchoolForUser(Request $request): Paginator
    {
        return School::with(['levels', 'years'])
            ->whereBelongsTo($request->user())
            ->paginate();
    }

    public function getSchoolForUserOrFail(Request $request, string $id): School
    {
        return School::with(['levels', 'years', 'user'])
            ->whereBelongsTo($request->user())
            ->findOrFail($id);
    }
}
