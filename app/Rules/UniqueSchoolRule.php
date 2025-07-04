<?php

namespace App\Rules;

use App\Models\School;
use App\Models\User;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class UniqueSchoolRule implements ValidationRule
{
    public function __construct(
        private ?string $schoolId,
        private ?User $user
    ) {}

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, string): void  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! $this->user instanceof User) {
            return;
        }

        $exists = School::where('user_id', $this->user->id)
            ->where('name', $value)
            ->when($this->schoolId, fn ($query) => $query->where('id', '!=', $this->schoolId))
            ->exists();

        if ($exists) {
            $fail("Une école avec ce nom existe déjà.");
        }
    }
}
