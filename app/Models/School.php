<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class School extends Model
{
    /** @use HasFactory<\Database\Factories\SchoolFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['name', 'alias', 'description', 'user_id', 'address'];

    public function levels(): HasMany
    {
        return $this->hasMany(Level::class);
    }

    public function students(): HasMany
    {
        return $this->hasMany(Level::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
