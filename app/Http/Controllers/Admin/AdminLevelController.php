<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Repositories\LevelRepo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminLevelController extends Controller
{
    public function __construct(private LevelRepo $repository) {}

    public function index(Request $request): Response
    {
        $levels = $this->repository->getLevelSchools($request);

        return Inertia::render('admin/level/index', [
            'levels' => $levels
        ]);
    }
    public function show(Request $request, string $id): Response
    {
       $level = $this->repository->getLevelSchoolOrFail($request, $id);

        return Inertia::render('admin/level/show', [
            'level' =>$level
        ]);

    }
}
