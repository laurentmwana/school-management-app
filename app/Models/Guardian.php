<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Guardian extends Model
{
    /** @use HasFactory<\Database\Factories\GuardianFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['name', 'firstname', 'phone', 'gender'];

    public function students(): BelongsToMany
    {
        return $this->belongsToMany(Student::class);
    }
}
