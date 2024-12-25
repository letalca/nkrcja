<?php

declare(strict_types=1);

namespace App\Providers;

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void {}

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        JsonResource::withoutWrapping();
        $this->setupModelConfigurations();
        $this->setupMacroFunctions();
    }

    private function setupModelConfigurations(): void
    {
        Model::shouldBeStrict(app()->isProduction());
        Model::unguard();
    }

    private function setupMacroFunctions(): void
    {
        Config::macro('share', fn(array $keys) => HandleInertiaRequests::$sharedConfig = $keys);
    }
}
