import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IEmployerProfileRes, IEmployerProfileData, IUserProfileRes } from 'src/models/employerProfile';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/models/common-constant';
import { ILoginRes } from 'src/models/login';
import { IFreelancerProfileRes, IFreelancerProfileData } from 'src/models/freelancerProfile';
import { IFreelancerDashboardRes, IEmployerDashboardRes } from 'src/models/dashboard';


@Injectable({
    providedIn: 'root'
})

export class DashboardService {

    constructor(private http: HttpClient) {

    }

    public getEmployerProfile(accessToken: string): Observable<IEmployerProfileRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        return this.http.get<IEmployerProfileRes>(`${API_BASE_URL}/api/employer/user`, HttpUploadOptions);
    }

    public updateEmployerProfile(accessToken: string, imageFile: File, profile: IEmployerProfileData): Observable<ILoginRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        let formData: FormData = new FormData();
        formData.append('first_name', profile.firstName);
        formData.append('last_name', profile.lastName);
        formData.append('address', profile.address);
        formData.append('phone', profile.phone);
        if (imageFile != null)
            formData.append('profile_image', imageFile[0]);

        if (profile.twitter != null && profile.twitter != '')
            formData.append('twitter_profile', profile.twitter);

        if (profile.github != null && profile.github != '')
            formData.append('github_profile', profile.github);

        formData.append('about_company', profile.info);
        formData.append('address2', profile.address2);
        formData.append('city', profile.city);
        formData.append('state', profile.state);
        formData.append('country', profile.country);
        formData.append('zip', profile.zip);

        return this.http.post<ILoginRes>(`${API_BASE_URL}/api/employer/user/profile/change`, formData, HttpUploadOptions);
    }

    public getFreelancerProfile(accessToken: string): Observable<IFreelancerProfileRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        return this.http.get<IFreelancerProfileRes>(`${API_BASE_URL}/api/freelancer/user`, HttpUploadOptions);
    }

    public updateFreelancerProfile(accessToken: string, imageFile: File, profile: IFreelancerProfileData): Observable<ILoginRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        let formData: FormData = new FormData();
        formData.append('first_name', profile.firstName);
        formData.append('last_name', profile.lastName);
        formData.append('address', profile.address);
        formData.append('phone', profile.phone);
        if (imageFile != null)
            formData.append('profile_image', imageFile[0]);
        formData.append('twitter_profile', profile.twitter);
        formData.append('github_profile', profile.github);
        formData.append('about_me', profile.about_me);
        formData.append('tagline', profile.tagline);
        formData.append('hourly_rate', profile.hourly_rate.toString());
        formData.append('address2', profile.address2.toString());
        formData.append('city', profile.city.toString());
        formData.append('state', profile.state.toString());
        formData.append('country', profile.country.toString());
        formData.append('zip', profile.zip.toString());

        return this.http.post<ILoginRes>(`${API_BASE_URL}/api/freelancer/user/profile/change`, formData, HttpUploadOptions);
    }

    public getEmployerProfileByEmail(slug: string): Observable<IUserProfileRes> {
        return this.http.get<IUserProfileRes>(`${API_BASE_URL}/api/employer-profile/${slug}`);
    }

    public getFreelancerProfileByEmail(slug: string): Observable<IUserProfileRes> {
        return this.http.get<IUserProfileRes>(`${API_BASE_URL}/api/freelancer-profile/${slug}`);
    }

    public getFreelancerDashboard(accessToken: string): Observable<IFreelancerDashboardRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }
        return this.http.get<IFreelancerDashboardRes>(`${API_BASE_URL}/api/freelancer/dashboard`, HttpUploadOptions);
    }

    public getEmployerDashboard(accessToken: string): Observable<IEmployerDashboardRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }
        return this.http.get<IEmployerDashboardRes>(`${API_BASE_URL}/api/employer/dashboard`, HttpUploadOptions);
    }

}