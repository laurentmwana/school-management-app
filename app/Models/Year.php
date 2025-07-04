<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Year extends Model
{
    protected $fillable = ['name', 'start', 'end', 'is_closed', 'school_id'];

    public function grades(): HasMany
    {
        return $this->hasMany(Grade::class);
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }

    public function school(): HasMany
    {
        return $this->hasMany(School::class);
    }
}
