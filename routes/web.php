<?php

declare(strict_types=1);

use App\Enums\Members\FormType;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function (): void {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::prefix('members')->group(function (): void {
        Route::get('/', [MembershipController::class, 'index'])->name('members');
        Route::get('/{memberId}', [MembershipController::class, 'form'])->name('members.form');
        Route::post('/{memberId}/save/{form}', [MembershipController::class, 'save'])
            ->name('members.save')
            ->whereIn('form', FormType::cases());
    });
});

require __DIR__ . '/auth.php';
