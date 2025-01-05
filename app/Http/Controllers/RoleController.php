<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleStoreRequest;
use App\Http\Requests\RoleUpdateRequest;
use App\Http\Resources\PermissionResource;
use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasPermissions;

use function PHPSTORM_META\map;
use function Symfony\Component\Translation\t;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $page_request = request()->input('page', 1);

        $per_page_request = request()->input('per_page', 5);

        $roles = RoleResource::collection(Role::with('permissions')
            ->orderBy('created_at', 'desc')
            ->paginate(perPage: $per_page_request, page: $page_request));
        // dd($roles);

        return
            Inertia::render('Role/Index', [
                'roles' => $roles,
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = PermissionResource::collection(Permission::all());
        // dd($permissions->toArray(request()));
        return
            Inertia::render('Role/Create', [
                'permissions' => $permissions
            ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleStoreRequest $request)
    {
        // dd($request->validated());
        $role = Role::create(
            $request->validated()
        );

        $role->syncPermissions(collect($request->permissions)->pluck('id'));

        return redirect()->route('roles.index')->with('success', 'Role "' . $request->name . '" created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role): Response
    {
        $hasPermissions = collect($role->permissions);
        // dd($hasPermissions);
        $permissions = PermissionResource::collection(Permission::all());
        return
            Inertia::render('Role/Edit', [
                'role' => $role,
                'hasPermissions' => $hasPermissions,
                'permissions' => $permissions
            ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Role $role, RoleUpdateRequest $request)
    {
        $old_name = $role->name;
        $role->update(
            $request->validated()
        );

        $role->syncPermissions(collect($request->permissions)->pluck('id'));

        return redirect()->route('roles.index')
            ->with('success', 'Role "' . $old_name . '" updated to "' . $request->name . '" successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $name = $role->name;
        $role->syncPermissions([]);
        $role->delete();

        return redirect()->route('roles.index')->with('success', 'Role "' . $name . '" deleted successfully!');
    }
}
