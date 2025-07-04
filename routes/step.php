<?php

use App\Http\Controllers\Other\StepController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'completed:no'])
    ->group(function () {
    Route::get('/register/completed/step-{step}', [StepController::class, 'index'])
        ->name('step');
    Route::post('/register/completed/step-{step}', [StepController::class, 'store']);
});
