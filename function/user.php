<?php


use App\Enums\RoleUserEnum;

function isAdmin(array $roles): bool
{
    $adminRoles = [
        RoleUserEnum::COMPLETED->value,
        RoleUserEnum::ADMIN->value,
    ];

    return hasRequiredRoles($roles, $adminRoles);
}

function isParent(array $roles): bool
{
    $parentRoles = [
        RoleUserEnum::PARENT->value,
    ];

    return hasRequiredRoles($roles, $parentRoles);
}

function hasRequiredRoles(array $userRoles, array $requiredRoles): bool
{
    return empty(array_diff($requiredRoles, $userRoles));
}
