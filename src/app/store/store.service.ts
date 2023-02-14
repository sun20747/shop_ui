import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, distinctUntilChanged, shareReplay, map, Subscription, switchMap, tap, catchError, NEVER } from 'rxjs'
import * as _ from 'lodash'
import { CartService } from 'src/app/services/product/cart.service'
import { EndPointStore } from './end-point-store'
import { HttpClient } from '@angular/common/http';

export interface ProductState {
  product_list: any[];
  category: number;
  sort_price: number;
  rate: number;
  cart: any[];
  user_data: any;
  // test: any
}

@Injectable({
  providedIn: 'root'
})

export class StoreService {
  private state = new BehaviorSubject<ProductState>({
    product_list: [],
    category: 0,
    sort_price: 0,
    rate: 0,
    cart: JSON.parse(localStorage.getItem('products') || '[]'),
    user_data: JSON.parse(localStorage.getItem("user_data") || '{}'),
    // test: []
  });

  private increaseUserAction = new Subject<any>();
  private increaseProductAction = new Subject<any>();
  private increaseCategoryAction = new Subject<any>();
  private increasePriceAction = new Subject<any>();
  private increaseRatingAction = new Subject<any>();
  private increaseCartAction = new Subject<any>();
  private changeCountOrderAction = new Subject<any>();
  private deleteCartAction = new Subject<any>();
  private increaseCarstAction = new Subject<any>();
  private clearStoreAction = new Subject<any>();

  // private loadDataCartAction = new Subject<void>();
  // private loadDataCartSuccessAction = new Subject<any>();
  // private loadDataCartErrorAction = new Subject<any>();


  user_data$ = this.createSelector(state => state.user_data);
  product$ = this.createSelector(state => state.product_list);
  category$ = this.createSelector(state => state.category);
  price$ = this.createSelector(state => state.sort_price);
  rate$ = this.createSelector(state => state.rate);
  cart$ = this.createSelector(state => state.cart) || []
  // test$ = this.createSelector(state => state.test);

  constructor(private EndPointStore: EndPointStore, private http: HttpClient) {

    // this.createEffect(this.loadDataCartAction.pipe(
    //   switchMap(() => {
    //     return this.http.get<any>('https://jsonplaceholder.typicode.com/users')
    //       .pipe(catchError(err => {
    //         this.loadDataCartErrorAction.next(err);
    //         return NEVER;
    //       }))
    //   }), tap(res => {
    //     this.loadDataCartSuccessAction.next(res);
    //   })))

    // this.createEffect(this.loadDataCartErrorAction.pipe(tap(err => {
    //   console.log(err);
    // })))

    // this.createReducer(this.loadDataCartSuccessAction, (state: ProductState, data) => {
    //   state.test = data
    //   return state
    // })

    this.createReducer(this.increaseUserAction, (state: ProductState, user_data: any) => {
      state.user_data;
      return state;
    });

    this.createReducer(this.increaseProductAction, (state: ProductState, products: any) => {
      state.product_list = products;
      return state;
    });

    this.createReducer(this.increaseCategoryAction, (state: ProductState, category: any) => {
      state.category = category
      return state
    });

    this.createReducer(this.increasePriceAction, (state: ProductState, price_id: any) => {
      state.sort_price = price_id
      return state
    });

    this.createReducer(this.increaseRatingAction, (state: ProductState, rate: any) => {
      state.rate = rate
      return state
    });

    this.createReducer(this.increaseCartAction, (state: ProductState, product: any) => {
      const product_in_cart = _.cloneDeep(state.cart)
      const in_cart = product_in_cart.filter(p => p._id == product._id);
      if (in_cart.length > 0) {
        state.cart = state.cart
      } else {
        state.cart = _.uniqBy([...state.cart, product], "_id");
      }
      state.user_data = JSON.parse(localStorage.getItem("user_data") || '{}')
      this.EndPointStore.changeCart(state.cart, state.user_data);
      return state
    });

    this.createReducer(this.changeCountOrderAction, (state: ProductState, product: any) => {
      state.user_data = JSON.parse(localStorage.getItem("user_data") || '{}')
      this.EndPointStore.changeCart(state.cart, state.user_data)
      return state
    });

    this.createReducer(this.deleteCartAction, (state: ProductState, product: any) => {
      state.cart = state.cart.filter(p => p._id != product._id)
      state.user_data = JSON.parse(localStorage.getItem("user_data") || '{}')
      this.EndPointStore.changeCart(state.cart, state.user_data)
      return state
    });

    this.createReducer(this.increaseCarstAction, (state: ProductState, products: any) => {
      state.cart = products
      return state
    });

    this.createReducer(this.clearStoreAction, (state: ProductState, clearStore: any) => {
      state.product_list = []
      state.category = 0
      state.sort_price = 0
      state.rate = 0
      state.cart = JSON.parse(localStorage.getItem('products') || '[]')
      state.user_data = JSON.parse(localStorage.getItem("user_data") || '{}')
      return state
    })



  }

  // loadDataCart() {
  //   this.loadDataCartAction.next();
  // }

  increaseUser(user_data: any) {
    this.increaseUserAction.next(user_data);
  }

  increaseProduct(product: any) {
    this.increaseProductAction.next(product);
  }

  increaseCategory(category: any) {
    this.increaseCategoryAction.next(category);
  }

  increaseSortPrice(price_id: any) {
    this.increasePriceAction.next(price_id);
  }
  increaseRating(rate: any) {
    this.increaseRatingAction.next(rate);
  }
  increaseCart(product: any) {
    this.increaseCartAction.next(product)
  }

  changeCountOrder(product: any) {
    this.changeCountOrderAction.next(product)
  }

  deleteCart(product: any) {
    this.deleteCartAction.next(product);
  }

  increaseCarst(products: any) {
    this.increaseCarstAction.next(products);
  }

  clearStore() {
    this.clearStoreAction.next(1)
  }



  private createReducer<T>(action$: Observable<T>, accumulator: (state: ProductState, action: T) => ProductState) {
    action$.subscribe((action) => {
      const state = { ...this.state.value };
      const newState = accumulator(state, action);
      this.state.next(newState);
    });
  }

  private createSelector<T>(selector: (state: ProductState) => T): Observable<T> {
    return this.state.pipe(
      map(selector),
      distinctUntilChanged(),
      shareReplay(1)
    )
  }

  private createEffect<T>(effect$: Observable<T>): Subscription {
    return effect$.subscribe();
  }

}
