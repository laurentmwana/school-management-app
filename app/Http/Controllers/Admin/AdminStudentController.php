<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StudentRequest;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminStudentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/student/index');
    }

    public function create()
    {
        return Inertia::render('admin/student/create');
    }

    public function store(StudentRequest $request): RedirectResponse
    {

        $student = Student::create([
            ...$request->validated(),
            'registration_token' => Str::random(10),
         ]);

        $student->actualLevel()->create([
            'year_id' => $request->validated('year_id'),
            'level_id' => $request->validated('level_id'),
        ]);

        return redirect()->route('#student.index')
            ->with('message', 'élève créé');
    }


    public function show(string $id): Response
    {
        $student = Student::findOrFail($id);

        return Inertia::render('admin/student/show', [
            'student' => $student
        ]);

    }

    public function edit(string $id): Response
    {
        $student = Student::findOrFail($id);

        return Inertia::render('admin/student/edit', [
            'student' => $student
        ]);
    }

    public function update(StudentRequest $request, string $id): RedirectResponse
    {
        $student = Student::findOrFail($id);

        $student->update($request->validated());

        $student->actualLevel()->create([
            'year_id' => $request->validated('year_id'),
            'level_id' => $request->validated('level_id'),
        ]);

        return redirect()->route('#student.index')
            ->with('message', 'élève edité');
    }

    public function destroy(Request $request,  $id): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $student = Student::findOrFail($id);

        $student->delete();

        return redirect()->route('#student.index')
            ->with('message', 'élève supprimé');

    }
}
