<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StreamWebhookController;

Route::post('/streams/live/start', [
    StreamWebhookController::class,
    'start',
]);

Route::post('/streams/live/end', [
    StreamWebhookController::class,
    'end',
]);