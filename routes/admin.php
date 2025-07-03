<?php

use App\Http\Controllers\Admin\AdminCourseController;
use App\Http\Controllers\Admin\AdminSchoolController;
use App\Http\Controllers\Admin\AdminYearController;
use Illuminate\Support\Facades\Route;


Route::name('#')
    ->middleware(['auth', 'verified', 'admin'])
    ->group(function () {
        Route::resource('school', AdminSchoolController::class)
            ->parameter('school', 'id');

        Route::get('year/{id}', [AdminYearController::class, 'show'])
            ->name('year.show');

        Route::post('year/{id}/create', [AdminYearController::class, 'store'])
            ->name('year.create');

        Route::get('year', [AdminYearController::class, 'index'])
            ->name('year.index');

        Route::resource('course', AdminCourseController::class)
            ->parameter('course', 'id');
    });
