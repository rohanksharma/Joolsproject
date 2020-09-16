<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class ProductStoneDetails extends Model
{
    //

    protected $table = 'product_stone_details';
    protected $fillable = ['id', 'shopifyproduct_id', 'shape', 'as_length','width','as_depth','weight'];
    

}
