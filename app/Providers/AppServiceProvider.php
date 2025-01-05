<?php

namespace App\Providers;

use App\Http\Resources\RoleResource;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Route::bind('permissions.edit', function (string $value) {
            return Permission::where('id', $value)->firstOrFail();
        });

        Route::bind('roles.edit', function (string $value) {
            return Role::where('id', $value)->firstOrFail();
        });
    }
}
