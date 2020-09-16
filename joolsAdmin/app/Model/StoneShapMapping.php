<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class StoneShapMapping extends Model
{
    //
    protected $table = 'stone_shap_mapping';
    protected $fillable = ['id','stone_shap','stone_type'];
    
}
