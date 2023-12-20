import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
const baseUrl = 'http://localhost:3333/api/check_login';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private httpClient: HttpClient) {

    }
    login(data: any): Observable<any> {
        return this.httpClient.post(baseUrl, data);
    }
}