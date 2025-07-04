<?php

use App\Http\Controllers\Other\StepController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'completed:no', 'verified'])->group(function () {
    Route::get('/register/completed/step-{step}', [StepController::class, 'index'])
        ->name('step');

    Route::post('/register/completed/step-{step}', [StepController::class, 'store']);
});
