<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class StoneQuality extends Model
{
    //
    protected $table = 'stone_quality';
    protected $fillable = ['id','stone_id','colour','clarity','quality','status'];
}
