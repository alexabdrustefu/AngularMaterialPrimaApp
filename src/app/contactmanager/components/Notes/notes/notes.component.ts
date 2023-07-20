import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Note } from 'src/app/contactmanager/model/note';
import { UserService } from 'src/app/contactmanager/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { NotesShowComponent } from './notes-show/notes-show.component';
import { User } from 'src/app/contactmanager/model/user';
import { NotesDeleteComponent } from '../notes-delete/notes-delete.component';
import { EditUserComponent } from '../../Utente/edit-user/edit-user.component';
import { NoteEditComponent } from '../note-edit/note-edit.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit, AfterViewInit {
  @Input() notes: Note[];
  @Input() user: User;

  filterValue: string = '';

  displayedColumns: string[] = [
    'position',
    'title',
    'date',
    'visualizza',
    'elimina',
    'edit',
  ];
  dataSource: MatTableDataSource<Note>;

  // Paginazione
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private service: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Note>(this.notes);

    // Aggiorna i dati ogni 5 secondi (puoi modificare l'intervallo a tuo piacimento)
    this.service.utenti.subscribe(() => {
      this.dataSource!.sort = this.sort;
    });
  }
  performAction(note: Note) {
    console.log('Azione eseguita', note);
  }

  openShow(note: Note): void {
    const dialogRef = this.dialog.open(NotesShowComponent, {
      width: '400px',
      data: { note },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.dataSource = new MatTableDataSource<Note>(this.notes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  ConfirmDelete(note: Note): void {
    const dialogRef = this.dialog
      .open(NotesDeleteComponent, {
        width: '400px',
        data: { note },
      })
      .afterClosed()
      .subscribe((result) => {
        this.dataSource = new MatTableDataSource<Note>(this.notes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  ConfirmEdit(note: Note): void {
    const dialogRef = this.dialog.open(NoteEditComponent, {
      width: '400px',
      data: { note, user: this.user }, // Assicurati di passare l'oggetto dell'utente corretto
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.dataSource = new MatTableDataSource<Note>(this.notes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }
}
