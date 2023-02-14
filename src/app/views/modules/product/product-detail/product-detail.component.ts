import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/store/store.service'
import { ProductService } from 'src/app/services/product/product.service'
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  count: any = 1;
  count_store: any;
  constructor(private activatedRoute: ActivatedRoute, private store: StoreService, private ProductSer: ProductService, private router: Router) {

  }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.ProductSer.getProducrtById(id).subscribe(res => {
      if (res.code) {
        this.product = res.data;
      }
    })
  }

  changeCount(product: any, action: number) {
    if (action && this.count < product.rating.count) {
      this.count = this.count + 1
    }
    if (!action && this.count > 1) {
      this.count = this.count - 1
    }
  }

  check_stock(e: any, product: any) {
    let count = Number(e.target.value)
    let stock = product.rating.count


    if (count <= stock && count >= 1) {
      this.count = count;
    } else {
      this.count = 1;
    }

  }

  addToCart(product: any) {
    let in_cart: any
    this.store.cart$.subscribe(data => in_cart = data.find(p => p._id == product._id))
    if (in_cart) {
      in_cart.count = in_cart.count + this.count
      console.log(in_cart);

      this.store.increaseCart(in_cart);
    } else {
      product.count = this.count
      this.store.increaseCart(product);
    }
  }

  buyNow(product: any) {
    let in_cart: any
    this.store.cart$.subscribe(data => in_cart = data.find(p => p._id == product._id))
    if (in_cart) {
      in_cart.count = in_cart.count + this.count
      this.store.increaseCart(in_cart);
      this.router.navigate(['shop/cart'])
    } else {
      product.count = this.count
      this.store.increaseCart(product);
      this.router.navigate(['shop/cart'])
    }
  }



}
