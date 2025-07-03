<?php

namespace Database\Seeders;

use App\Enums\RoleUserEnum;
use App\Models\Guardian;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;

class GuardianSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(12)->create([
            'role' => RoleUserEnum::PARENT->value
        ])->each(function (User $user) {
             Guardian::factory()->create([
                'user_id' => $user->id,
             ]);
        });

        foreach (Student::all() as $student) {
            $guardianIds = [];
            for ($i=0; $i < 2 ; $i++) {
                $guardianIds[] = Guardian::all()->random()->id;
            }
            $student->guardians()->sync($guardianIds);
        }
    }
}
