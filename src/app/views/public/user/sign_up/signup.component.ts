import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm = new FormGroup({
    f_name: new FormControl(null, [Validators.required]),
    l_name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.min(8)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.min(8)])
  })
  constructor(private userSer: UserService, private Router: Router) { }

  ngOnInit(): void {
  }

  signup() {
    if (this.signupForm.valid) {
      try {
        if (this.signupForm.value.password != this.signupForm.value.confirmPassword) throw new Error("password not match");
        let data: {} = {
          "firstName": this.signupForm.value.f_name,
          "lasstName": this.signupForm.value.l_name,
          "password": this.signupForm.value.password,
          "email": this.signupForm.value.email
        }
        this.userSer.signup(data).subscribe(res => {
          if (res.code) {
            this.Router.navigate(['/sign_in'])
          } else {
            throw new Error(res.message);
          }
        })
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(this.signupForm.controls.f_name.invalid);
    }
  }

}
