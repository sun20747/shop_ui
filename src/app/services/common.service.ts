import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  domain_api: any;
  token: any;
  constructor(private http: HttpClient) {
    this.domain_api = environment.api.domain_api
    this.token = localStorage.getItem("refresh_token");
  }

  refresh_token(): Observable<any> {
    const uri = '/refresh_token'
    const url = this.domain_api + uri
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.http.post(url, {}, httpOptions)
  }
}
