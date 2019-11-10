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
  forgetpass = 0;
  otp: any;

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
          if (data.error === 'invalid email or password shorter than 8 characters.') {
            this.msg = 'Invalid email or Password shorter than 8 characters.';
            $('#loginstatus').modal('show');
          } else {
            this.msg = 'Account with same email already exists.';
            $('#loginstatus').modal('show');
          }
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
          this.msg = 'Invalid email or password.';
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

  requestpass() {
    this.forgetpass = 2;
    this.http.post('http://localhost:3000/reset', JSON.stringify({
      email: this.email
    }), {
      withCredentials: true
    }).subscribe((data: any) => {
      console.log(data);
    }, (err) => {
      this.msg = 'Cannot connect to server.';
      $('#loginstatus').modal('show');
    })
  }

  newp() {
    this.http.post('http://localhost:3000/newpass', JSON.stringify({
      otp: this.otp,
      password: this.password
    }),{
      withCredentials: true
    }).subscribe((data: any) => {
      console.log(data);
      if(data.status === 'Password Changed') {
        this.msg = 'Password Changed.'
        $('#loginstatus').modal('show');
        this.forgetpass = 0;
      } else if (data.status === 'Wrong or expired otp') {
        this.msg = 'Wrong or expired otp.'
        $('#loginstatus').modal('show');
      } else if (data.status === 'Password should have atleast 8 characters') {
        this.msg = 'Password should have atleast 8 characters.'
        $('#loginstatus').modal('show');
      }
    }, (err) => {
      this.msg = 'Cannot connect to server.';
      $('#loginstatus').modal('show');
    })
  }

  changemodal() {
    $('#loginstatus').modal('hide');
    $('#myModal').modal('show');
  }
}
