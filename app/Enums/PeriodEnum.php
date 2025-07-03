<?php

namespace App\Enums;

enum PeriodEnum: string
{
    case FIRST = '1ère période';
    case SECOND = '2ème période';
    case THIRD = '3ème période';

    case GENERAL = 'Général';
}
