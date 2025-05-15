<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Todo;

class Task extends Model
{
    use HasFactory;

       //use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'title',
        'is_completed',
        'todo_id',
    ];


    public function todo()
    {
        return $this->belongsTo(Todo::class);
    }

}
