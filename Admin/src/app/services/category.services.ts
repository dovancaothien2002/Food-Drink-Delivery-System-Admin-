import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

const baseUrl = 'http://localhost:3333/api/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>('http://localhost:3333/api/categories');
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
    checkDelete(cat_id: any): Observable<any> {
        return this.http.get<any>(baseUrl + '_checkDelete/' + cat_id);
    }
    findByName2(name: any,cat_id:any): Observable<any> {
        return this.http.get<any>(baseUrl + '_checkEdit/' + cat_id + '/' + name);
    }
}