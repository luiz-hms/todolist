<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;
class TodoController extends Controller
{
    public function index(){
        return Todo::all();
    }
}
