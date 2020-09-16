<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Metal extends Model
{
    //
    protected $table = 'metal';
    protected $fillable = ['id','metal_name','metal_id'];
}
