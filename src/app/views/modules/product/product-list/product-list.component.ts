import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service'
import { CommonService } from 'src/app/services/common.service'
import { StoreService } from 'src/app/store/store.service'
import { } from '@angular/core'
import * as _ from 'lodash'
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  main_products: any[] = [];
  product_list: any[] = [];
  max: any = 5;
  rate: any = 4;
  category: any;
  cart_data: any[] = [];

  @ViewChild('swalSuccess', { static: false }) private swalSuccess: SwalComponent;

  constructor(private productSer: ProductService, private router: Router, private store: StoreService) {
    this.store.cart$.subscribe(cart => this.cart_data = cart)
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productSer.getProducrt().subscribe(res => {
      if (res.code) {
        this.store.increaseProduct(res.data);
      }
    }, err => { })

    this.store.category$.subscribe(category => {
      this.category = category;
      if (!this.category) {
        this.store.product$.subscribe(product => {
          this.product_list = product;
          this.main_products = product;
        })
      } else {
        this.store.product$.subscribe(product => {
          this.product_list = product.filter(p => p.category === this.category);
        })
      }
    })
    this.sortPrice();
    this.sortRating();
  }

  sortRating() {
    this.store.rate$.subscribe(rate => {
      if (rate === 0) this.product_list = this.main_products
      if (rate === 1) this.product_list = this.main_products.filter(p => p.rating.rate >= 1 && p.rating.rate < 2)
      if (rate === 2) this.product_list = this.main_products.filter(p => p.rating.rate >= 2 && p.rating.rate < 3)
      if (rate === 3) this.product_list = this.main_products.filter(p => p.rating.rate >= 3 && p.rating.rate < 4)
      if (rate === 4) this.product_list = this.main_products.filter(p => p.rating.rate >= 4 && p.rating.rate < 5)
      if (rate === 5) this.product_list = this.main_products.filter(p => p.rating.rate === 5)
    })
  }

  sortPrice() {
    this.store.price$.subscribe(price_id => {
      price_id === 0 ? this.product_list :
        price_id === 1 ? this.product_list = _.orderBy(this.product_list, ['price'], ['asc']) :
          this.product_list = _.orderBy(this.product_list, ['price'], ['desc'])
    })
  }

  productDetail(product: any) {
    this.router.navigate(['shop/product-detail', product._id])
  }

  inCart(product: any) {
    let p = this.cart_data.find(p => p._id === product._id);
    if (p) {
      return true
    } else {
      return false
    }
  }

  addToCart(product: any) {
    let in_cart: any
    this.store.cart$.subscribe(data => in_cart = data.find(p => p._id == product._id))
    if (in_cart) {
      in_cart.count = in_cart.count + 1
      this.store.increaseCart(in_cart);
    } else {
      product.count = 1
      this.store.increaseCart(product);
    }
  }

  buyNow(product: any) {
    let in_cart: any
    this.store.cart$.subscribe(data => in_cart = data.find(p => p._id == product._id))
    if (in_cart) {
      this.store.increaseCart(in_cart);
      this.router.navigate(['shop/cart'])
    } else {
      product.count = 1
      this.store.increaseCart(product);
      this.router.navigate(['shop/cart'])
    }
  }


}
