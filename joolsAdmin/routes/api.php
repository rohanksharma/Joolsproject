<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// All API Comsume by the joolsAdmin App

//
Route::Post('/productdata', 'ProductController\ProductController@index')->name('productdata');

//this API fetch Get Product Category 
Route::get('/getproductcategory','ProductController\ProductCategory@getProductCategory')->name('getproductcategory');

//this API fetch Get Product subcategory 
Route::Post('/getproductsubcategory','ProductController\ProductCategory@getProductSubCategory')->name('getproductsubcategory');

//this API fetch Get Product Designer
Route::get('/getproductdesigner','ProductController\ProductCategory@getProductDesigner')->name('getproductdesigner');

//this API add product variants details 
Route::Post('/addproduct','ProductController\AddProduct@addProduct')->name('addproduct');

//this API add product metal for diffrent variants 
Route::Post('/addmetal','ProductController\AddProduct@addMetal')->name('addmetal');

//This API Get Metal Purity 
Route::get('/getmetalpurity','ProductController\ProductCategory@getMetalPurity')->name('getmetalpurity');

//this API add Stone for diffrent Variants  
Route::Post('/addstone','ProductController\AddProduct@addStone')->name('addstone');

//this API for product priceCalulator 
Route::Post('/pricecalculator','ProductController\AddProduct@priceCalCulator')->name('pricecalculator');


//this API for get stone type 
Route::get('/getstonetype','ProductController\ProductCategory@getStone')->name('getstonetype');


//this API for get stone Shap 
Route::Post('/getstoneshap','ProductController\ProductCategory@getStoneShap')->name('getstoneshap');

//this API get sku list 
Route::Post('/getskulist','ProductController\GetProductDetails@getSkulist')->name('getskulist');


//this API get stone Quality 
Route::Post('/getstonequality','ProductController\ProductCategory@getStoneQuality')->name('getstonequality');

// this Api use for upload the product metal finish
Route::Post('/uploadfile','ProductController\AddProduct@uploadFile')->name('uploadfile');



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
