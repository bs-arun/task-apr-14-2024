import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  errorMessage = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    samePassword: false,
    emailFormate: false
  }
  loginErrorMessag = {
    forEmail: false,
    forPassword: false
  }
  register: Boolean = true;
  firstName: String = "";
  lastName: String = "";
  email: String = "";
  password: String = "";
  confirmPassword: String = "";

  sign_email: String = ""
  sign_pass: String = ""
  constructor(private http: HttpService, private router: Router) {

  }
  ngOnInit() {
    const currentDate = new Date();
    const setDate = currentDate.setTime(currentDate.getTime() + 900000);
    console.log(setDate, "setData")
  }

  submitRegister() {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };
    this.http.postRequest("api/v1/user/registration", data).subscribe((resData: any) => {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      if(resData.status == true) {
        localStorage.setItem("accessToken", resData.data.accessToken)
        localStorage.setItem("refressToken", resData.data.refressToken)

        sessionStorage.setItem("accessToken", resData.data.accessToken)
        sessionStorage.setItem("refressToken", resData.data.refressToken)

        const currentDate = new Date();
        const setDate = currentDate.setTime(currentDate.getTime() + 900000);

        localStorage.setItem("refresh_call", setDate.toString())

        this.router.navigate(['/', 'dash']);
      } else {
        console.log(resData.message, "error");
      }
      
    })
  }

  submitLogin() {
    const data = {
      email: this.sign_email,
      password: this.sign_pass,
    };
    this.http.postRequest("api/v1/user/login", data).subscribe((resData: any) => {
      this.sign_email = "";
      this.sign_pass = "";
      if(resData.status == true) {
        localStorage.setItem("accessToken", resData.data.accessToken)
        localStorage.setItem("refressToken", resData.data.refressToken)

        sessionStorage.setItem("accessToken", resData.data.accessToken)
        sessionStorage.setItem("refressToken", resData.data.refressToken)

        const currentDate = new Date();
        const setDate = currentDate.setTime(currentDate.getTime() + 900000);

        localStorage.setItem("refresh_call", setDate.toString())

        this.router.navigate(['/', 'dash']);
      } else {
        console.log(resData.message, "error");
      }
      
    })
  }
}
