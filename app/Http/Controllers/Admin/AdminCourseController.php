<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CourseRequest;
use App\Models\Course;
use App\Services\Repositories\CourseRepo;
use App\Services\Repositories\LevelRepo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminCourseController extends Controller
{
    public function __construct(private CourseRepo $courseRepo, private LevelRepo $levelRepo) {}

    public function index(Request $request): Response
    {
        $courses = $this->courseRepo->getCourseSchools($request);

        return Inertia::render('admin/course/index', [
            'courses' => $courses
        ]);
    }

    public function create(Request $request)
    {
        $user = $request->user();

        $levels = $this->levelRepo->getAll($user->id);

        return Inertia::render('admin/course/create', [
            'levels' => $levels
        ]);
    }

    public function store(CourseRequest $request): RedirectResponse
    {

        Course::create($request->validated());

        return redirect()->route('#course.index')
            ->with('message', 'cours créé');
    }


    public function show(Request $request,  $id): Response
    {
        $course = $this->courseRepo->getCourseSchoolOrFail($request, $id);

        return Inertia::render('admin/course/show', [
            'course' => $course
        ]);

    }

    public function edit(Request $request,  $id): Response
    {
        $user  = $request->user();

        $levels = $this->levelRepo->getAll($user->id);

        $course = Course::findOrFail($id);

        return Inertia::render('admin/course/edit', [
            'course' => $course,
            'levels' => $levels
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
