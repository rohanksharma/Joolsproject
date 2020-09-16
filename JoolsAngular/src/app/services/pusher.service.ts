import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from 'src/models/common-constant';
import { Observable } from 'rxjs';
import { IMessageRes } from 'src/models/messages';

declare const Pusher: any;

@Injectable({
    "providedIn": "root"
})

export class PusherService {
    pusher: any;
    channel: any;
    sendMessageChannel: any;

    constructor(private http: HttpClient) {
        let endPoint = localStorage.getItem('account_type') == 'employer' ? `${API_BASE_URL}/api/employer/pusher/auth` : `${API_BASE_URL}/api/freelancer/pusher/auth`;

        this.pusher = new Pusher(environment.pusher.key, {
            cluster: environment.pusher.cluster,
            encrypted: true,
            authEndpoint: `${endPoint}`,
            auth: {
                headers: {
                    // 'X-CSRF-Token': "SOME_CSRF_TOKEN",
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            }
        });

        this.pusher.logToConsole = true;
        // this.channel = this.pusher.subscribe('my-channel');
        this.channel = this.pusher.subscribe('private-messages');
        // this.sendMessageChannel = this.pusher.subscribe('private-messages');
    }

    public sendMessageEmployer(accessToken: string, taskId: string, receiverUserId: string, message: string): Observable<IMessageRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        let formData: FormData = new FormData();
        formData.append('task', taskId);
        formData.append('to_user', receiverUserId);
        formData.append('content', message);

        return this.http.post<IMessageRes>(`${API_BASE_URL}/api/employer/message/send`, formData, HttpUploadOptions);
    }

    public sendMessageFreelancer(accessToken: string, taskId: string, receiverUserId: string, message: string, groupId: string): Observable<IMessageRes> {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Authorization": `Bearer ${accessToken}` })
        }

        let formData: FormData = new FormData();
        formData.append('task', taskId);
        formData.append('to_user', receiverUserId);
        formData.append('content', message);
        formData.append('group_id', groupId);

        return this.http.post<IMessageRes>(`${API_BASE_URL}/api/freelancer/message/send`, formData, HttpUploadOptions);
    }

}

