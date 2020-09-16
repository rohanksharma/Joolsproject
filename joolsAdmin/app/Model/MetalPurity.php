<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class MetalPurity extends Model
{
    //
        protected $table = 'metal_purity';
        protected $fillable = ['id','metal','purity','purity_code','metal_id'];
}
