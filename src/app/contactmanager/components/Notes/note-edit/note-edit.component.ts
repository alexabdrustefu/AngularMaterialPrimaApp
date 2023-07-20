import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from 'src/app/contactmanager/model/note';
import { User } from 'src/app/contactmanager/model/user';
import { UserService } from 'src/app/contactmanager/services/user.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent implements OnInit {
  note: Note;
  user: User;
  userId!: number;

  constructor(
    public dialogRef: MatDialogRef<NoteEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.note = new Note();
    this.userId = this.data.userId; // Se necessario, recupera l'ID dell'utente dalla proprietà 'userId' dei dati passati
  
    console.log('user', this.data.user); // Assicurati che 'user' sia definito e contenga l'oggetto dell'utente con la proprietà 'notes'
  
    this.user = this.data.user;
    if (!this.user) {
      console.log('User not found');
      return;
    }
  }
  

  saveNotes(): void {
  // Chiama il metodo editUserNotes del UserService per aggiornare le note dell'utente
  this.userService.editUserNotes(this.data.note.id, this.data.user.notes)
    .then(() => {
      console.log('Note dell\'utente aggiornate con successo');
    })
    .catch((error) => {
      console.error('Errore durante l\'aggiornamento delle note:', error);
    });

  // Chiudi il dialogo e passa la nota aggiornata al componente chiamante
  this.dialogRef.close(this.data.note);
}



}