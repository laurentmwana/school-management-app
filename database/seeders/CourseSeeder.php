<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Level;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (Level::all() as $level) {
            $nCourses = random_int(4, 10);

            for ($i=0; $i <  $nCourses; $i++) {
                Course::factory()->create(['level_id' => $level->id]);
            }
        }
    }
}
