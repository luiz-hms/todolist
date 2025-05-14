<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function __construct(protected User $repository) {}

    public function index() {
        $users = $this->repository->all();
        return UserResource::collection($users);
    }
}
