import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, firestore } from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
export interface User {
  displayName: string,
  email: string,
  lastSignIn: string,
  createdAt: string,
  photoURL: string,
  uid: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: firebase.User
  token: string;
  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    public datepipe: DatePipe
  ) {
    this.afAuth.auth.onAuthStateChanged( user => {
      this.user = user
      this.afAuth.idToken.subscribe(t => this.token = t)
    })
  }
  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      res => {
        if (res.user) {
          console.log(res.user);
          
          this.createUser(res.user)
        }
      }, rejected => {
        alert(console.log(rejected));
      }
    );
  }
  logout() {
    return this.afAuth.auth.signOut();
  }
  private createUser(user: firebase.User) {
    const userData: User = {
      displayName: user.displayName,
      email: user.email,
      lastSignIn: this.timeConvert(user.metadata.b),
      createdAt: this.timeConvert(user.metadata.a),
      photoURL: user.photoURL,
      uid: user.uid
    }
    this.db.collection('users').doc(user.uid).set(userData, { merge: true }).catch(err => alert(err))
  }
  timeConvert(timeStamp: string){
    let res = this.datepipe.transform(timeStamp, 'MMM-dd-yyyy hh:mm:ss z');
    return res
   }
}
