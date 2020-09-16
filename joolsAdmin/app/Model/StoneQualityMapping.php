<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class StoneQualityMapping extends Model
{
    //
    protected $table = 'stone_quality_mapping';
    protected $fillable = ['id','stone_code','stone_quality_id'];
}
