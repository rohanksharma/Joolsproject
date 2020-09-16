import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from 'src/models/common-constant';
import { Observable } from 'rxjs/internal/Observable';
import { IMessageRes, IResData } from 'src/models/messages';

@Injectable({
  providedIn: 'root'
})
export class AddService{

  constructor(private http: HttpClient,) {

  }



  public bookMarkedFreelancer(accessToken: string, bookmark_to_id: string, bookmark_type: string): Observable<IMessageRes> {
    const HttpUploadOptions = {
      headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
    }
    var formData = new FormData();
    formData.append("bookmark_to_id", bookmark_to_id);
    formData.append("bookmark_type", bookmark_type);
    return this.http.post<IMessageRes>(`${API_BASE_URL}/api/freelancer/bookmarks/create`, formData, HttpUploadOptions);
  }


  // public category(): Observable<IMessageRes> {
  //   // const HttpUploadOptions = {
  //   //     headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
  //   // }
  //   // var formData = new FormData();
  //   // formData.append("bookmark_to_id", bookmark_to_id);
  //   // formData.append("bookmark_type", bookmark_type);
  //   return this.http.post<IMessageRes>(`${API_BASE_URL}/api/freelancer/bookmarks/create`,);
  // }

  public productCategory(): Observable<IMessageRes>{
    return this.http.get<IMessageRes>(`${API_BASE_URL}/api/getproductcategory`);
  }


  public productSubCategory(category :string): Observable<IMessageRes>{
    var formData = new FormData();
    formData.append("category", category);
    return this.http.post<IMessageRes>(`${API_BASE_URL}/api/getproductsubcategory`,formData);
  }
  

  public getProductDesigner() : Observable<IMessageRes>{
      return this.http.get<IMessageRes>(`${API_BASE_URL}/api/getproductdesigner`);
  }


  public addproduct(productData :any): Observable<IResData>{
     var formData = new FormData();
         localStorage.setItem('shopifyproduct_id',productData['shopifyproduct_id']);
          formData.append("category", productData['category']);
          formData.append("shopifyproduct_id", productData['shopifyproduct_id']);
          formData.append("description", productData['description']);
          formData.append("designer", productData['designer']);
          formData.append("dimension", productData['dimension']);
          formData.append("height", productData['height']);
          formData.append("length", productData['length']);
          formData.append("width", productData['width']);
          formData.append("product_title", productData['product_title']);
          formData.append("subcategory", productData['subcategory']);
          formData.append("tags",productData['tags']);
       return this.http.post<IResData>(`${API_BASE_URL}/api/addproduct`,formData);
  }


      public getMetalPurity() : Observable<IMessageRes>{
          return this.http.get<IMessageRes>(`${API_BASE_URL}/api/getmetalpurity`);
      }
    
   public addMetal(selectedMetalPurity:any,purityWt:string,metalWt:string,addMetalflag:string): Observable<IResData>{
             var formData = {};
           formData["metalWt"]=metalWt;
           formData["selectedMetalPurity"]=selectedMetalPurity;
           formData["purityWt"]=purityWt;
           formData["addStoneFlag"]=addMetalflag;
           formData["shopifyproduct_id"] = localStorage.getItem('shopifyproduct_id');
          return this.http.post<IResData>(`${API_BASE_URL}/api/addmetal`,formData);
     }



     public addStone(formData:any): Observable<IResData>{
      formData["shopifyproduct_id"] = localStorage.getItem('shopifyproduct_id');
          console.log(formData);
        return this.http.post<IResData>(`${API_BASE_URL}/api/addstone`,formData);
    }

    public getStoneType() : Observable<IMessageRes>{
      return this.http.get<IMessageRes>(`${API_BASE_URL}/api/getstonetype`);
    }
     

    public getStoneShap(stone_code:string) : Observable<IMessageRes>{
      var formData = {};
      formData["stone_code"]=stone_code;
      return this.http.post<IMessageRes>(`${API_BASE_URL}/api/getstoneshap`,formData);
    }


    public priceCalCulator(shopifyproduct_id:any): Observable<IResData>{
         var formData = {};
         formData["shopifyproduct_id"] = localStorage.getItem('shopifyproduct_id');
    return this.http.post<IResData>(`${API_BASE_URL}/api/pricecalculator`,formData);
   }
   
   
   public getStoneQuality(stone_code:string): Observable<IResData>{
        var formData = {};
        console.log(stone_code);
        formData["stone_code"]=stone_code;
        return this.http.post<IResData>(`${API_BASE_URL}/api/getstonequality`,formData);
    }

    public uploadFile(Images:any,imageType:any): Observable<IResData>{
        var formData = {};
        formData["images"] = Images;
        formData["imageType"] = imageType;
        formData["shopifyproduct_id"]  =  localStorage.getItem('shopifyproduct_id');
        return this.http.post<IResData>(`${API_BASE_URL}/api/uploadfile`,formData);
    }
    
}
