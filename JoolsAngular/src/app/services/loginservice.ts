import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILogin, ILoginRes } from 'src/models/login';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/models/common-constant';

const HttpUploadOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" })
}

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    constructor(private http: HttpClient) {
    }

    public authenticateEmployer(email: string, password: string): Observable<ILoginRes> {
        let formData: FormData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        return this.http.post<ILoginRes>(`${API_BASE_URL}/api/employer/login`, formData);
    }

    public registerEmployer(firstName: string, lastName: string, email: string, password: string, confirmPassword: string, phone: string, address: string): Observable<ILoginRes> {
        let formData: FormData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', confirmPassword);
        formData.append('phone', phone);
        formData.append('address', address);

        return this.http.post<ILoginRes>(`${API_BASE_URL}/api/employer/register`, formData);
    }

    public employerLogout(accessToken: string) {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }
        return this.http.get(`${API_BASE_URL}/api/employer/logout`, HttpUploadOptions);
    }

    public authenticateFreelancer(email: string, password: string): Observable<ILoginRes> {
        let formData: FormData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        return this.http.post<ILoginRes>(`${API_BASE_URL}/api/freelancer/login`, formData);
    }

    public registerFreelancer(firstName: string, lastName: string, email: string, password: string, confirmPassword: string, phone: string, address: string): Observable<ILoginRes> {
        let formData: FormData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', confirmPassword);
        formData.append('phone', phone);
        formData.append('address', address);

        return this.http.post<ILoginRes>(`${API_BASE_URL}/api/freelancer/register`, formData);
    }

    public freelancerLogout(accessToken: string) {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }
        return this.http.get(`${API_BASE_URL}/api/freelancer/logout`, HttpUploadOptions);
    }


    public changeFreelancerPassword(accessToken: string, password: string, confirmPassword: string, oldPassword: string): Observable<ILoginRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        let formData: FormData = new FormData();
        formData.append('old_password', oldPassword);
        formData.append('password', password);
        formData.append('password_confirmation', confirmPassword);

        return this.http.post<ILoginRes>(`${API_BASE_URL}/api/freelancer/user/password/change`, formData, HttpUploadOptions);
    }

    public changeEmployerPassword(accessToken: string, password: string, confirmPassword: string, oldPassword: string): Observable<ILoginRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        let formData: FormData = new FormData();
        formData.append('old_password', oldPassword);
        formData.append('password', password);
        formData.append('password_confirmation', confirmPassword);

        return this.http.post<ILoginRes>(`${API_BASE_URL}/api/employer/user/password/change`, formData, HttpUploadOptions);
    }

    public forgotPassword(email: string): Observable<ILoginRes> {
        let formData: FormData = new FormData();
        formData.append('email', email);

        return this.http.post<ILoginRes>(`${API_BASE_URL}/api/password/create`, formData, {});
    }

}