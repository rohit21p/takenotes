import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { NotesComponent } from './notes/notes.component';

const routes: Route[] = [
  {
    path: '',
    component: AddNoteComponent
  },
  {
    path: 'notes',
    component: NotesComponent
  },
  {
    path: 'bin',
    component: NotesComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddNoteComponent,
    NotesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
