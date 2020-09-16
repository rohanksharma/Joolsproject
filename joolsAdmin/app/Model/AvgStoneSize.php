<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class AvgStoneSize extends Model
{
    //
    protected $table = 'avg_stone_size';
    protected $fillable = ['id','size_min','size_max','status'];

}
