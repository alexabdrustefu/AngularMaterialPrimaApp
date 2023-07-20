import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, of } from 'rxjs';
import { Note } from '../model/note';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: BehaviorSubject<User[]>;
  private _note: BehaviorSubject<Note[]>;
  //const userUrl='https://angular-material-api.azurewebsites.net/users'
  private dataStore: {
    users: User[];
  };
  private noteStore: {
    notes: Note[];
  };

  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this._user = new BehaviorSubject<User[]>([]);

    this.noteStore = { notes: [] };
    this._note = new BehaviorSubject<Note[]>([]);
  }
  //find by id
  getUserById(id?: number): User {
    return this.dataStore.users.find((user) => user.id == id);
  }
  getAllNotes(): Observable<Note[]> {
    return of(this.noteStore.notes);
  }

  //find by id
  users(): Observable<User[]> {
    return this._user.asObservable();
  }
  get utenti(): Observable<User[]> {
    return this._user.asObservable();
  }
  deleteNote(note: Note): Promise<Note[]> {
    return new Promise<Note[]>((resolve, reject) => {
      // Trova l'utente a cui appartiene la nota
      const user = this.dataStore.users.find((user) =>
        user.notes.includes(note)
      );
      if (user) {
        // Rimuovi la nota dall'array delle note dell'utente
        const index = user.notes.indexOf(note);
        if (index !== -1) {
          user.notes.splice(index, 1);
          resolve(user.notes);
        } else {
          reject(new Error('Nota non trovata'));
        }
      } else {
        reject(new Error('Utente non trovato'));
      }
    });
  }
  //aggiunge nuovo utente
  addUser(user: User): Promise<User> {
    return new Promise<User>((resolver, reject) => {
      user.id = this.dataStore.users.length + 1;
      this.dataStore.users.push(user);
      this._user.next(Object.assign({}, this.dataStore).users);
      resolver(user);
    });
  }
  //Aggiunge note ad un utente
  addNoteToUser(userId?: number, note?: Note): Promise<void> {
    // const userId=2
    return new Promise<void>((resolve, reject) => {
      const user = this.dataStore.users.find((user) => user.id === userId);
      if (user) {
        note.id = user.notes.length + 1;
        user.notes.push(note);
        this._user.next(Object.assign({}, this.dataStore).users);
        resolve();
      } else {
        reject(new Error('User not found'));
      }
    });
  }
  deleteUser(userId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const user = this.dataStore.users.find((user) => user.id === userId);
      if (!user) {
        alert('Utente non trovato');
        return;
      }

      if (user.notes && user.notes.length > 0) {
        alert('Eliminare prima tutte le note');
        return;
      }

      const index = this.dataStore.users.findIndex(
        (user) => user.id === userId
      );
      if (index !== -1) {
        this.dataStore.users.splice(index, 1);
        this._user.next(Object.assign({}, this.dataStore).users);
        resolve();
      } else {
        alert('Utente non trovato');
      }
    });
  }

  //finById
  usersById(id: number) {
    return this.dataStore.users.find((x) => x.id == id);
  }
  //getAll
  getAll() {
    const userUrl = 'https://angular-material-api.azurewebsites.net/users';
    return this.http.get<User[]>(userUrl).subscribe(
      (data) => {
        this.dataStore.users = data;
        this._user.next(Object.assign({}, this.dataStore).users);
      },
      (error) => {
        console.log('errore caricamento utenti');
      }
    );
  }
  editUser(userId: number, updatedUser: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const index = this.dataStore.users.findIndex(
        (user) => user.id === userId
      );
      if (index !== -1) {
        const userToUpdate = this.dataStore.users[index];
        userToUpdate.name = updatedUser.name;
        // Assegna manualmente le altre proprietà che desideri aggiornare

        this._user.next([...this.dataStore.users]);
        resolve(userToUpdate);
      } else {
        reject(new Error('User not found'));
      }
    });
  }
  Note(userId: number, note: Note): Promise<Note> {
    return new Promise<Note>((resolve, reject) => {
      const user = this.dataStore.users.find((user) => user.id === userId);
      if (user) {
        note.id = user.notes.length + 1;
        user.notes.push(note);
        this._user.next([...this.dataStore.users]);
        resolve(note);
      } else {
        reject(new Error('User not found'));
      }
    });
  }
  
  editUserNotes(userId: number, updatedNotes: Note[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const user = this.dataStore.users.find((user) => user.id == userId);
      if (user) {
        user.notes = updatedNotes;
        this._user.next([...this.dataStore.users]);
        resolve();
      } else {
        reject(new Error('User not found'));
      }
    });
  }
  
  
  
}
