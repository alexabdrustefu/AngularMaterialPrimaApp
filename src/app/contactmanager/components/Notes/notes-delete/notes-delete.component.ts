import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from 'src/app/contactmanager/model/note';
import { UserService } from 'src/app/contactmanager/services/user.service';

@Component({
  selector: 'app-notes-delete',
  templateUrl: './notes-delete.component.html',
  styleUrls: ['./notes-delete.component.scss'],
})
export class NotesDeleteComponent implements OnInit {
  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<NotesDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { note: Note }
  ) {}
  ngOnInit(): void {
    
  }

  deleteNote(): void {
    this.userService
      .deleteNote(this.data.note)
      .then((value) => {
        this.dialogRef.close(value); // Chiudi il dialogo e invia un segnale di successo
      })
      .catch((error) => {
        console.log("Errore durante l'eliminazione della nota:", error);
      });
  }

  closeDialog(): void {
    this.dialogRef.close(false); // Chiudi il dialogo senza inviare alcun segnale
  }
}
