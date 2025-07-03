<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ActualLevel extends Model
{
    use SoftDeletes;

    protected $fillable = ['level_id', 'student_id', 'year_id'];

    public function year(): BelongsTo
    {
        return $this->belongsTo(Year::class);
    }

    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
