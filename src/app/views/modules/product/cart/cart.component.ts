import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/store/store.service'
import { CartService } from 'src/app/services/product/cart.service'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart_data: any[] = [];
  total: number = 0
  order_data: any;
  constructor(private store: StoreService, private router: Router, private CartService: CartService) { }

  ngOnInit(): void {
    this.getCart();
    this.getOrder();
  }

  async getCart() {
    this.store.cart$.subscribe(products => {
      this.cart_data = products
      this.total = this.calPrice(this.cart_data)
    })
  }

  takeOutCart(product: any) {
    this.store.deleteCart(product);
    this.total = this.calPrice(this.cart_data);
  }

  calPrice(cart_data: any) {
    let sum = 0;
    cart_data.forEach((p: any) => {
      sum += p.count * p.price
    })
    return sum;
  }

  check_stock(addCount: number, product: any) {
    if (addCount <= product.rating.count && addCount >= 1) {
      product.count = addCount
    } else {
      product.count = 1
    }
    this.store.changeCountOrder(product);
    this.getCart();
  }

  changeCount(product: any, action: number) {
    if (action && product.count < product.rating.count) product.count = product.count + 1
    if (!action && product.count > 1) product.count = product.count - 1
    this.store.changeCountOrder(product);
    this.getCart();
  }

  productDetail(product: any, e: any) {

    if (e.target.id === "allowclick") {
      this.router.navigate(['shop/product-detail', product._id])
    }
  }

  portOrder() {
    let user_data = JSON.parse(localStorage.getItem("user_data") || '{}')
    this.store.cart$.subscribe(product => {
      if (product.length > 0) {
        this.CartService.postOrder(product, user_data).subscribe(res => {
          if (res.code) {
            this.store.increaseCarst([]);
            this.getCart();
            this.getOrder();
          }
        })

      }
    })
  }

  getOrder() {
    let user_data = JSON.parse(localStorage.getItem("user_data") || '{}')
    this.CartService.getOrder(user_data).subscribe(res => {
      if (res.code) {
        this.order_data = res.data
      }
    })
  }

  Caltotal(products_order_data: any) {
    let sum = 0;
    products_order_data.forEach((p: any) => {
      sum += (p.count * p.price)
    });
    return sum
  }
}
