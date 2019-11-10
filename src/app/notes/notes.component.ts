import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { notEqual } from 'assert';

declare let $: any;

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  pnotes = [];
  unotes = [];
  dnotes = [
    {
      title: 'Rohit Panjwani',
      desc: 'is a good man.'
    },
    {
      title: 'Rohit Panjwani',
      desc: 'is a good man.'
    },
    {
      title: 'Rohit Panjwani',
      desc: 'is a good man.'
    },
    {
      title: 'Rohit Panjwani',
      desc: 'is a good man.'
    },
    {
      title: 'Rohit Panjwani',
      desc: 'is a good man.'
    },
    {
      title: 'Rohit Panjwani',
      desc: 'is a good man.'
    }
  ];

  bin = false;
  msg: any;

  constructor(private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit() {
    if (this.route.snapshot.url[0].path === 'bin') {
      this.bin = true;
    } else {
      this.bin = false;
    }
    this.http.get('http://localhost:3000/notes', {
      withCredentials: true
    }).subscribe((data: any)=> {
      if (data.success === 'Not Logged in') {
        this.msg = 'Log-in First';
        $('#fetchstatus').modal('show');
      } else if (data.success) {
        data.notes.forEach(element => {
          if(element.pin) {
            this.pnotes.push(element);
          } else {
            this.unotes.push(element);
          }
        });
        console.log(this.pnotes, "p")
        console.log(this.unotes, "u")
      } else {
        this.msg = 'Some Error Occured.';
        $('#fetchstatus').modal('show');
      }
    }, (err) => {
      this.msg = 'Some Error Occured.';
      $('#fetchstatus').modal('show');
    });
  }

  pin(note, index) {
    if (note.pin) {
      this.pnotes.splice(index, 1);
      this.unotes.push(note);
      this.http.get('http://localhost:3000/unpin/' + note._id, {
        withCredentials: true
      }).subscribe((data: any)=> {
        console.log(data);
      }, (err) => {
        this.msg = 'Some Error Occured.';
        $('#fetchstatus').modal('show');
      }); 
    } else {
      this.unotes.splice(index, 1);
      this.pnotes.push(note);
      this.http.get('http://localhost:3000/pin/' + note._id, {
        withCredentials: true
      }).subscribe((data: any)=> {
        console.log(data);
      }, (err) => {
        this.msg = 'Some Error Occured.';
        $('#fetchstatus').modal('show');
      }); 
    }
  }

  delete() {

  }

  edit() {

  }

}
