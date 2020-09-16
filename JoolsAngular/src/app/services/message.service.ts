import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/models/common-constant';
import { IMessageGroupRes, IMessageGroupChatRes, IMessageGroupChatInfoRes } from 'src/models/messages';


@Injectable({
    providedIn: 'root'
})

export class MessagesService {

    constructor(private http: HttpClient) {
    }

    public getEmployerMessageGroupsList(accessToken: string): Observable<IMessageGroupRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        return this.http.post<IMessageGroupRes>(`${API_BASE_URL}/api/employer/message`, {}, HttpUploadOptions);
    }

    public getFreelancerMessageGroupsList(accessToken: string): Observable<IMessageGroupRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        return this.http.post<IMessageGroupRes>(`${API_BASE_URL}/api/freelancer/message`, {}, HttpUploadOptions);
    }

    public getEmployerGroupChatList(accessToken: string, groupId: string, taskId: string): Observable<IMessageGroupChatRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        var formData = new FormData();
        formData.append("group_id", groupId);
        formData.append("task_id", taskId);

        return this.http.post<IMessageGroupChatRes>(`${API_BASE_URL}/api/employer/message/chat`, formData, HttpUploadOptions);
    }

    public getFreelancerGroupChatList(accessToken: string, groupId: string, taskId: string): Observable<IMessageGroupChatRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        var formData = new FormData();
        formData.append("group_id", groupId);
        formData.append("task_id", taskId);

        return this.http.post<IMessageGroupChatRes>(`${API_BASE_URL}/api/freelancer/message/chat`, formData, HttpUploadOptions);
    }

    public getEmployerGroupChatInfo(accessToken: string, groupId: string, taskId: string): Observable<IMessageGroupChatInfoRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        var formData = new FormData();
        formData.append("group_id", groupId);
        formData.append("task_id", taskId);

        return this.http.post<IMessageGroupChatInfoRes>(`${API_BASE_URL}/api/employer/message/chat_info`, formData, HttpUploadOptions);
    }

    public getFreelancerGroupChatInfo(accessToken: string, groupId: string, taskId: string): Observable<IMessageGroupChatInfoRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        var formData = new FormData();
        formData.append("group_id", groupId);
        formData.append("task_id", taskId);

        return this.http.post<IMessageGroupChatInfoRes>(`${API_BASE_URL}/api/freelancer/message/chat_info`, formData, HttpUploadOptions);
    }


}