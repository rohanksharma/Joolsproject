<?php

namespace App\model;

use Illuminate\Database\Eloquent\Model;

class ProductSku extends Model
{
    //
    protected $table = 'product_sku';
    protected $fillable = ['id', 'shopifyproduct_id', 'product_sku', 'price_sku','price'];
}
