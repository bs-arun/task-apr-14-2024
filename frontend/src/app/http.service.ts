import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = 'http://127.0.0.1:3151/';

  constructor(private http: HttpClient) { }

  getRequest(url: any): Observable<any> {
    var headers: any = new Headers();
    const token = sessionStorage.getItem("accessToken")?.toString()
    headers.append("authorization", token);
    return this.http.get(this.apiUrl + url, {"headers": headers});
  }

  postRequest(url: any, params: any): Observable<any> {
    return this.http.post(this.apiUrl + url, params);
  }

}