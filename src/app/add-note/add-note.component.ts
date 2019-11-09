import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  title;
  desc;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }


  create() {
    this.http.post('http://localhost:3000/create', {
     title: this.title,
     desc: this.desc 
    }, {
      withCredentials: true
    }).subscribe(data=> {
      console.log(data);
    })
  }

}
