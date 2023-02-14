import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store/store.service'
import * as _ from 'lodash'

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  product_list: any;
  category_ist: any;
  option_price = [
    { id: 1, name: "Price: Low to High" },
    { id: 2, name: "Price: High to Low" }
  ]
  defaultItem = { id: 0, name: "No filter Price" }

  ratings = [
    { id: 1, rate: 1, check: false },
    { id: 2, rate: 2, check: false },
    { id: 3, rate: 3, check: false },
    { id: 4, rate: 4, check: false },
    { id: 5, rate: 5, check: false }
  ]
  rate: number = 0

  constructor(private store: StoreService) { }
  ngOnInit(): void {
    this.store.product$.subscribe(products => {
      this.product_list = _.cloneDeep(products)
      this.category_ist = _.uniq(this.product_list.map((p: any) => p.category))
    })
  }

  filter_cagegory(category?: any) {
    this.store.increaseCategory(category);
  }

  filter_price(e: any) {
    this.store.increaseSortPrice(e.id)
  }

  filter_rating(rate: number) {
    this.ratings.forEach(r => {
      if (r.rate === rate) {
        if (r.check == false) {
          r.check = true
        } else {
          r.check = false
        }
      } else {
        r.check = false
      }
    })
    const f = this.ratings.find(r => r.check === true)
    if (!f) {
      this.store.increaseRating(0);
    } else {
      this.store.increaseRating(f.rate);
    }
  }





}
