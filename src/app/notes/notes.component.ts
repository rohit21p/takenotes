import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.url[0].path === 'bin') {
      this.bin = true;
    } else {
      this.bin = false;
    }
  }

}
