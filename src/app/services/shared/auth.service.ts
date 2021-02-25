import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthUser } from 'src/models/user/auth-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubj = new BehaviorSubject<AuthUser>(null);
  userSubj$ = this.userSubj.asObservable();
  redirectUrl = new BehaviorSubject('home');

  constructor(private afAuth: AngularFireAuth) {}

  loginViaGoogle(): Observable<firebase.default.auth.UserCredential> {
    return from(
      this.afAuth.signInWithPopup(
        new firebase.default.auth.GoogleAuthProvider()
      )
    );
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  setRedirectUrl(url: string) {
    this.redirectUrl.next(url);
  }

  getRedirectUrl() {
    return this.redirectUrl.getValue();
  }

  setCurrentUser(
    displayName = '',
    email = '',
    date = Date.now().toString(),
    sessionDuration = 0
  ) {
    const user: AuthUser = {
      email: email,
    };

    console.log('user to save', user);
    this.userSubj.next(user);
  }

  getCurrentUser(): AuthUser {
    return this.userSubj.getValue();
  }
}
