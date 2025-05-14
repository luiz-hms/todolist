<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;
use App\Http\Resources\TodoResource;

class TodoController extends Controller
{
    public function __construct(protected Todo $todoRepository){}
    public function index(){
        $todos = $this->todoRepository->all();
        return TodoResource::collection($todos);
    }
}
