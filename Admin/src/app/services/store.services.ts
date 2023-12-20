import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3333/api/store';

@Injectable({
    providedIn: 'root'
})
export class StoreService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(baseUrl);
    }

    getById(id: any): Observable<any> {
        return this.http.get(`${baseUrl}/${id}`);
    }

    create(data: any): Observable<any> {
        return this.http.post(baseUrl, data);
    }

    update(id: any, data: any): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, data);
    }

    delete(id: any): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
    }
    
    findByName(name: any): Observable<any> {
        return this.http.get<any>(baseUrl + '-check/' + name);
    }
    findByName2(name: any,store_id:any): Observable<any> {
        return this.http.get<any>(baseUrl + '-check2/' + name + '/' + store_id);
    }
    checkDelete(order_id: any): Observable<any> {
        return this.http.get<any>(baseUrl + '_checkDelete/' + order_id);
    }
}