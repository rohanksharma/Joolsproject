<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class MetalPrice extends Model
{
    //

    protected $table = 'metal_price';
    protected $fillable = ['metal_id', 'purity_id','price'];

}
