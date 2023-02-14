import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  domain_api: any;
  token: any;
  constructor(private http: HttpClient) {
    this.domain_api = environment.api.domain_api
    this.token = localStorage.getItem("token");
  }

  getProducrt(): Observable<any> {
    const uri = '/products'
    const url = this.domain_api + uri
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.http.get(url, httpOptions);
  }

  getProducrtById(product_id: any): Observable<any> {
    const uri = '/product'
    const url = this.domain_api + uri
    const body = { product_id: product_id }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.http.post(url, body, httpOptions);
  }
}
