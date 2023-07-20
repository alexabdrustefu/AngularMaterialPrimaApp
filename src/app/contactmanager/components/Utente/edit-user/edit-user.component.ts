import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/app/contactmanager/model/user';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/contactmanager/services/user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  avatars=[
    'svg-1','svg-2','svg-3','svg-4'
  ]
  user: User;
  name = new FormControl('', [Validators.required]);

  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { userId: number },
    private userService: UserService
  ) {}

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'Inserire valori validi.';
    }

    return '';
  }

  ngOnInit(): void {
    const userId = this.data.userId;
    this.user = this.userService.getUserById(userId);
    this.name.setValue(this.user.name);
  }

  saveEdit(): void {
    this.user.name = this.name.value;
    this.userService.editUser(this.user.id, this.user).then(user => {
      this.dialogRef.close(user);
    });
  }

  annulla(): void {
    this.dialogRef.close(null);
  }
}