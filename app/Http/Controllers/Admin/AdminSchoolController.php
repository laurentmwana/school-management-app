<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SchoolRequest;
use App\Models\School;
use App\Services\Repositories\SchoolRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminSchoolController extends Controller
{
    public function __construct(private SchoolRepository $repository) {}

    public function index(Request $request): Response
    {
        $schools = $this->repository->getSchoolForUser($request);

        return Inertia::render('admin/school/index', [
            'schools' => $schools,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/school/create');
    }

    public function store(SchoolRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['description'] = Str::markdown($validated['description']);
        $validated['user_id'] = $request->user()->id;

        School::create($validated);

        return redirect()->route('#school.index')
            ->with('message', 'École créée avec succès.');
    }

    public function show(Request $request, string $id): Response
    {
        $school = $this->repository->getSchoolForUserOrFail($request, $id);

        $this->authorize('view', $school);

        return Inertia::render('admin/school/show', [
            'school' => $school,
        ]);
    }

    public function edit(string $id): Response
    {
        $school = School::findOrFail($id);

        $this->authorize('update', $school);

        return Inertia::render('admin/school/edit', [
            'school' => $school,
        ]);
    }

    public function update(SchoolRequest $request, string $id): RedirectResponse
    {
        $school = School::findOrFail($id);

        $this->authorize('update', $school);

        $validated = $request->validated();
        $validated['description'] = Str::markdown($validated['description']);

        $school->update($validated);

        return redirect()->route('#school.index')
            ->with('message', 'École modifiée avec succès.');
    }

    public function destroy(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $school = School::findOrFail($id);

        $this->authorize('delete', $school);

        $school->delete();

        return redirect()->route('#school.index')
            ->with('message', 'École supprimée avec succès.');
    }
}
