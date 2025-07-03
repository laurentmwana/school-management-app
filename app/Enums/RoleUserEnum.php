<?php

namespace App\Enums;

enum RoleUserEnum: string
{
    case ADMIN = "admin";

    case STUDENT = "student";

    case PARENT = "parent";

    case LOCK = "lock";
}
