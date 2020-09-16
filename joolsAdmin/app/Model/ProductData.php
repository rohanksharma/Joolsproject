<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class ProductData extends Model
{
    //
    //
    protected $table = 'product_data';
    protected $fillable = ['id','shopifyproduct_id','product_name','designer','product_category','subcategory','style_no','length','width','height','product_title','description','tags','dimension'];

}
// 
