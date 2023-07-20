import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Note } from '../../../model/note';
import { MatDialog } from '@angular/material/dialog';
import { DeleteNotesComponent } from '../../Utente/delete-users/delete-users.component';
import { EditUserComponent } from '../../Utente/edit-user/edit-user.component';
import { NewNotesComponent } from '../../Notes/new-notes/new-notes.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id: number = params['id'];
      console.log(id);
      if (!id) id = 1;
      this.user = null;
      this.service.users().subscribe((users) => {
        if (users.length == 0) return;
        const timeout = setTimeout(() => {
          this.user = users.find((user) => user.id == id);
        }, 500);

        // Se il caricamento richiede più di 500 millisecondi, prendi il primo elemento dell'array
        setTimeout(() => {
          if (!this.user) {
            this.user = users[0];
            clearTimeout(timeout);
          }
        }, 500);
      });
    });
  }

  openNewNotesDialog(userId: number): void {
    const dialogRef = this.dialog.open(NewNotesComponent, {
      width: '400px',
      data: { userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Gestisci il risultato del dialogo qui se necessario
    });
  }

  //mi rindirizza al click verso questo component
  openNewDeleteDialog(userId: number): void {
    const dialog = this.dialog.open(DeleteNotesComponent, {
      width: '400px',
      data: { userId },
    });
  }
  //mi manda verso edit component
  openNewEditDialog(userId: number): void {
    const dialog = this.dialog.open(EditUserComponent, {
      width: '400px',
      data: { userId },
    });
  }
}
