<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['name', 'firstname', 'birth', 'gender', 'registration_token', 'school_id'];

    public function actualLevel(): HasOne
    {
        return $this->hasOne(ActualLevel::class);
    }

    public function guardians(): BelongsToMany
    {
        return $this->belongsToMany(Guardian::class);
    }

    public function historicLevels(): BelongsToMany
    {
        return $this->belongsToMany(HistoricLevel::class);
    }

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

}
