<?php

namespace App\Observers;

use App\Enums\LevelCycleEnum;
use App\Enums\SecondaryCycleEnum;
use App\Models\School;
use App\Models\Level;

class SchoolObserver
{
    private static array $LEVELS = [
        LevelCycleEnum::PRESCOLAIRE->value => [
            ['name' => '1ère année maternelle', 'alias' => 'M1'],
            ['name' => '2e année maternelle', 'alias' => 'M2'],
            ['name' => '3e année maternelle', 'alias' => 'M3'],
        ],
        LevelCycleEnum::PRIMAIRE->value => [
            ['name' => '1ère année primaire', 'alias' => '1ère P'],
            ['name' => '2e année primaire', 'alias' => '2e P'],
            ['name' => '3e année primaire', 'alias' => '3e P'],
            ['name' => '4e année primaire', 'alias' => '4e P'],
            ['name' => '5e année primaire', 'alias' => '5e P'],
            ['name' => '6e année primaire', 'alias' => '6e P'],
        ],
        LevelCycleEnum::SECONDAIRE->value => [
            SecondaryCycleEnum::TRONC_COMMUN->value => [
                ['name' => '1ère année secondaire', 'alias' => '1ère S'],
                ['name' => '2e année secondaire', 'alias' => '2e S'],
            ],
            SecondaryCycleEnum::ORIENTATION->value => [
                ['name' => '3e année secondaire', 'alias' => '3e S'],
                ['name' => '4e année secondaire', 'alias' => '4e S'],
                ['name' => '5e année secondaire', 'alias' => '5e S'],
                ['name' => '6e année secondaire', 'alias' => '6e S'],
            ],
        ],
    ];

    public function created(School $school): void
    {
        foreach (self::$LEVELS as $cycle => $levels) {
            if ($cycle === LevelCycleEnum::SECONDAIRE->value) {
                foreach ($levels as $subCycle => $subLevels) {
                    foreach ($subLevels as $level) {
                        Level::create([
                            'school_id' => $school->id,
                            'name' => $level['name'],
                            'alias' => $level['alias'],
                            'cycle' => $cycle,
                            'sub_cycle' => $subCycle,
                        ]);
                    }
                }
            } else {
                foreach ($levels as $level) {
                    Level::create([
                        'school_id' => $school->id,
                        'name' => $level['name'],
                        'alias' => $level['alias'],
                        'cycle' => $cycle,
                        'sub_cycle' => null,
                    ]);
                }
            }
        }
    }
}
