<?php

namespace Database\Seeders;

use App\Models\ActualLevel;
use App\Models\School;
use App\Models\Student;
use App\Models\Year;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $years = Year::all(); // On récupère toutes les années une seule fois

        foreach (School::with('levels')->get() as $school) {
            foreach ($school->levels as $level) {
                for ($i = 0; $i < 5; $i++) {
                    $student = Student::factory()->create([
                        'school_id' => $school->id,
                    ]);

                    $studentYears = $years->shuffle()->take(random_int(2, 3));

                    foreach ($studentYears as $year) {
                        ActualLevel::create([
                            'student_id' => $student->id,
                            'year_id' => $year->id,
                            'level_id' => $level->id,
                        ]);
                    }
                }
            }
        }
    }
}
