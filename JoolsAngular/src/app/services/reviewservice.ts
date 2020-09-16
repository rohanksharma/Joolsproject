import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from 'src/models/common-constant';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class ReviewService {
    constructor(private http: HttpClient) {
    }

    public addEmployerReview(accessToken: string, userId: string, title: string, deliveredOnBudget: string, deliveredOnTime: string, rating: string, taskId: string): Observable<any> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        var formData = new FormData();
        formData.append("user", userId);
        formData.append("title", title);
        formData.append("delivered_on_budget", deliveredOnBudget);
        formData.append("delivered_on_time", deliveredOnTime);
        formData.append("rating", rating);
        formData.append("task", taskId);

        return this.http.post<any>(`${API_BASE_URL}/api/freelancer/review/create`, formData, HttpUploadOptions);
    }

    public addFreelancerReview(accessToken: string, userId: string, title: string, deliveredOnBudget: string, deliveredOnTime: string, rating: string, taskId: string): Observable<any> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        var formData = new FormData();
        formData.append("user", userId);
        formData.append("title", title);
        formData.append("delivered_on_budget", deliveredOnBudget);
        formData.append("delivered_on_time", deliveredOnTime);
        formData.append("rating", rating);
        formData.append("task", taskId);

        return this.http.post<any>(`${API_BASE_URL}/api/employer/review/create`, formData, HttpUploadOptions);
    }
}