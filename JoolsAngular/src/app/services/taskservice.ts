import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/models/common-constant';
import { IPostTask, IPostTaskRes, IPostTaskChangeStatusRes } from 'src/models/postTask';
import { ITaskListRes, ITaskViewRes, IBrowseTaskListRes, IBrowseTaskDetailsRes, IPlaceBidRes, IActiveBidRes, ITaskBidderListRes, ITaskCounterRes, IBidCounterRes, ISearchByRangeRes, ITaskStatisticRes } from 'src/models/taskList';
import { IFreelancerWorkHistoryRes } from 'src/models/workHistory';
import { IBookmarkedRes } from 'src/models/bookMarkedList';
import { StarTemplateContext } from '@ng-bootstrap/ng-bootstrap/rating/rating';


@Injectable({
    providedIn: 'root'
})

export class TaskService {

    constructor(private http: HttpClient) {
    }

    public postTask(task: IPostTask, accessToken: string, id: string, uploadedFiles: File[]): Observable<IPostTaskRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }


        let files = uploadedFiles;

        let url = `${API_BASE_URL}/api/employer/task/create`;
        let formData: FormData = new FormData();
        formData.append('name', task.name);
        formData.append('location', task.location);
        formData.append('minimum', task.minimum.toString());
        formData.append('maximum', task.maximum.toString());
        formData.append('category', task.category.toString());
        formData.append('skills', task.skills.join(','));
        formData.append('task_info', task.task_info);
        formData.append('task_type', task.task_type);

        if (files != null && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formData.append("task_attachments[]", files[i], files[i]['name']);
            }
        }

        if (id != null && id != '') {
            formData.append('task_id', id);
            url = `${API_BASE_URL}/api/employer/task/update`;
        }
        return this.http.post<IPostTaskRes>(`${url}`, formData, HttpUploadOptions);
    }

    public getTaskList(accessToken: string, pageIndex: number, recordsPerPage: number, filter?: string): Observable<ITaskListRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        var formData = new FormData();
        if (filter == 'active') {
            formData.append("status", 'active');
            return this.http.post<ITaskListRes>(`${API_BASE_URL}/api/employer/task?page=${pageIndex}&per_page=${recordsPerPage}`, formData, HttpUploadOptions);
        }
        else {
            return this.http.post<ITaskListRes>(`${API_BASE_URL}/api/employer/task?page=${pageIndex}&per_page=${recordsPerPage}`, {}, HttpUploadOptions);
        }
    }

    public getTaskById(accessToken: string, id: string): Observable<ITaskViewRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        var formData = new FormData();
        formData.append("id", id);

        return this.http.post<ITaskViewRes>(`${API_BASE_URL}/api/employer/task/view`, formData, HttpUploadOptions);
    }

    public changeTaskStatus(accessToken: string, id: string, status: string): Observable<IPostTaskChangeStatusRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        var formData = new FormData();
        formData.append("id", id);
        formData.append("status_type", status);

        return this.http.post<IPostTaskChangeStatusRes>(`${API_BASE_URL}/api/employer/task/status`, formData, HttpUploadOptions);
    }

    public bookMarkedEmployer(accessToken: string, bookmark_to_id: string, bookmark_type: string): Observable<IBookmarkedRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }
        var formData = new FormData();
        formData.append("bookmark_to_id", bookmark_to_id);
        formData.append("bookmark_type", bookmark_type);
        return this.http.post<IBookmarkedRes>(`${API_BASE_URL}/api/employer/bookmarks/create`, formData, HttpUploadOptions);
    }

    public getFreelancerActiveTaskList(page: number, perPageRecords: number, location: number[], category: number[], skills: number[], fixedPriceRange: number[], hourlyPriceRange: number[], projectTitle: string, fixedProject: string, hourlyProject: string, loggedInUserId?: string): Observable<IBrowseTaskListRes> {
        var formData = new FormData();
        if (location != null && location.length > 0)
            formData.append("location", location.join(','));

        if (category != null && category.length > 0)
            formData.append("category", category.join(','));

        if (skills != null && skills.length > 0)
            formData.append("skills", skills.join(','));

        if (fixedPriceRange != null && fixedPriceRange.length > 0)
            formData.append("fix_price_range", fixedPriceRange.toString());

        if (hourlyPriceRange != null && hourlyPriceRange.length > 0)
            formData.append("hourly_rate_range", hourlyPriceRange.toString());

        if (projectTitle != null && projectTitle != '')
            formData.append("name", projectTitle);

        if (loggedInUserId != null && loggedInUserId != '')
            formData.append("logged_user_id", loggedInUserId);
        else
            formData.append("logged_user_id", "0");

        if (fixedProject != null && fixedProject != '')
            formData.append("project_type", "1");
        else if (hourlyProject != null && hourlyProject != '')
            formData.append("project_type", "2");

        return this.http.post<IBrowseTaskListRes>(`${API_BASE_URL}/api/search?page=${page}&per_page=${perPageRecords}`, formData);
    }

    public getFreelancerTaskDetails(slug: string): Observable<IBrowseTaskDetailsRes> {
        return this.http.get<IBrowseTaskDetailsRes>(`${API_BASE_URL}/api/task/${slug}`, {});
    }

    public placeBid(accessToken: string, id: string, slug: string, deliveryTime: string, deliveryType: string, bidRate: string, description: string): Observable<IPlaceBidRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        var formData = new FormData();
        formData.append("task", id);
        formData.append("delivery_time", deliveryTime);
        formData.append("delivery_type", deliveryType);
        formData.append("bid_rate", bidRate);
        formData.append("description", description);

        return this.http.post<IPlaceBidRes>(`${API_BASE_URL}/api/freelancer/bid/apply/${slug}`, formData, HttpUploadOptions);
    }

    public getActiveBids(accessToken: string): Observable<IActiveBidRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        return this.http.get<IActiveBidRes>(`${API_BASE_URL}/api/freelancer/bid/active`, HttpUploadOptions);
    }

    public getTaskBidderList(accessToken: string, slug: string): Observable<ITaskBidderListRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        return this.http.get<ITaskBidderListRes>(`${API_BASE_URL}/api/employer/task/${slug}/bidder`, HttpUploadOptions);
    }

    public changeTaskBidStatus(accessToken: string, slug: string, id: string, status: string): Observable<IPostTaskChangeStatusRes> {

        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        var formData = new FormData();
        formData.append("id", id);
        formData.append("status_type", status);

        return this.http.post<IPostTaskChangeStatusRes>(`${API_BASE_URL}/api/employer/task/${slug}/bidder/status`, formData, HttpUploadOptions);
    }

    public updateTaskBidDetails(accessToken: string, id: string, deliveryTime: string, deliveryType: string, bidRate: string, description: string): Observable<IPlaceBidRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        var formData = new FormData();
        formData.append("id", id);
        formData.append("delivery_time", deliveryTime);
        formData.append("delivery_type", deliveryType);
        formData.append("bid_rate", bidRate);
        formData.append("description", description);

        return this.http.post<IPlaceBidRes>(`${API_BASE_URL}/api/freelancer/bid/edit`, formData, HttpUploadOptions);
    }


    public changeBidStatus(accessToken: string, id: string, status: string): Observable<IPostTaskChangeStatusRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        var formData = new FormData();
        formData.append("id", id);
        formData.append("status_type", status);

        return this.http.post<IPostTaskChangeStatusRes>(`${API_BASE_URL}/api/freelancer/bid/status`, formData, HttpUploadOptions);
    }

    public freelancerWorkHistory(accessToken: string, user_id: string): Observable<IFreelancerWorkHistoryRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }
        var formData = new FormData();
        formData.append("user_id", user_id);

        return this.http.post<IFreelancerWorkHistoryRes>(`${API_BASE_URL}/api/freelancer-work-history`, formData, HttpUploadOptions);
    }

    public completedBids(accessToken: string): Observable<IActiveBidRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }
        return this.http.get<IActiveBidRes>(`${API_BASE_URL}/api/freelancer/bid/complete`, HttpUploadOptions);
    }

    public getTaskBidderListPublic(slug: string): Observable<ITaskBidderListRes> {
        return this.http.get<ITaskBidderListRes>(`${API_BASE_URL}/api/task/${slug}/bidder`);
    }

    public getTaskCounterPublic(slug: string): Observable<ITaskCounterRes> {
        return this.http.get<ITaskCounterRes>(`${API_BASE_URL}/api/task/${slug}/bidder?statistic=1`);
    }

    public getTaskCounter(accessToken: string): Observable<ITaskStatisticRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }
        return this.http.get<ITaskStatisticRes>(`${API_BASE_URL}/api/employer/task/statistic`, HttpUploadOptions);
    }

    public getBidsCounter(accessToken: string): Observable<IBidCounterRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }
        return this.http.get<IBidCounterRes>(`${API_BASE_URL}/api/freelancer/bid/statistic`, HttpUploadOptions);
    }

    public filterTaskByRange(): Observable<ISearchByRangeRes> {
        return this.http.post<ISearchByRangeRes>(`${API_BASE_URL}/api/filter/range`, {});
    }

    public getTaskProjectCounter(): Observable<ITaskStatisticRes> {
        return this.http.post<ITaskStatisticRes>(`${API_BASE_URL}/api/task/counter`, {});
    }

    public getCompletedTaskList(accessToken: string, pageIndex: number, recordsPerPage: number, filter?: string): Observable<ITaskListRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        return this.http.post<ITaskListRes>(`${API_BASE_URL}/api/employer/task/complete?page=${pageIndex}&per_page=${recordsPerPage}`, {}, HttpUploadOptions);
    }

    public employerTaskReview(user_id: string): Observable<IFreelancerWorkHistoryRes> {
        var formData = new FormData();
        formData.append("user_id", user_id);

        return this.http.post<IFreelancerWorkHistoryRes>(`${API_BASE_URL}/api/employer-task-review`, formData, {});
    }

}