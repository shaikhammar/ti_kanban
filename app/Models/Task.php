<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;

class Task extends Model implements Sortable
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory, SortableTrait;

    public $fillable = [
        'title',
        'column_id',
        'order',
    ];

    public $sortable = [
        'order_column_name' => 'order',
    ];

    public function column(): BelongsTo
    {
        return $this->belongsTo(Column::class);
    }

    public function getHighestOrderNumber(): int
    {
        return (int)$this->buildSortQuery()
            ->where('column_id', $this->column_id)
            ->max($this->determineOrderColumnName());
    }
}
