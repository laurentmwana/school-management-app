<?php

namespace App\Providers;

use App\Models\ActualLevel;
use App\Models\School;
use App\Observers\ActualLevelObserver;
use App\Observers\SchoolObserver;
use Illuminate\Support\ServiceProvider;

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
        ActualLevel::observe([ActualLevelObserver::class]);
        School::observe([SchoolObserver::class]);
    }
}
