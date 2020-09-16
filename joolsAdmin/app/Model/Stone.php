<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Stone extends Model
{
    //
    protected $table = 'stone';
    protected $fillable = ['id', 'stone_type', 'stone_type','status'];

}
