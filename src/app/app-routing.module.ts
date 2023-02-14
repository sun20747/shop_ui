import { NgModule } from '@angular/core';
import { AuthGuard } from './services/auth.guard'
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent, CartLayoutComponent } from './layouts';

import { CartComponent } from './views/modules/product/cart/cart.component'

import { SigninComponent } from './views/public/user/sign_in/signin.component'
import { SignupComponent } from './views/public/user/sign_up/signup.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign_in',
    pathMatch: "full"
  },
  {
    path: 'sign_in',
    component: SigninComponent
  },
  {
    path: 'sign_up',
    component: SignupComponent
  },
  {
    path: 'shop',
    component: DefaultComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("./views/modules/product/product.module").then(m => m.ProductModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'shop/cart',
    component: CartLayoutComponent,
    children: [
      {
        path: '',
        component: CartComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
