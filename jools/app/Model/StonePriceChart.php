<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class StonePriceChart extends Model
{
    //
      protected $table = 'stone_price_chart';
      protected $fillable = ['id', 'stone_code', 'shape_code', 'avg_stone_size_id','quality_id','price'];
}
