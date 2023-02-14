import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/store/store.service'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  domain_api: any;
  token: any;
  user_data: any;
  constructor(private http: HttpClient) {
    this.domain_api = environment.api.domain_api
    this.token = localStorage.getItem("token");
  }

  changeCart(products: any, user_data: any): Observable<any> {
    let token = localStorage.getItem("token");

    const uri = '/cart'
    const url = this.domain_api + uri
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
    let body = {
      user_id: user_data.id,
      products: products
    }
    return this.http.post(url, body, httpOptions);
  }

  getCart(user_data: any): Observable<any> {
    const uri = `/cart?user_id=${user_data.id}`
    const url = this.domain_api + uri
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user_data.token}`
      })
    }
    return this.http.get(url, httpOptions);
  }

  postOrder(products: any, user_data: any): Observable<any> {
    const uri = `/order`
    const url = this.domain_api + uri
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user_data.token}`
      })
    }
    let body = {
      user_id: user_data.id,
      products: products
    }
    return this.http.post(url, body, httpOptions);
  }

  getOrder(user_data: any): Observable<any> {
    const uri = `/order?user_id=${user_data.id}`
    const url = this.domain_api + uri    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user_data.token}`
      })
    }
    return this.http.get(url, httpOptions)
  }

}
