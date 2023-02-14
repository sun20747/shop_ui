import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating'
import { NgxStarsModule } from 'ngx-stars'
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    RatingModule.forRoot(),
    FormsModule,
    NgxStarsModule,
    SweetAlert2Module,
  ]
})
export class ProductModule { }
