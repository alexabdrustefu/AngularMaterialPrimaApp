import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/contactmanager/model/note';
import { User } from 'src/app/contactmanager/model/user';
import { UserService } from 'src/app/contactmanager/services/user.service';

@Component({
  selector: 'app-notes-show',
  templateUrl: './notes-show.component.html',
  styleUrls: ['./notes-show.component.scss'],
})
export class NotesShowComponent implements OnInit {
  note: Note;
  user?: User;

  constructor(
    private service: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.note = this.data.note;
  }
}
