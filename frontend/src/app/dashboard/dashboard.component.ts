import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  history: any = [];
  constructor(private http: HttpService, private router: Router) { }

  ngOnInit() {
    this.getHistory()
  }

  getHistory() {
    console.log("987")
    this.http.getRequest("api/v1/user/history").subscribe((resData: any) => {
      if (resData.status) {
        this.history = resData.data;
      } else {
        this.history = [];
      }
    })
  }
}
