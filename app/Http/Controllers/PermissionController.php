<?php

namespace App\Http\Controllers;

use App\Http\Requests\PermissionStoreRequest;
use App\Http\Requests\PermissionUpdateRequest;
use App\Http\Resources\PermissionCollection;
use App\Http\Resources\PermissionResource;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $page_request = request()->input('page', 1);

        $per_page_request = request()->input('per_page', 5);

        $permissions = PermissionResource::collection(Permission::orderBy('created_at', 'desc')
            ->paginate(perPage: $per_page_request, page: $page_request));
        // dd($permissions);

        return
            Inertia::render('Permission/Index', [
                'permissions' => $permissions,
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return
            Inertia::render('Permission/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PermissionStoreRequest $request): RedirectResponse
    {
        Permission::create(
            $request->validated()
        );
        // session()->flash('success', 'Permission ' . $request->name . ' created successfully!');

        return redirect()->route('permissions.index')->with('success', 'Permission "' . $request->name . '" created successfully!');
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
    public function edit(Permission $permission): Response
    {
        return
            Inertia::render('Permission/Edit', $permission);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Permission $permission, PermissionUpdateRequest $request)
    {
        $old_name = $permission->name;
        $permission->update(
            $request->validated()
        );

        return redirect()->route('permissions.index')->with('success', 'Permission "' . $old_name . '" updated to "' . $request->name . '" successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        $name = $permission->name;
        $permission->delete();

        return redirect()->route('permissions.index')->with('success', 'Permission "' . $name . '" deleted successfully!');
    }
}
