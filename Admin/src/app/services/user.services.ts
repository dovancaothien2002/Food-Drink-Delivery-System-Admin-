import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3333/api/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(baseUrl);
    }

    findByName(name: any): Observable<any> {
        return this.http.get<any>(baseUrl + '-check/' + name);
    }

    getById(id: any): Observable<any> {
        return this.http.get(`${baseUrl}/${id}`);
    }
   

}