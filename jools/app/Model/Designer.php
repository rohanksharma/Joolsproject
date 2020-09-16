<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Designer extends Model
{
    //
    protected $table = 'designer';
    protected $fillable = ['id', 'designer_name', 'designer_id', 'status'];
    
}
