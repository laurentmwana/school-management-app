<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CourseRequest;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminCourseController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/course/index');
    }

    public function create()
    {
        return Inertia::render('admin/course/create');
    }

    public function store(CourseRequest $request): RedirectResponse
    {

        Course::create($request->validated());

        return redirect()->route('#course.index')
            ->with('message', 'cours créé');
    }


    public function show(string $id): Response
    {
        $course = Course::findOrFail($id);

        return Inertia::render('admin/course/show', [
            'course' => $course
        ]);

    }

    public function edit(string $id): Response
    {
        $course = Course::findOrFail($id);

        return Inertia::render('admin/course/edit', [
            'course' => $course
        ]);
    }

    public function update(CourseRequest $request, string $id): RedirectResponse
    {
        $course = Course::findOrFail($id);

        $course->update($request->validated());

        return redirect()->route('#course.index')
            ->with('message', 'cours edité');
    }

    public function destroy(Request $request,  $id)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $course = Course::findOrFail($id);

        $course->delete();

        return redirect()->route('#course.index')
            ->with('message', 'cours supprimé');

    }
}
