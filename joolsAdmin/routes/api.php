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
Route::Post('/productdata', 'ProductController\ProductController@index')->name('productdata');
Route::get('/getproductcategory','ProductController\ProductCategory@getProductCategory')->name('getproductcategory');
Route::Post('/getproductsubcategory','ProductController\ProductCategory@getProductSubCategory')->name('getproductsubcategory');
Route::get('/getproductdesigner','ProductController\ProductCategory@getProductDesigner')->name('getproductdesigner');
Route::Post('/addproduct','ProductController\AddProduct@addProduct')->name('addproduct');
Route::Post('/addmetal','ProductController\AddProduct@addMetal')->name('addmetal');

Route::get('/getmetalpurity','ProductController\ProductCategory@getMetalPurity')->name('getmetalpurity');

Route::Post('/addstone','ProductController\AddProduct@addStone')->name('addstone');

Route::Post('/pricecalculator','ProductController\AddProduct@priceCalCulator')->name('pricecalculator');
Route::Post('/getskulist','ProductController\AddProduct@priceCalCulator')->name('pricecalculator');

Route::get('/getstonetype','ProductController\ProductCategory@getStone')->name('getstonetype');

Route::Post('/getstoneshap','ProductController\ProductCategory@getStoneShap')->name('getstoneshap');

Route::Post('/getskulist','ProductController\GetProductDetails@getSkulist')->name('getskulist');

Route::Post('/getstonequality','ProductController\ProductCategory@getStoneQuality')->name('getstonequality');

Route::Post('/uploadfile','ProductController\AddProduct@uploadFile')->name('uploadfile');



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
