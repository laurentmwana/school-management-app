<?php

namespace App\Observers;

use App\Models\ActualLevel;
use App\Models\HistoricLevel;

class ActualLevelObserver
{
    public function created(ActualLevel $actualLevel): void
    {
        $this->upgrade($actualLevel);
    }

    public function updated(ActualLevel $actualLevel): void
    {
        $this->upgrade($actualLevel);
    }

    private function upgrade(ActualLevel $actualLevel): void
    {
        $historic = HistoricLevel::where('level_id', '=', $actualLevel->level_id)
            ->where('student_id', '=', $actualLevel->student_id)
            ->where('year_id', '=', $actualLevel->year_id)

            ->first();

        if (!($historic instanceof HistoricLevel)) {
            HistoricLevel::create([
                'year_id' => $actualLevel->year_id,
                'level_id' => $actualLevel->level_id,
                'student_id' => $actualLevel->student_id,
            ]);
        }
    }
}
