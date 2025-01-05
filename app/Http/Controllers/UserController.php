<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    // Ensure only admins can access these methods
    public function __construct()
    {
        // $this->middleware('role:admin');
    }

    // Store a new user and assign them a team and the 'member' role
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'team_id' => 'required|exists:teams,id', // team_id for the user
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Assign user to the selected team
        $team = Team::find($request->team_id);
        $user->teams()->attach($team);

        // Assign the user the 'member' role in this team
        $user->assignRole('member', $team->id);

        return redirect()->route('users.index');
    }

    // Update user role to 'admin'
    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role' => ['required', Rule::in(['admin', 'member'])],
        ]);

        // Remove the user's current role and assign the new role
        $user->syncRoles([$request->role], $request->team_id);

        return redirect()->route('users.index');
    }
}
