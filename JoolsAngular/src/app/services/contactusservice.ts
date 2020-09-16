import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/models/common-constant';
import { IPostContact, IPostContactRes } from 'src/models/postContact';
import { IPostTaskRes } from 'src/models/postTask';


@Injectable({
    providedIn: 'root'
})

export class ContactusService {

    constructor(private http: HttpClient) {
    }

    public postContactUs(contact: IPostContact): Observable<IPostTaskRes> {
        let formData: FormData = new FormData();
        formData.append('name', contact.name);
        formData.append('email', contact.email);
        formData.append('subject', contact.subject);
        formData.append('phone', contact.phone.toString());
        formData.append('message', contact.message);

        return this.http.post<IPostContactRes>(`${API_BASE_URL}/api/contact_us/send`, formData, {});
    }
}