import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  domain_api: any;
  constructor(private http: HttpClient) {
    this.domain_api = environment.api.domain_api
  }

  signin(email: string, password: string): Observable<any> {
    const uri = '/signin'
    const url = this.domain_api + uri
    const body = { email: email, password: password }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post(url, body, httpOptions);
  }

  signup(body_data: any): Observable<any> {
    const uri = '/signup'
    const url = this.domain_api + uri
    const body = body_data
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post(url, body, httpOptions);
  }
}
