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
use App\Model\MetalFinish;


class ProductController extends BaseController
{

    // fetch product variant data from database 
  public function getProductVariant(Request $request)
  {
    $product_id = $request->shopifyproduct_id;
    $productStone = "";
    $productMaterial  = new ProductMaterial();
    // Fetch product details by using shopify product_id 
    $productdata = ProductData::where('shopifyproduct_id', $product_id)->first();

    // Fetch Metal Product Details  by using shopify product_id 
    $metalProductDetails = MetalProductDetails::selectRaw('metal_product_details.id,metal_product_details.shopifyproduct_id,
                    metal_product_details.metal_type,metal_product_details.metal_wtt,metal_product_details.purity,metal.metal_name')
      ->join('metal', 'metal.metal_id', '=', 'metal_product_details.metal_type')
      ->where('shopifyproduct_id', $product_id)
      ->get();

      // Fetch ProductSku  by using shopify product_id 
    $productsku = ProductSku::where('shopifyproduct_id', $product_id)->get();

     // Fetch unique metal Product Details  by using shopify product_id 
    $umetal = DB::table('metal_product_details')
      ->select('metal_product_details.metal_type', 'metal.metal_name')
      ->join('metal', 'metal.metal_id', '=', 'metal_product_details.metal_type')
      ->where('metal_product_details.shopifyproduct_id', $product_id)
      ->groupByRaw('metal_product_details.metal_type')
      ->get();

      // Fetch Metal Finish   by using shopify product_id
    $metalFinish = MetalFinish::where('shopifyproduct_id', $product_id)->get();

     // Fetch Product Center Stone Details by using shopify product_id 
    $productCSStoneDetails = ProductStoneDetails::selectRaw('product_stone_details.id,product_stone_details.shopifyproduct_id,
                        product_stone_details.shape,product_stone_details.width,product_stone_details.pcs,
                        product_stone_details.total_weight,product_stone_details.quality_id,product_stone_details.stone_type,stone_quality.quality')
      ->join('stone_quality', 'stone_quality.id', '=', 'product_stone_details.quality_id')
      ->where('product_stone_details.stone_name', 'Center Stone')
      ->where('product_stone_details.shopifyproduct_id', $product_id)->get();

      // Fetch Product Assent Stone1 Details by using shopify product_id 
    $productAS1StoneDetails = ProductStoneDetails::selectRaw('product_stone_details.id,product_stone_details.shopifyproduct_id,
                        product_stone_details.shape,product_stone_details.width,product_stone_details.pcs,
                        product_stone_details.total_weight,product_stone_details.quality_id,product_stone_details.stone_type,stone_quality.quality')
      ->join('stone_quality', 'stone_quality.id', '=', 'product_stone_details.quality_id')
      ->where('product_stone_details.stone_name', 'Accent Stone1')
      ->where('product_stone_details.shopifyproduct_id', $product_id)->get();

      // Fetch Product Assent Stone2 Details by using shopify product_id 
    $productAS2StoneDetails = ProductStoneDetails::selectRaw('product_stone_details.id,product_stone_details.shopifyproduct_id,
                            product_stone_details.shape,product_stone_details.width,product_stone_details.pcs,
                            product_stone_details.total_weight,product_stone_details.quality_id,product_stone_details.stone_type,stone_quality.quality')
      ->join('stone_quality', 'stone_quality.id', '=', 'product_stone_details.quality_id')
      ->where('product_stone_details.stone_name', 'Accent Stone2')
      ->where('product_stone_details.shopifyproduct_id', $product_id)->get();
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
    

    if ($productdata != null) {
      return response()->json(['rsBody' => ['result' => $productdata, 'metalProductDetails' => $metalProductDetails, 'productMaterial' => $productMaterial]]);
    } else {
      return "no data found";
    }
  }

  public function getImage(Request $request)
  {

    $path = public_path() . '/images/' . 'JLRS01LR018WDWEM-1.JPG';
    return Response::download($path);
  }
}
