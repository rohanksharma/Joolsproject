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

// This API use for Get Product variant and Comsume in shopify end   
Route::Post('/productdata', 'ProductController\ProductController@getProductVariant')->name('productdata');

// This API use for Get Product Image and Comsume in shopify end 
Route::get('/getimage','ProductController\ProductController@getImage')->name('getimage');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
