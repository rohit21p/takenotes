import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNewUser = false;
  isLoogedIn = false;
  isRegUser = true;

  constructor() { }

  ngOnInit() {
  }

  toggleUser() {
    this.isRegUser = !this.isRegUser;
    this.isNewUser = !this.isNewUser;
  }

}
