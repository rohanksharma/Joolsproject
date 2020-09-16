<?php

namespace App\Http\Controllers\ProductController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Category;
use App\Http\Controllers\BaseController as BaseController;

class ProductCategory extends BaseController
{
    //
    public function getProductCategory(Request $request){
      $productCategory = Category::where('subcategory_id',0)->get();
      if($productCategory!=null){
        return response()->json(['rsBody'=>['result'=>"success",'data'=>$productCategory]]);
         //return ProductDataResource::collection($productdata);
      }else{
        return "no data found";
      }
    }


    public function getProductSubCategory(Request $request){
      $productCategory = Category::where('category', $request->category)->get();
      if($productCategory!=null){
        return response()->json(['rsBody'=>['result'=>"success",'data'=>$productCategory]]);
         //return ProductDataResource::collection($productdata);
      }else{
        return "no data found";
      }
    }


}
