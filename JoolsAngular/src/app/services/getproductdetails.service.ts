import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMessageRes } from 'src/models/messages';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/models/common-constant';

@Injectable({
  providedIn: 'root'
})
export class GetproductdetailsService {

  
  constructor(private http: HttpClient,) {
      
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

      public getSkuList(productsku :number): Observable<IMessageRes>{
        var formData ={};
        formData["shopifyproduct_id"]=productsku;
        return this.http.post<IMessageRes>(`${API_BASE_URL}/api/getskulist`,formData);
      }  
}
