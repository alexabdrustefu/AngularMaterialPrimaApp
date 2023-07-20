import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from 'src/app/contactmanager/model/note';
import { User } from 'src/app/contactmanager/model/user';
import { UserService } from 'src/app/contactmanager/services/user.service';

@Component({
  selector: 'app-new-notes',
  templateUrl: './new-notes.component.html',
  styleUrls: ['./new-notes.component.scss'],
})
export class NewNotesComponent implements OnInit {
  note: Note;
  user: User;
  userId!: number;

  title = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(
    public dialogRef: MatDialogRef<NewNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: UserService
  ) {}

  ngOnInit(): void {
    this.note = new Note();
    this.userId = this.data.userId; // Recupera l'ID dell'utente dalla proprietà 'userId' dei dati passati
    console.log(this.userId);

    this.user = this.service.getUserById(this.userId);
    if (!this.user) {
      console.log('User not found');
      return;
    }

    // Esegui le operazioni desiderate con this.user
  }

  // Gestione errori
  getErrorMessage() {
    if (this.title.hasError('required')) {
      return 'Inserire valori validi.';
    }

    return this.title.hasError('required') ? 'Inserire valori validi.' : '';
  }

  // Metodo salva
  save(): void {
    this.note.title = this.title.value;

    this.service
      .addNoteToUser(this.userId, this.note)
      .then((note) => {
        this.service.getAllNotes();
        this.dialogRef.close(note);
      })
      .catch((error) => {
        console.log('Error adding note to user:', error);
      });
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
