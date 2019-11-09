import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare let $: any;

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes;
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
        this.notes = data.notes;
      } else {
        this.msg = 'Some Error Occured.';
        $('#fetchstatus').modal('show');
      }
    }, (err) => {
      this.msg = 'Some Error Occured.';
      $('#fetchstatus').modal('show');
    });
  }

}
