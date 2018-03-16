import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {UserProfile} from "../../Models/Todoliste";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthserviceProvider {
  user: Observable<UserProfile>;
  constructor( private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  // updateUserData(credential): Promise<User> {
  //   //console.log('credential:', credential);
  //   let user: User = {
  //     uid: credential.user.uid,
  //     email: credential.user.email,
  //     displayName: credential.user.displayName,
  //     photoURL: credential.user.photoURL
  //   }
  //   //console.log('user:', user);
  //   // Check if new user
  //   if (credential.additionalUserInfo.isNewUser) {
  //     // Sets user data to firebase on login
  //     this.db.list(`/users/`).set(user.uid, user);
  //   }
  //   localStorage.setItem('user', JSON.stringify(user));
  //   return new Promise(resolve => resolve(user));
  // }

  // checkConnection(): boolean {
  //   return !!localStorage.getItem("user");
  // }
  //
  // getUserData() {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   return this.db.object(`/users/${user.uid}`).valueChanges();
  // }
  //
  // signOut() {
  //   return this.afAuth.auth.signOut()
  //     .then(res => localStorage.clear());
  // }
}
