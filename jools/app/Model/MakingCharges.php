<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class MakingCharges extends Model
{
    //
    
    protected $table = 'making_charges';
    protected $fillable = ['id', 'metal', 'purity', 'min_weight','max_weight','price','price_staus'];

}
