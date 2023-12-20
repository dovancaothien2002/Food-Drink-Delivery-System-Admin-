import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3333/api/product';
const urlCate = 'http://localhost:3333/api/categories';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(baseUrl);
    }
    getCategories() {
        return this.http.get<any>(urlCate);
    }

    getById(id: any): Observable<any> {
        return this.http.get(`${baseUrl}/${id}`);
    }

    getById2(id: any): Observable<any> {
        return this.http.get(`${baseUrl}-detail/${id}`);
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
    findByName2(name: any,prod_id:any): Observable<any> {
        return this.http.get<any>(baseUrl + '_checkEdit/' + prod_id + '/' + name);
    }
    checkDelete(prod_id: any): Observable<any> {
        return this.http.get<any>(baseUrl + '_checkDelete/' + prod_id);
    }
}