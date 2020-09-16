<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class MetalProductDetails extends Model
{

  protected $table = 'metal_product_details';
  protected $fillable = ['id', 'shopifyproduct_id','metal_type','purity','metal_wtt','metal_amount','total_labour_charges'];

}
