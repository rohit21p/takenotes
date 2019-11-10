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
  dnotes = [];

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
    this.http.get('http://ec2-13-233-98-246.ap-south-1.compute.amazonaws.com:3000/getnotes', {
      withCredentials: true
    }).subscribe((data: any)=> {
      if (data.success === 'Not Logged in') {
        this.msg = 'Log-in First';
        $('#fetchstatus').modal('show');
      } else if (data.success) {
        data.notes.forEach(element => {
          if(element.deleted) {
            if (this.bin) {
              this.dnotes.push(element);
            }
          } else {
            if (element.pin) {
              this.pnotes.push(element);
            } else {
              this.unotes.push(element);
            }
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
      this.http.get('http://ec2-13-233-98-246.ap-south-1.compute.amazonaws.com:3000/unpin/' + note._id, {
        withCredentials: true
      }).subscribe((data: any)=> {
        console.log(data);
        if (data.success === 'Not Logged in') {
          this.msg = 'Log-in First';
          $('#fetchstatus').modal('show');
        }
      }, (err) => {
        this.msg = 'Some Error Occured.';
        $('#fetchstatus').modal('show');
      }); 
    } else {
      this.unotes.splice(index, 1);
      this.pnotes.push(note);
      this.http.get('http://ec2-13-233-98-246.ap-south-1.compute.amazonaws.com:3000/pin/' + note._id, {
        withCredentials: true
      }).subscribe((data: any)=> {
        console.log(data);
      }, (err) => {
        this.msg = 'Some Error Occured.';
        $('#fetchstatus').modal('show');
      }); 
    }
  }

  delete(note, index, mode) {
    if (mode == 1) {
      this.unotes.splice(index, 1);
    } else {
      this.pnotes.splice(index, 1);
    }
    this.http.get('http://ec2-13-233-98-246.ap-south-1.compute.amazonaws.com:3000/delete/' + note._id, {
        withCredentials: true
      }).subscribe((data: any)=> {
        console.log(data);
        if (data.success === 'Not Logged in') {
          this.msg = 'Log-in First';
          $('#fetchstatus').modal('show');
        }
      }, (err) => {
        this.msg = 'Some Error Occured.';
        $('#fetchstatus').modal('show');
    }); 
  }

  restore(note, index) {
    this.dnotes.splice(index, 1);
    this.http.get('http://ec2-13-233-98-246.ap-south-1.compute.amazonaws.com:3000/restore/' + note._id, {
        withCredentials: true
      }).subscribe((data: any)=> {
        console.log(data);
        if (data.success === 'Not Logged in') {
          this.msg = 'Log-in First';
          $('#fetchstatus').modal('show');
        }
      }, (err) => {
        this.msg = 'Some Error Occured.';
        $('#fetchstatus').modal('show');
    }); 
  }

}
