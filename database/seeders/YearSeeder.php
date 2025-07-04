<?php

namespace Database\Seeders;

use App\Models\School;
use App\Models\Year;
use Illuminate\Database\Seeder;

class YearSeeder extends Seeder
{
    private const YEARS = [
        [
            'name' => '2023-2024',
            'start' => '2023-09-01',
            'end' => '2024-06-30',
            'is_closed' => true,
        ],
        [
            'name' => '2024-2025',
            'start' => '2024-09-01',
            'end' => '2025-06-30',
            'is_closed' => false,
        ],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (School::all() as $school) {
            foreach (self::YEARS as $year) {
                Year::create([
                    ...$year,
                    'school_id' => $school->id,
                ]);
            }
        }
    }
}
