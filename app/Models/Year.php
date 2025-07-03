<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Year extends Model
{
    protected $fillable = ['name', 'start', 'end'];

    public function grades(): HasMany
    {
        return $this->hasMany(Grade::class);
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }
}
