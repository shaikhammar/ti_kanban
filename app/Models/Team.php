<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    // Define the relationship between Team and Users
    public function users()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
}
