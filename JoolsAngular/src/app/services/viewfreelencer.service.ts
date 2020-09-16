import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IFreelancerProfileRes } from 'src/models/freelancerProfile';
import { API_BASE_URL } from 'src/models/common-constant';
import { Observable } from 'rxjs/internal/Observable';
import { IViewfreelancerProfileRes } from 'src/models/viewfreelancerProfile';

@Injectable({
  providedIn: 'root'
})
export class ViewfreelencerService {

  constructor(private http: HttpClient) {

  }

  public getFreelancerProfile(slug: string): Observable<IViewfreelancerProfileRes> {
    return this.http.get<IViewfreelancerProfileRes>(`${API_BASE_URL}/api/freelancer-profile/${slug}`, {});
  }

  public getEmployerProfile(slug: string): Observable<IViewfreelancerProfileRes> {
    return this.http.get<IViewfreelancerProfileRes>(`${API_BASE_URL}/api/employer-profile/${slug}`, {});
  }


}
