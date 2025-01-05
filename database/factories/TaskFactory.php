<?php

namespace Database\Factories;

use App\Models\Column;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(10),
            'column_id' => Column::factory(),
            'order' => fake()->numberBetween(1, 10),
        ];
    }
}
