<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    protected $fillable = ['title'];

    public function columns(): HasMany
    {
        return $this->hasMany(Column::class)->orderBy('order');
    }

    public function tasks(): HasManyThrough
    {
        return $this->hasManyThrough(Task::class, Column::class);
    }
}
