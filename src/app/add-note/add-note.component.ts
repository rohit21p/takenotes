import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare let $: any;

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  title;
  desc;
  msg;
  colour = '#f8f9fa';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }


  create() {
    this.http.post('http://ec2-13-233-98-246.ap-south-1.compute.amazonaws.com:3000/create', {
     title: this.title,
     desc: this.desc,
     color: this.colour
    }, {
      withCredentials: true
    }).subscribe((data: any)=> {
      if (data.inserted === "Not Logged in") {
        this.msg = 'Log-in First!';
        $('#status').modal('show');
      } else if (data.inserted === true) {
        this.msg = 'Note Saved!';
        $('#status').modal('show');
      } else if (data.inserted ===  'no title') {
        this.msg = 'Please give a title to your note.';
        $('#status').modal('show');
      } else if (data.inserted ===  'no note') {
        this.msg = 'Please give a description to your title.';
        $('#status').modal('show');
      } else {
        this.msg = 'Some Error Occured.';
        $('#status').modal('show');
      }
    }, (err) => {
      this.msg = 'Some Error Occured.';
      $('#status').modal('show');
    });
  }

  color(c) {
    console.log(c);
    $('input').css('background-color', c);
    $('textarea').css('background-color', c);
    if (c!='#ffc107'&&c!='#f8f9fa') {
      $('input').css('color', 'white');
      $('textarea').css('color', 'white');
    } else {
      $('input').css('color', 'black');
      $('textarea').css('color', 'black');
    }
    this.colour = c;
  }

}
