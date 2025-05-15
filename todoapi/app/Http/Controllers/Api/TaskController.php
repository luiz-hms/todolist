<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Todo;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
class TaskController extends Controller
{
    public function index($todoId)
    {
        $todo = Todo::where('id', $todoId)->where('user_id', Auth::id())->first();

        if (!$todo) {
            return response()->json(['message' => 'Todo não encontrada'], 404);
        }

        $tasks = $todo->tasks;

        return response()->json([
            'message' => 'Lista de tarefas',
            'data' => $tasks
        ]);
    }

    public function store(StoreTaskRequest $request, $todoId)
    {
        $todo = Todo::where('id', $todoId)->where('user_id', Auth::id())->first();

        if (!$todo) {
            return response()->json(['message' => 'Todo não encontrada'], 404);
        }

        $task = $todo->tasks()->create($request->validated());

        return response()->json([
            'message' => 'Tarefa criada com sucesso',
            'data' => $task
        ], 201);
    }

    public function show($todoId, $taskId)
    {
        $todo = Todo::where('id', $todoId)->where('user_id', Auth::id())->first();

        if (!$todo) {
            return response()->json(['message' => 'Todo não encontrada'], 404);
        }

        $task = $todo->tasks()->where('id', $taskId)->first();

        if (!$task) {
            return response()->json(['message' => 'Tarefa não encontrada'], 404);
        }

        return response()->json($task);
    }

    public function update(UpdateTaskRequest $request, $todoId, $taskId)
    {
        $todo = Todo::where('id', $todoId)->where('user_id', Auth::id())->first();

        if (!$todo) {
            return response()->json(['message' => 'Todo não encontrada'], 404);
        }

        $task = $todo->tasks()->where('id', $taskId)->first();

        if (!$task) {
            return response()->json(['message' => 'Tarefa não encontrada'], 404);
        }

        $task->update($request->validated());

        return response()->json([
            'message' => 'Tarefa atualizada com sucesso',
            'data' => $task
        ]);
    }

    public function destroy($todoId, $taskId)
    {
        $todo = Todo::where('id', $todoId)->where('user_id', Auth::id())->first();

        if (!$todo) {
            return response()->json(['message' => 'Todo não encontrada'], 404);
        }

        $task = $todo->tasks()->where('id', $taskId)->first();

        if (!$task) {
            return response()->json(['message' => 'Tarefa não encontrada'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Tarefa removida com sucesso']);
    }
}
