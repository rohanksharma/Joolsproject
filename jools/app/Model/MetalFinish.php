<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class MetalFinish extends Model
{
    //

     protected $table = 'metal_finish';
    protected $fillable = ['id','metal_color','images','shopifyproduct_id'];

}
