<?php

namespace App\Http\Controllers\ProductController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Category;
use App\Http\Controllers\BaseController as BaseController;
use Log;
use App\Model\ProductData;
use App\Model\MetalPurity;
use App\Model\Metal;
use App\Model\WeightCorrelation;
use App\Model\MakingCharges;
use App\Model\MetalPrice;
use App\Model\MetalProductDetails;
use App\Model\ProductStoneDetails;
use App\Model\MetalFinish;
use App\Model\ProductSku;
use App\Model\AvgStoneSize;
use App\Model\StonePriceChart;
use lluminate\Support\Collection;


class GetProductDetails extends BaseController
{
    //

    public function getSkulist(Request $request){

      $shopifyproduct_id = 4508968288298;
      $productSku = ProductSku::where('shopifyproduct_id',$shopifyproduct_id)->get();
      if($productSku!=null){
        return response()->json(['result'=>"success",'data'=>$productSku]);
         //return ProductDataResource::collection($productdata);
      }else{
        return "no data found";
      }
    }

    public function addProduct(Request $request){
      $productData = new ProductData();
      $productData->shopifyproduct_id = 4508968288298;
      $productData->product_category = $request->category;
      $productData->collection = $request->collection;
      $productData->dimension = $request->dimension;
      $productData->height = $request->height;
      $productData->length = $request->length;
      $productData->width = $request->width;
      $productData->subcategory = $request->subcategory;
      $productData->designer = $request->designer;
      $productData->product_title = $request->product_title;
      $productData->description = $request->description;
      $productData->tags = $request->tags;
      $productData->save();
      if($productData!=null){
         return response()->json(['result'=>"success",'message'=>"Add New Product"]);
         //return ProductDataResource::collection($productdata);
      }else{
        return "no data found";
      }
    }

    public function addMetal(Request $request){

               $productData = ProductData::where('shopifyproduct_id',4508968288298)->first();
              foreach($request->selectedMetalPurity as $item){
               $metalpurity = MetalPurity::Where('id',$item['id'])->first();
                //Log::Info($metalpurity);
               $weightCorrelation = WeightCorrelation::where('metal_purity_id',$item['id'])->first();
                $metalPrice = MetalPrice::where('metal_id',$metalpurity->metal_id)
                ->where('purity_id',$metalpurity->purity_code)->first();
                      $metalProductDetails = new MetalProductDetails();
                      $metalProductDetails->shopifyproduct_id = 4508968288298;
                      $metalProductDetails->metal_type = $metalpurity->metal_id;
                      $metalProductDetails->purity = $metalpurity->purity_code;
                      $metalProductDetails->metal_wtt = $request->metalWt*$weightCorrelation->purity;
                      if($request->addStoneFlag == 'yes'){
                          $makingCharges = MakingCharges::where('price_staus','with_stone')
                          ->where('purity',$metalpurity->purity_code)
                          ->where('metal',$metalpurity->metal)->get();
                          foreach($makingCharges as $key => $value){
                            if($value->min_weight <= $metalProductDetails->metal_wtt && $value->max_weight >= $metalProductDetails->metal_wtt){
                                  $metalProductDetails->total_labour_charges=$value->price * $metalProductDetails->metal_wtt;
                             }
                          }
                      }else{
                        $makingCharges = MakingCharges::where('price_staus','without_stone')
                           ->where('purity',$metalpurity->purity_code)
                           ->where('metal',$metalpurity->metal)->get();
                        foreach($makingCharges as $key => $value){
                            Log::Info($value->min_weight.'-'.$value->max_weight);
                            Log::Info($metalProductDetails->metal_wtt);
                          if(($value->min_weight <=  $metalProductDetails->metal_wtt) && ($value->max_weight >= $metalProductDetails->metal_wtt)){
                              $metalProductDetails->total_labour_charges = $value->price * $metalProductDetails->metal_wtt;
                           }
                        }
                      }
                      $metalProductDetails->metal_amount = $metalProductDetails->metal_wtt*$metalPrice->price;
                      Log::Info($metalProductDetails);
                      $metalProductDetails->save();
            }
            $productData->addStoneFlag = $request->addStoneFlag;
            $productData->save();
      // if($metalProductDetails!=null){
      //    return response()->json(['result'=>"success",'message'=>"add New Metal"]);
      //    //return ProductDataResource::collection($productdata);
      // }else{
      //   return "no data found";
      // }
    }

    public function addStone(Request $request){

             Log::Info($request);
            $shopifyproduct_id = 4508968288298;
            $avgStoneSize = AvgStoneSize::where('status',1)->get();
          foreach($request->centerstonequality as $key => $value) {
            $centerStoneDetails = new ProductStoneDetails();
            $centerStoneDetails->shopifyproduct_id = $shopifyproduct_id;
            $centerStoneDetails->stone_name = $request->centerstonename;
            $centerStoneDetails->shape = $request->centerstoneshapecode;
            $centerStoneDetails->stone_type = $request->centerstonetype;
            $centerStoneDetails->quality_id = $value['id'];
            $centerStoneDetails->total_weight = $request->centerstonetotalwt;
            $centerStoneDetails->weight = $request->centerstonetotalwt/$request->centerstonepieces;
            foreach ($avgStoneSize as $key => $items){
              if(($items->size_min <= $centerStoneDetails->weight) && ($items->size_max >= $centerStoneDetails->weight)){
                  $avgStoneSize_id = $items->id;
               }
            }
            $stonePriceChart  = StonePriceChart::where('quality_id',$centerStoneDetails->quality_id)
            ->Where('avg_stone_size_id',$avgStoneSize_id)
            ->where('shape_code',$centerStoneDetails->shape)
            ->Where('stone_code',$centerStoneDetails->stone_type)->first();
            $centerStoneDetails->pcs = $request->centerstonepieces;
            $centerStoneDetails->total_stone_amount = $centerStoneDetails->total_weight * $stonePriceChart->price;
            $centerStoneDetails->save();
          }


          foreach ($request->accentstone1quality as $key => $value) {
            $accentStone1Details = new ProductStoneDetails();
            $accentStone1Details->shopifyproduct_id = $shopifyproduct_id;
            $accentStone1Details->stone_name = $request->accentstone1name;
            $accentStone1Details->shape = $request->accentstone1shap;
            $accentStone1Details->stone_type = $request->accentstone1type;
            $accentStone1Details->quality_id = $value['id'];
            $accentStone1Details->total_weight = $request->accentstone1totalwt;
            $accentStone1Details->weight = $request->accentstone1totalwt/$request->accentstone1pieces;
            $accentStone1Details->pcs = $request->accentstone1pieces;
            foreach ($avgStoneSize as $key => $items){
              if(($items->size_min <= $accentStone1Details->weight) && ($items->size_max >= $accentStone1Details->weight)){
                  $avgStoneSize_id = $items->id;
               }
            }

            $stonePriceChart  = StonePriceChart::where('quality_id',$accentStone1Details->quality_id)
            ->Where('avg_stone_size_id',$avgStoneSize_id)
            ->where('shape_code',$accentStone1Details->shape)
            ->Where('stone_code',$accentStone1Details->stone_type)->first();
            $accentStone1Details->total_stone_amount = $accentStone1Details->total_weight * $stonePriceChart->price;
            $accentStone1Details->save();

          }
          foreach ($request->accentstone2quality as $key => $value) {
            $accentStone2Details = new ProductStoneDetails();
            $accentStone2Details->shopifyproduct_id = $shopifyproduct_id;
            $accentStone2Details->stone_name = $request->accentstone2name;
            $accentStone2Details->shape = $request->accentstone2shap;
            $accentStone2Details->stone_type = $request->accentstone2type;
            $accentStone2Details->quality_id = $value['id'];
            $accentStone2Details->total_weight = $request->accentstone2totalwt;
            $accentStone2Details->weight = $request->accentstone2totalwt/$request->accentstone2pieces;
            $accentStone2Details->pcs = $request->accentstone2pieces;
            foreach ($avgStoneSize as $key => $items){
              if(($items->size_min <= $accentStone2Details->weight) && ($items->size_max >= $accentStone2Details->weight)){
                  $avgStoneSize_id = $items->id;
               }
            }
            $stonePriceChart  = StonePriceChart::where('quality_id',$accentStone2Details->quality_id)
            ->Where('avg_stone_size_id',$avgStoneSize_id)
            ->where('shape_code',$accentStone2Details->shape)
            ->Where('stone_code',$accentStone2Details->stone_type)->first();
            $accentStone2Details->total_stone_amount = $accentStone2Details->total_weight * $stonePriceChart->price;
            $accentStone2Details->save();
          }

          if($accentStone2Details!=null){
             return response()->json(['result'=>"success",'message'=>"Add Stone"]);
             //return ProductDataResource::collection($productdata);
          }else{
            return "no data found";
          }
    }

    public function priceCalCulator(Request $request){

            Log::info("hello");
            $shopifyproduct_id = 4508968288298;
           //   Log::Info($shopifyproduct_id);
            $productData = ProductData::where('shopifyproduct_id',$shopifyproduct_id)->first();
            //  Log::Info($productData);
            $MetalProductDetails = MetalProductDetails::where('shopifyproduct_id',$shopifyproduct_id)->get();
            //  Log::Info($MetalProductDetails);
              $metalFinish = MetalFinish::where('shopifyproduct_id',$shopifyproduct_id)->get();
             if($productData->addStoneFlag == "no"){

              foreach ($MetalProductDetails as $key => $value) {
                 $price = ($value->metal_amount + $value->total_labour_charges)*2;
                foreach ($metalFinish as $key => $item) {
                    $sku=$value->metal_type.$value->purity.$item->metal_color;
                          $productSku = new ProductSku();
                          $productSku->price_sku = $sku;
                          $productSku->price = $price;
                          $productSku->shopifyproduct_id = $shopifyproduct_id;
                          $productSku->save();
                  }
              }
            }else{
              $metalcollect = collect();
              foreach ($MetalProductDetails as $key => $value) {
                 $price = $value->metal_amount + $value->total_labour_charges;
                foreach ($metalFinish as $key => $item) {
                    $sku=$value->metal_type.$value->purity.$item->metal_color;
                          $productSku = new ProductSku();
                          $productSku->price_sku = $sku;
                          $productSku->price = $price;
                          $productSku->shopifyproduct_id = $shopifyproduct_id;
                          $metalcollect->push($productSku);
                        //  $productSku->save();
                  }
              }
                 Log::info($metalcollect);
                  $centerstonesku = collect();
                  $accentstone1sku = collect();
                  $accentstone2sku = collect();
                $centerStoneDetails = ProductStoneDetails::where('shopifyproduct_id',$shopifyproduct_id)
                ->where('stone_name','Center Stone')
                ->get();
                $accentStone1Details = ProductStoneDetails::where('shopifyproduct_id',$shopifyproduct_id)
                ->where('stone_name','Accent Stone1')
                ->get();
                $accentStone2Details = ProductStoneDetails::where('shopifyproduct_id',$shopifyproduct_id)
                ->where('stone_name','Accent Stone2')
                ->get();


                 foreach($metalcollect as $key => $value){
                      foreach ($centerStoneDetails as $key => $item) {
                        $productSku = new ProductSku();
                        $productSku->price_sku = $value->price_sku.$item->quality_id;
                        $productSku->price = $value->price + $item->total_stone_amount;
                        $productSku->shopifyproduct_id = $shopifyproduct_id;
                        $centerstonesku->push($productSku);
                      }
                   }


                   foreach($centerstonesku as $key => $value){
                        foreach ($accentStone1Details as $key => $item) {
                          $productSku1 = new ProductSku();
                          $productSku1->price_sku = $value->price_sku.$item->quality_id;
                          $productSku1->price = $value->price + $item->total_stone_amount;
                          $productSku1->shopifyproduct_id = $shopifyproduct_id;
                          $accentstone1sku->push($productSku1);
                        }
                     }

                     foreach($accentstone1sku as $key => $value){
                          foreach ($accentStone2Details as $key => $item) {
                            $productSku2 = new ProductSku();
                            $productSku2->price_sku = $value->price_sku.$item->quality_id;
                            $productSku2->price = ($value->price + $item->total_stone_amount)*2;
                            $productSku2->shopifyproduct_id = $shopifyproduct_id;
                            $productSku2->save();
                          }
                       }


            }
         // without stone formula
          // (metal_rate+MakingCharges)*2

            //with stone formula
          //(stone_price+metal+Making)*2;

      if($productData!=null){
         return response()->json(['result'=>"success",'message'=>"Add New Metal"]);
         //return ProductDataResource::collection($productdata);
      }else{
        return "no data found";
      }
    }

}
