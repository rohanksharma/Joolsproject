<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    protected $table = 'product_category';
    protected $fillable = ['id', 'category', 'category_code', 'subcategory_id'];
}
