<?php

use App\Http\Controllers\Admin\AdminCourseController;
use App\Http\Controllers\Admin\AdminGradeController;
use App\Http\Controllers\Admin\AdminGuardianController;
use App\Http\Controllers\Admin\AdminLevelController;
use App\Http\Controllers\Admin\AdminResultController;
use App\Http\Controllers\Admin\AdminSchoolController;
use App\Http\Controllers\Admin\AdminStudentController;
use App\Http\Controllers\Admin\AdminYearController;
use Illuminate\Support\Facades\Route;


Route::name('#')
    ->prefix('admin')
    ->middleware(['auth', 'verified', 'completed:yes', 'admin'])
    ->group(function () {

        Route::get('year/{id}', [AdminYearController::class, 'show'])
            ->name('year.show');

        Route::delete('year/{id}/closed', [AdminYearController::class, 'store'])
            ->name('year.closed');

        Route::get('year', [AdminYearController::class, 'index'])
            ->name('year.index');

        Route::resource('course', AdminCourseController::class)
            ->parameter('course', 'id');

        Route::resource('student', AdminStudentController::class)
            ->parameter('student', 'id');

        Route::resource('guardian', AdminGuardianController::class)
            ->parameter('guardian', 'id');

        Route::resource('grade', AdminGradeController::class)
            ->parameter('grade', 'id');

        Route::resource('result', AdminResultController::class)
            ->parameter('result', 'id');

        Route::get('level/{id}', [AdminLevelController::class, 'show'])
            ->name('level.show');

        Route::get('level', [AdminLevelController::class, 'index'])
            ->name('level.index');

    });
