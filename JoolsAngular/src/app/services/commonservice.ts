import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICategoryListRes } from 'src/models/categoryList';
import { API_BASE_URL } from 'src/models/common-constant';
import { Observable } from 'rxjs';
import { ISkillListRes } from 'src/models/skillList';
import { IFeaturedJobsRes } from 'src/models/featuredJobs';
import { ILocationRes } from 'src/models/locationList';


@Injectable({
    providedIn: 'root'
})

export class CommonService {
    constructor(private http: HttpClient) {
    }

    public getCategoryList(): Observable<ICategoryListRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Content-Type": `application/x-www-form-urlencoded` })
        }

        return this.http.post<ICategoryListRes>(`${API_BASE_URL}/api/category`, {});
    }

    public getSkillList(): Observable<ISkillListRes> {
        return this.http.post<ISkillListRes>(`${API_BASE_URL}/api/skill`, {});
    }

    public getHomePageData(): Observable<IFeaturedJobsRes> {
        return this.http.post<IFeaturedJobsRes>(`${API_BASE_URL}/api/home?`, {});
    }

    public getLocationList(): Observable<ILocationRes> {
        return this.http.post<ILocationRes>(`${API_BASE_URL}/api/locations`, {});
    }
}