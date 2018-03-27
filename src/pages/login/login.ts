import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from '../../models/user';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HostListener} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

import {GooglePlus} from "@ionic-native/google-plus";

import {AngularFireModule} from "angularfire2";
import firebase from 'firebase';
import {TodolistPage} from "../todolist/todolist";
import {RegisterPage} from "../register/register";
//import {MenuPage} from "../menu/menu";
import {UserProfile} from "../../Models/Todoliste";
import {AuthserviceProvider} from "../../providers/authservice/authservice";
import {copy} from "@ionic/app-scripts";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  user = {} as User;

  provider = {
    loggedin: '',
    uid: '',
    name: '',
    profilePicture: '',
    email: '',
    typelogin: ''
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private ofAuth: AngularFireAuth,
              private _FirebaseProvider: AuthserviceProvider,
              // public _facebook:Facebook
              public google_plus: GooglePlus) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log("popAll");
    if (JSON.parse(localStorage.getItem('_currentUser')) != null)
      this.navCtrl.setRoot('TodolistPage');
  }

  login(user: User) {
    try {
      const result = this.ofAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if (result) {
        this.ofAuth.authState.subscribe(data => {
          if (data != null) {
            let _user: UserProfile = {
              uid: data.uid,
              email: data.email,
              name: data.displayName || 'Name pardefaut',
              url_image: data.photoURL || 'URL pardefaut'
            };
            console.log('ce user va etre ajouter au loacal ', _user)
            this._FirebaseProvider.saveUser(_user);
            localStorage.setItem('_currentUser', JSON.stringify(_user));
            this.navCtrl.setRoot('TodolistPage');
          }
        });
      }
    } catch (e) {
      console.error(e)
    }
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  loginGoogle() {
    this.google_plus.login({
      'webClientId': '387359062142-6h38hdacmoi8eidrem5foahehmba4fnp.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(suss => {
          alert('bien connecté ');
          this.navCtrl.setRoot('TodolistPage');
        }).catch(err => {
        alert('non connecté');
      })
    })
  }
}
