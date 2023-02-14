import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RatingModule } from 'ngx-bootstrap/rating'
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { NgxStarsModule } from 'ngx-stars';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultComponent } from './layouts/default/default.component';
import { SignupComponent } from './views/public/user/sign_up/signup.component';
import { SigninComponent } from './views/public/user/sign_in/signin.component'

import { NavBarComponent } from './layouts/components/nav-bar/nav-bar.component'
import { SideBarComponent } from './layouts/components/side-bar/side-bar.component'

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CartLayoutComponent } from './layouts/cart/cart.component';

import { CartComponent } from './views/modules/product/cart/cart.component'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

export function provideSwal() {
  return import('sweetalert2/src/sweetalert2.js'); // instead of import('sweetalert2')
}
@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    SignupComponent,
    SigninComponent,
    NavBarComponent,
    SideBarComponent,
    CartComponent,
    CartLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RatingModule.forRoot(),
    DropDownsModule,
    BrowserAnimationsModule,
    RatingModule,
    NgxStarsModule,
    SweetAlert2Module.forRoot({ provideSwal }),
    AccordionModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
