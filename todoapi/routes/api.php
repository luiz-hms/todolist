<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TodoController;

Route::get('/todos', [TodoController::class, 'index']);
Route::get('/', function () {
return response()->json([
    'success' => true
]);
});