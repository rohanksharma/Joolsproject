<?php

namespace App\Http\Controllers\ProductController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ProductDataResource;
use App\Http\Controllers\BaseController as BaseController;
use DB;
use App\Model\ProductData;
use App\Model\MetalProductDetails;
use App\Model\ProductStoneDetails;
use Log;
use App\Model\ProductSku;
use App\DTO\ProductMaterial;

class ProductController extends BaseController
{
    //

    //BookMarks list
     public function index(Request $request) {
        //  $per_page = config('global.api_per_page');
              $product_id = $request->shopifyproduct_id;
              $productStone ="";
              //Log::Info($product_id);
                 $productMaterial  = new ProductMaterial();

                $productdata = ProductData::where('shopifyproduct_id',$product_id)->first();
                $metalProductDetails = MetalProductDetails::selectRaw('metal_product_details.id,metal_product_details.shopifyproduct_id,
                  metal_product_details.metal_type,metal_product_details.metal_type,metal_product_details.metal_wtt,metal_product_details.purity,
                  metal_product_details.labour_charges,metal.metal_name')
                     ->join('metal','metal.metal_id','=','metal_product_details.metal_type')
                      ->where('shopifyproduct_id',$product_id)
                      ->get();

                      $productsku = ProductSku::where('shopifyproduct_id',$product_id)->get();

                     $umetal = DB::table('metal_product_details')
                        ->select('metal_product_details.metal_type','metal.metal_name')
                        ->join('metal','metal.metal_id','=','metal_product_details.metal_type')
                        ->where('metal_product_details.shopifyproduct_id',$product_id)
                        ->groupByRaw('metal_product_details.metal_type')
                        ->get();

                        $metalFinish = DB::table('metal_product_details')
                           ->select('metal_product_details.metal_colour','metal_colour.colour','metal_product_details.metal_type')
                           ->join('metal_colour','metal_colour.colour_code','=','metal_product_details.metal_colour')
                           ->where('metal_product_details.shopifyproduct_id',$product_id)
                           ->groupByRaw('metal_product_details.metal_colour')
                           ->get();
                        //Log::info($orders);

                $productCSStoneDetails = ProductStoneDetails::selectRaw('product_stone_details.id,product_stone_details.shopifyproduct_id,
                  product_stone_details.shape,product_stone_details.width,product_stone_details.pcs,
                  product_stone_details.total_weight,product_stone_details.quality_id,product_stone_details.stone_type,product_stone_details.metal_code,stone_quality.quality')
                    ->join('stone_quality','stone_quality.id','=','product_stone_details.quality_id')
                    ->where('product_stone_details.stone_type','cs')
                    ->where('product_stone_details.shopifyproduct_id',$product_id)->get();

                    $productAS1StoneDetails = ProductStoneDetails::selectRaw('product_stone_details.id,product_stone_details.shopifyproduct_id,
                      product_stone_details.shape,product_stone_details.width,product_stone_details.pcs,
                      product_stone_details.total_weight,product_stone_details.quality_id,product_stone_details.stone_type,product_stone_details.metal_code,stone_quality.quality')
                        ->join('stone_quality','stone_quality.id','=','product_stone_details.quality_id')
                        ->where('product_stone_details.stone_type','AS1')
                        ->where('product_stone_details.shopifyproduct_id',$product_id)->get();

                        $productAS2StoneDetails = ProductStoneDetails::selectRaw('product_stone_details.id,product_stone_details.shopifyproduct_id,
                          product_stone_details.shape,product_stone_details.width,product_stone_details.pcs,
                          product_stone_details.total_weight,product_stone_details.quality_id,product_stone_details.stone_type,product_stone_details.metal_code,stone_quality.quality')
                            ->join('stone_quality','stone_quality.id','=','product_stone_details.quality_id')
                            ->where('product_stone_details.stone_type','AS2')
                            ->where('product_stone_details.shopifyproduct_id',$product_id)->get();
                              $productMaterial->CSlavel = 'Choose Center Stone';
                              $productMaterial->AS1lavel = 'Choose Accent Stone1';
                              $productMaterial->AS2lavel = 'Choose Accent Stone2';

                              $productMaterial->centerStone = $productCSStoneDetails;
                              $productMaterial->accentStone1 = $productAS1StoneDetails;
                              $productMaterial->accentStone2 = $productAS2StoneDetails;
                              $productMaterial->umetal = $umetal;
                              $productMaterial->metalProductDetails = $metalProductDetails;
                              $productMaterial->metalFinish = $metalFinish;
                              $productMaterial->productsku = $productsku;


                    // foreach ($productStoneCSDetails as $key => $value){
                    //      if($value->stone_type=='CS'){
                    //         $centerStone->
                    //       }
                    //
                    // }

              if($productdata!=null){
                return response()->json(['rsBody'=>['result'=>$productdata,'metalProductDetails'=>$metalProductDetails,'productMaterial'=>$productMaterial]]);
                 //return ProductDataResource::collection($productdata);
              }else{
                return "no data found";
              }
      }



}
