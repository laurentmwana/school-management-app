<?php

namespace Database\Factories;

use App\Enums\GenderEnum;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name,
            'firstname' => fake()->firstname,
            'gender' => fake()->randomElement(GenderEnum::cases())->value,
            'registration_token' => Str::random(10),
            'birth' => fake()->dateTimeThisYear()
        ];
    }
}
