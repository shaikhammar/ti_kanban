<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;

class Column extends Model implements Sortable
{
    /** @use HasFactory<\Database\Factories\ColumnFactory> */
    use HasFactory, SortableTrait;

    public $fillable = [
        'name',
        'project_id',
        'order',
    ];

    public $sortable = [
        'order_column_name' => 'order',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class)->orderBy('order');
    }

    public function getHighestOrderNumber(): int
    {
        return (int)$this->buildSortQuery()
            ->where('project_id', $this->project_id)
            ->max($this->determineOrderColumnName());
    }
}
