<?php

namespace App\Http\Controllers\ProductController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Category;
use App\Http\Controllers\BaseController as BaseController;
use Log;
use App\Model\Designer;
use App\Model\MetalPurity;
use App\Model\Stone;
use App\Model\StoneShap;
use App\Model\StoneQualityMapping;
use App\Model\StoneQuality;
use App\Model\StoneShapMapping;

class ProductCategory extends BaseController
{
    //
    public function getProductCategory(Request $request){
      $productCategory = Category::where('subcategory_id',0)->get();
      if($productCategory!=null){
        return response()->json(['result'=>"success",'data'=>$productCategory]);
         //return ProductDataResource::collection($productdata);
      }else{
        return "no data found";
      }
    }


    public function getProductSubCategory(Request $request){

      $category = Category::where('category', $request->category)->first();
      $productCategory = Category::where('subcategory_id',$category->id)->get();
      if($productCategory!=null){
        return response()->json(['result'=>"success",'data'=>$productCategory]);
         //return ProductDataResource::collection($productdata);
      }else{
        return "no data found";
      }
    }


     public function getProductDesigner(Request $request){
        $designer = Designer::where('status',1)->get();
        if($designer!=null){
          return response()->json(['result'=>"success",'data'=>$designer]);
           //return ProductDataResource::collection($productdata);
        }else{
          return "no data found";
        }
      }


      public function getMetalPurity(){
        $metalPurity = MetalPurity::where('status',1)->get();
        Log::Info($metalPurity);
        if($metalPurity!=null){
          return response()->json(['result'=>"success",'data'=>$metalPurity]);
           //return ProductDataResource::collection($productdata);
        }else{
          return response()->json(['result'=>"Data not found",'data'=>$metalPurity]);
        }
      }

      public function getStone(){
        $stone = Stone::where('status',1)->get();
        if($stone!=null){
          return response()->json(['result'=>"success",'data'=>$stone]);
           //return ProductDataResource::collection($productdata);
        }else{
          return response()->json(['result'=>"Data not found",'data'=>$stone]);
        }
      }

      // public function getStoneShap(){
      //   $StoneShap = StoneShap::where('status',1)->get();
      //   if($StoneShap!=null){
      //     return response()->json(['result'=>"success",'data'=>$StoneShap]);
      //      //return ProductDataResource::collection($productdata);
      //   }else{
      //     return response()->json(['result'=>"Data not found",'data'=>$StoneShap]);
      //   }
      // }

      public function getStoneQuality(Request $request){

        $stone_quality_id = array();
        $stonequalitymapping = StoneQualityMapping::where('stone_code',$request->stone_code)
        ->get();
        foreach ($stonequalitymapping as $key => $value) {
             array_push($stone_quality_id,$value->stone_quality_id);
         }

          $stonequality= StoneQuality::whereIn('id',$stone_quality_id)
          ->where('status',1)
          ->get();
        if($stonequality!=null){
          return response()->json(['result'=>"success",'data'=>$stonequality]);
           //return ProductDataResource::collection($productdata);
        }else{
          return response()->json(['result'=>"Data not found",'data'=>$stonequality]);
        }
      }

      public function getStoneShap(Request $request){

          Log::Info($request->stone_code);
          $stoneshapList = array();
          $stoneShapCode = StoneShapMapping::where('stone_type',$request->stone_code)->get();
            Log::Info($stoneShapCode);
              foreach ($stoneShapCode as $key => $value) {
                   array_push($stoneshapList,$value->stone_shap);
               }
          $StoneShap = StoneShap::where('status',1)->whereIn('shape_code',$stoneshapList)->get();
          if($StoneShap!=null){
            return response()->json(['result'=>"success",'data'=>$StoneShap]);
             //return ProductDataResource::collection($productdata);
          }else{
            return response()->json(['result'=>"Data not found",'data'=>$StoneShap]);
          }
      }
}
