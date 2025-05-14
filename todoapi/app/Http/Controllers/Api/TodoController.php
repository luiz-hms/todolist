<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;
use App\Http\Resources\TodoResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;


class TodoController extends Controller
{
    public function __construct(protected Todo $todoRepository){}
    public function index(){
        $todos = Todo::where('user_id', Auth::id())->with('tasks')->get();
        return response()->json([
            'message' => 'carregado com sucesso',
            'data' => $todos,
        ], 200);
        return TodoResource::collection($todos);
    }

    public function store(StoreTodoRequest $request)
    {
        $todo = Todo::create([
            'title' => $request->title,
            'user_id' => Auth::id(),
        ]);

        return response()->json([
            'message' => 'Todo criada com sucesso',
            'data' => $todo
        ], 201);
    }

    public function update(UpdateTodoRequest $request, $id)
    {
        $todo = Todo::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$todo) {
            return response()->json(['message' => 'Todo não encontrada'], 404);
        }

        $todo->update([
            'title' => $request->title
        ]);

        return response()->json([
            'message' => 'Todo atualizada com sucesso',
            'data' => $todo
        ]);
    }

    public function destroy($id)
    {
        $todo = Todo::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$todo) {
            return response()->json(['message' => 'Todo não encontrada'], 404);
        }

        $todo->delete();

        return response()->json(['message' => 'Todo removida com sucesso']);
    }

}
