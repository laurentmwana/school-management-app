<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Grade;
use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (Student::with(['actualLevel'])->get() as $student) {

            $courses = Course::where('level_id', '=', $student->actualLevel->level_id)
                ->get();
                foreach ($courses as $course) {
                    Grade::factory()->create([
                    'student_id' => $student->id,
                    'level_id' => $student->actualLevel->level_id,
                    'year_id' => $student->actualLevel->year_id,
                    'course_id' => $course->id,
                ]);
            }

        }
    }
}
