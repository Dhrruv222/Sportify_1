<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Fail fast if JWT secrets are missing so deployment issues surface
        // immediately rather than at the first login attempt.
        if (app()->environment('production')) {
            if (empty(config('jwt.secret'))) {
                throw new \RuntimeException(
                    'JWT_SECRET is not configured. Set JWT_SECRET in your .env file.'
                );
            }
            if (empty(config('jwt.refresh_secret'))) {
                throw new \RuntimeException(
                    'JWT_REFRESH_SECRET is not configured. Set JWT_REFRESH_SECRET in your .env file.'
                );
            }
        }
    }
}
