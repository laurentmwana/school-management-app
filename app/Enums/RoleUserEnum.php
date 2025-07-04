<?php

namespace App\Enums;

enum RoleUserEnum: string
{
    case ADMIN = "admin";

    case COMPLETED = "completed";

    case PARENT = "parent";
}
