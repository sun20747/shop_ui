import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service'
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'
import { StoreService } from 'src/app/store/store.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })

  ErrorMes: string = ''
  constructor(private userSer: UserService, private route: Router, private store: StoreService) { }

  ngOnInit(): void { }

  signin() {
    let email = this.signinForm.value.email
    let password = this.signinForm.value.password

    this.userSer.signin(email, password).subscribe(res => {
      if (res.code) {
        const { token, refresh_token } = res.data
        localStorage.setItem("user_data", JSON.stringify(res.data))
        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", refresh_token);
        this.store.increaseUser(res.data);        
        this.route.navigate(["/shop/product-list"])
      }
    }, err => {
      this.ErrorMes = err.error.message
      setTimeout(() => {
        this.ErrorMes = ''
      }, 3000)
    })

  }

}
