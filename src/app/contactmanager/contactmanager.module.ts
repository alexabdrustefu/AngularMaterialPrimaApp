import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/core/toolbar/toolbar.component';
import { MainContentComponent } from './components/core/main-content/main-content.component';
import { SidenavComponent } from './components/core/sidenav/sidenav.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NewContactDialogComponent } from './components/Utente/new-contact-dialog/new-contact-dialog.component';
import { DeleteNotesComponent } from './components/Utente/delete-users/delete-users.component';
import { EditUserComponent } from './components/Utente/edit-user/edit-user.component';
import { NewNotesComponent } from './components/Notes/new-notes/new-notes.component';
import { NotesComponent } from './components/Notes/notes/notes.component';
import { NotesShowComponent } from './components/Notes/notes/notes-show/notes-show.component';
import { NotesDeleteComponent } from './components/Notes/notes-delete/notes-delete.component';
import { NoteEditComponent } from './components/Notes/note-edit/note-edit.component';
const routes: Routes = [
  {
    path: '',
    component: ContactmanagerAppComponent,
    children: [
      { path: '', component: MainContentComponent },
      { path: ':id', component: MainContentComponent },
      { path: 'new-notes/:id', component: NewNotesComponent },
      { path: 'edit-users/:id', component: EditUserComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    NotesComponent,
    NewContactDialogComponent,
    NewNotesComponent,
    DeleteNotesComponent,
    EditUserComponent,
    NotesShowComponent,
    NotesDeleteComponent,
    NoteEditComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [UserService],
})
export class ContactmanagerModule {}
