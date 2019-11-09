import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNewUser = false;
  isLoggedIn = false;
  isRegUser = true;
  email: any;
  password: any;

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
  }

  toggleUser() {
    this.isRegUser = !this.isRegUser;
    this.isNewUser = !this.isNewUser;
  }

  log_in() {
    if (this.isNewUser) {
      this.http.post('http://localhost:3000/signup', {
      email: this.email,
      password: this.password
      }, {
        withCredentials: true
      }).subscribe((data: any) => {
        if (data.loggedIn) {
          this.isLoggedIn = true;
        }
      });
    } else {
      this.http.post('http://localhost:3000/login', {
      email: this.email,
      password: this.password
      }, {
        withCredentials: true
      }).subscribe((data: any) => {
        if (data.loggedIn) {
          this.isLoggedIn = true;
        }
      });
    }
  }

  logout() {
    this.http.post('http://localhost:3000/logout', {
        withCredentials: true
      }).subscribe((data: any) => {
        if (!data.loggedIn) {
          this.isLoggedIn = false;
        }
      });
    this.router.navigate(['/']);
  }

}
