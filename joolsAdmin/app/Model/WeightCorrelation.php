<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class WeightCorrelation extends Model
{
    //
    protected $table = 'weight_correlation';
    protected $fillable = ['id','metal_purity_id','$request'];
}
