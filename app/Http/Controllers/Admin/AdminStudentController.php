<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StudentRequest;
use App\Models\Student;
use App\Services\Repositories\LevelRepo;
use App\Services\Repositories\StudentRepo;
use App\Services\Repositories\YearRepo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminStudentController extends Controller
{
    public function __construct(
        private StudentRepo $studentRepo,
        private LevelRepo $levelRepo,
        private YearRepo $yearRepo
    ) {}

    public function index(Request $request): Response
    {
        $students = $this->studentRepo->getStudentsSchools($request);

        return Inertia::render('admin/student/index', [
            'students' => $students
        ]);
    }

    public function create(Request $request)
    {
        $user = $request->user();

        $levels = $this->levelRepo->getAll($user->id);
        $years = $this->yearRepo->getAll($user->id);

        return Inertia::render('admin/student/create', [
            'levels' => $levels,
            'years' => $years,
        ]);
    }

    public function store(StudentRequest $request): RedirectResponse
    {
        $user = $request->user();

        $student = Student::create([
            ...$request->validated(),
            'registration_token' => Str::random(10),
            'school_id' => $user->school->id,
         ]);

        $student->actualLevel()->create([
            'year_id' => $request->validated('year_id'),
            'level_id' => $request->validated('level_id'),
        ]);

        return redirect()->route('#student.index')
            ->with('message', 'élève créé');
    }


    public function show(Request $request, string $id): Response
    {
        $student = $this->studentRepo->getStudentSchoolOrFail($request, $id);

        return Inertia::render('admin/student/show', [
            'student' => $student
        ]);

    }

    public function edit(Request $request, string $id): Response
    {
        $user  =$request->user();

        $levels = $this->levelRepo->getAll($user->id);
        $years = $this->yearRepo->getAll($user->id);

        $student = $this->studentRepo->getStudentSchoolOrFail($request, $id);

        return Inertia::render('admin/student/edit', [
            'student' => $student,
            'levels' => $levels,
            'years' => $years,
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
