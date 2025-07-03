<?php

use App\Http\Controllers\Admin\AdminSchoolController;
use Illuminate\Support\Facades\Route;


Route::name('#')
    ->middleware(['auth', 'verified', 'admin'])
    ->group(function () {
        Route::resource('school', AdminSchoolController::class)
            ->parameter('school', 'id');
    });
