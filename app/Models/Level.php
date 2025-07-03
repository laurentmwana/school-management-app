<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Level extends Model
{
    /** @use HasFactory<\Database\Factories\LevelFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['name', 'alias', 'school_id'];

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }
}
