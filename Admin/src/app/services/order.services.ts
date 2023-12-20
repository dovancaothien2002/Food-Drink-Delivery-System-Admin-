import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3333/api/';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) { }

    // getAll() {
    //     return this.http.get<any>(baseUrl+'/list_orderss');
    // }

    getById(id: any): Observable<any> {
        return this.http.get(`${baseUrl}list_by_Id/${id}`);
    }

    getListOrderDetailById(id: any): Observable<any> {
        return this.http.get(`${baseUrl}list_orderDetail/${id}`);
    }

    updateStatus(data: any): Observable<any> {
        return this.http.put(baseUrl+'update-order', data);
    }

    delete(id: any): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
    }

    findByName(name: any): Observable<any> {
        return this.http.get<any>(baseUrl + '-check/' + name);
    }

    findByStatus(status: any): Observable<any> {
        return this.http.get<any>(`${baseUrl}list_by_status/${status}`);
    }

}