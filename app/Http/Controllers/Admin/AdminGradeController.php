<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\GradeRequest;
use App\Models\Grade;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminGradeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/grade/index');
    }

    public function create()
    {
        return Inertia::render('admin/grade/create');
    }

    public function store(GradeRequest $request): RedirectResponse
    {
        Grade::create($request->validated());

        return redirect()->route('#grade.index')
            ->with('message', 'note créée');
    }


    public function show(string $id): Response
    {
        $grade = Grade::findOrFail($id);

        return Inertia::render('admin/grade/show', [
            'guardian' => $grade
        ]);

    }

    public function edit(string $id): Response
    {
        $grade = Grade::findOrFail($id);

        return Inertia::render('admin/grade/edit', [
            'grade' => $grade
        ]);
    }

    public function update(GradeRequest $request, string $id): RedirectResponse
    {
        $grade = Grade::findOrFail($id);

        $grade->update($request->validated());

        return redirect()->route('#grade.index')
            ->with('message', 'note editée');
    }

    public function destroy(Request $request,  $id)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $grade = Grade::findOrFail($id);

        $grade->delete();

        return redirect()->route('#grade.index')
            ->with('message', 'note supprimée');

    }
}
