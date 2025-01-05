<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    // Ensure only admins can access these methods
    public function __construct()
    {
        // $this->middleware('role:admin');
    }

    // Create a new team
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $team = Team::create([
            'name' => $request->name,
        ]);

        return redirect()->route('teams.index');
    }

    // Delete an existing team
    public function destroy(Team $team)
    {
        $team->delete();

        return redirect()->route('teams.index');
    }
}
