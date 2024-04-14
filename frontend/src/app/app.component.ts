import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(private http: HttpService, private router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("accessToken")) {
      const currentTime = Date.now();
      const storeTime = localStorage.getItem("refressToken");
  
      if (Number(currentTime) >= Number(storeTime)) {
        const data = {
          "refreshTokenBody": sessionStorage.getItem("refressToken")
        }
        this.http.postRequest("api/v1/user/newToken", data).subscribe((resData: any) => {
          if (resData.status) {
            localStorage.setItem("accessToken", resData.data.accessToken)
  
            sessionStorage.setItem("accessToken", resData.data.accessToken)
          }
        })
      }
    } else {
      this.router.navigate(['/', 'auth']);
    }

  }
}
