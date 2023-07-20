import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../model/user';
import { UserService } from '../../../services/user.service';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import {  Inject } from '@angular/core';

@Component({
  selector: 'app-delete-notes',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.scss']
})
export class DeleteNotesComponent implements OnInit {

  user: User;

  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { userId: number },
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    const userId = this.data.userId;
    this.user = this.userService.getUserById(userId)
  }
  deleteUser(): void {
    if (this.user.id) {
      this.userService
        .deleteUser(this.user.id)
        .then(() => {
          setTimeout(() => {
            this.dialogRef.close();
          }, 200);
        })
        .catch((error) => {
          setTimeout(() => {
            this.dialogRef.close();
            alert('Impossibile Eliminare Utente')
          }, 200);
        });
    }
  }

  annulla(): void {
    this.dialogRef.close(null);

  }

}
