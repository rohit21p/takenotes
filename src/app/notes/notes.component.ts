import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes = [
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

  constructor() { }

  ngOnInit() {
  }

}
