<?php

namespace Database\Seeders;

use App\Enums\PeriodEnum;
use App\Models\Course;
use App\Models\Grade;
use App\Models\Result;
use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ResultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (Student::with(['actualLevel'])->get() as $student) {
            $file = Str::random() . '.pdf';

            foreach (PeriodEnum::cases() as $enum) {
                $percent = random_int(40, 70);
                Result::create([
                    'student_id' => $student->id,
                    'level_id' => $student->actualLevel->level_id,
                    'year_id' => $student->actualLevel->year_id,
                    'period' => $enum->value,
                    'file' => $file,
                    'percent' => $percent
                ]);
            }
        }
    }
}
