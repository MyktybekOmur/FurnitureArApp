import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(  private auth: Auth,
    private firestore: Firestore) { }

    login(email: string,password: string){
      const user = this.auth.currentUser;
      const userDocRef = collection(this.firestore, 'users');
      const q =  query(userDocRef, where("email", "==", email),where("password", "==", password));
      return collectionData(q, { idField: 'id' });
    }
}
