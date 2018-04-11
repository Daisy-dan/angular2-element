import { Component, OnInit } from '@angular/core';


import { UserLoginService } from './services/userLogin.service';
import { HttpService } from './services/http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(
    public userService: UserLoginService,
    private httpService: HttpService
  ) {
  }
  ngOnInit(): void {
    // this.login();
  }
  login(user: any) {
    console.log(user);
    this.userService.login(user).subscribe(
      data => {
        console.log(data);
      },
      error => { this.httpService.errorHandler(error); }
    );
  }
}
