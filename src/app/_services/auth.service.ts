import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, firestore } from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
export interface User {
  displayName: string,
  email: string,
  lastSignInTime: string,
  creationTime: string,
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
      this.afAuth.idToken.subscribe(t => {
        this.token = t
        console.log(t);
        
      })
    })
  }
  getAuthToken() {
    return this.afAuth.idToken
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
  // Sign up with email/password
  private signUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert("You have been successfully registered!");
        console.log(result.user)
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign in with email/password
  private signIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        //  this.router.navigate(['<!-- enter your route name here -->']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  private createUser(user: firebase.User) {
    const userData: User = {
      displayName: user.displayName,
      email: user.email,
      lastSignInTime: this.timeConvert(user.metadata.lastSignInTime),
      creationTime: this.timeConvert(user.metadata.creationTime),
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
