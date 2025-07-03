<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SchoolRequest;
use App\Models\School;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminSchoolController extends Controller
{

    public function index(): Response
    {
        return Inertia::render('admin/school/index');
    }

    public function create()
    {
        return Inertia::render('admin/school/create');
    }

    public function store(SchoolRequest $request): RedirectResponse
    {
        $user = $request->user();

        School::create([
            ...$request->validated(),
            'user_id' => $user->id,
        ]);

        return redirect()->route('#school.index')
            ->with('message', 'école créée');
    }


    public function show(string $id): Response
    {
        $school = School::findOrFail($id);

        return Inertia::render('admin/school/show', [
            'school' => $school
        ]);

    }

    public function edit(string $id): Response
    {
        $school = School::findOrFail($id);

        return Inertia::render('admin/school/edit', [
            'school' => $school
        ]);
    }

    public function update(SchoolRequest $request, string $id): RedirectResponse
    {
        $school = School::findOrFail($id);

        $school->update($request->validated());

        return redirect()->route('#school.index')
            ->with('message', 'école editée');
    }

    public function destroy(Request $request,  $id)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $school = School::findOrFail($id);

        $school->delete();

        return redirect()->route('#school.index')
            ->with('message', 'école supprimée');

    }
}
