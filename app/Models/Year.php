<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Year extends Model
{
    /** @use HasFactory<\Database\Factories\YearFactory> */
    use HasFactory;

    protected $fillable = ['name', 'start', 'end', 'is_closed'];

    public function grades(): HasMany
    {
        return $this->hasMany(Grade::class);
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }
}
