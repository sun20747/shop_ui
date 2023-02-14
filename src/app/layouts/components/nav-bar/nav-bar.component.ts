import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store/store.service'
import { Router } from '@angular/router'
import { CartService } from 'src/app/services/product/cart.service'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  cart_data: any;
  constructor(private StoreSer: StoreService, private router: Router, private CartService: CartService) { }

  ngOnInit(): void {
    this.StoreSer.cart$.subscribe(cart_data => this.cart_data = cart_data)
    this.loadCart();
  }

  goToShopList() {
    this.router.navigate(['shop/product-list'])
  }

  goToCart() {
    this.router.navigate(['shop/cart'])
  }

  async loadCart() {
    let user_data = await JSON.parse(localStorage.getItem("user_data") || '{}');

    this.CartService.getCart(user_data).subscribe(res => {
      if (res.code) {
        this.StoreSer.increaseCarst(res.data)
      }
    })
  }

  logout() {
    localStorage.clear()
    this.StoreSer.clearStore();
    this.router.navigate(['/sign_in']);
  }

}
