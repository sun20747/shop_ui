import { Injectable } from "@angular/core";
import { CartService } from "../services/product/cart.service";
import { StoreService } from './store.service'

@Injectable({
    providedIn: "root"
})
export class EndPointStore {
    public constructor(public cartSer: CartService) { }


    public changeCart = (products: any, user_data: any) => {
        this.cartSer.changeCart(products, user_data).subscribe(res => { })
    }


}
