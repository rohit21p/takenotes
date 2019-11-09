import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare let $: any;

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
  msg: any;

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/isLoggedIn', {
      withCredentials: true
    }).subscribe((data: any)=>{
      if (data.LoggedIn) {
        this.isLoggedIn = true;
      }
    })
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
          this.msg = 'Sign-up and Login Successful.';
          $('#loginstatus').modal('show');
        } else {
          this.msg = 'Some Error Occured.';
          $('#loginstatus').modal('show');
        }
      }, (err) => {
        this.msg = 'Some Error Occured.';
        $('#loginstatus').modal('show');
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
          this.msg = 'Login Successful.';
          $('#loginstatus').modal('show');
        } else {
          this.msg = 'Some Error Occured.';
          $('#loginstatus').modal('show');
        }
      }, (err) => {
        this.msg = 'Some Error Occured.';
        $('#loginstatus').modal('show');
      });
    }
  }

  logout() {
    this.http.get('http://localhost:3000/logout', {
        withCredentials: true
      }).subscribe((data: any) => {
        if (!data.loggedIn) {
          this.isLoggedIn = false;
          this.msg = 'Successfully logged out.';
          $('#loginstatus').modal('show');
        } else {
          this.msg = 'Some Error Occured.';
          $('#loginstatus').modal('show');
        }
      }, (err) => {
        this.msg = 'Some Error Occured.';
        $('#loginstatus').modal('show');
        this.isLoggedIn = false;
      });
    this.router.navigate(['/']);
  }

}
