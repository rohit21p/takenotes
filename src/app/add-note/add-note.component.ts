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

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }


  create() {
    this.http.post('http://localhost:3000/create', {
     title: this.title,
     desc: this.desc 
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

}
