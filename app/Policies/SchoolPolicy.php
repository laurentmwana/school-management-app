<?php

namespace App\Policies;

use App\Enums\RoleUserEnum;
use App\Models\School;
use App\Models\User;

class SchoolPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, School $school): bool
    {
        return $this->isOwner($user, $school);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $this->isOwner($user);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, School $school): bool
    {
        return $this->isOwner($user, $school);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, School $school): bool
    {
        return $this->isOwner($user, $school);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, School $school): bool
    {
        return $this->isOwner($user, $school);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, School $school): bool
    {
        return $this->isOwner($user, $school);
    }

    private function isOwner(User $user, ?School $school = null)
    {
        return $school === null
            ? $this->hasAdmin($user)
            : $this->hasAdmin($user) && $school->user_id === $user->id;
    }

    private function hasAdmin(User $user)
    {
        return $user->role === RoleUserEnum::ADMIN->value;
    }
}
