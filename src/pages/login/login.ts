import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,Platform} from 'ionic-angular';
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
import {
  AdMobFree,

} from '@ionic-native/admob-free';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  user = {} as User;

  ads_action = 1;

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
              private platform:Platform,
              private adMobFree: AdMobFree,
              private ofAuth: AngularFireAuth,
              private _FirebaseProvider: AuthserviceProvider,
              // public _facebook:Facebook
              public google_plus: GooglePlus) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log("popAll");

    if (this.platform.is('cordova') ) {
      this.adMobFree.banner.remove();
    }

    if (JSON.parse(localStorage.getItem('_currentUser')) != null)
      this.navCtrl.setRoot('TodolistPage');
  }

  ads_function(){
    if(this.ads_action == 1) this.ads_action = 0
    else if (this.ads_action == 0) this.ads_action = 1;
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
              name: data.displayName || data.email,
              url_image: data.photoURL || 'URL pardefaut'
            };
            console.log('ce user va etre ajouter au loacal ', _user)
            this._FirebaseProvider.saveUser(_user);
            localStorage.setItem('_currentUser', JSON.stringify(_user));
            localStorage.setItem('ads', JSON.stringify(this.ads_action));
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
          this.ofAuth.authState.subscribe(data => {
            if (data != null) {
              let _user: UserProfile = {
                uid: data.uid,
                email: data.email,
                name: data.displayName || data.email,
                url_image: data.photoURL || 'URL pardefaut'
              };
              console.log('ce user va etre ajouter au loacal ', _user)
              this._FirebaseProvider.saveUser(_user);
              localStorage.setItem('_currentUser', JSON.stringify(_user));
              localStorage.setItem('ads', JSON.stringify(this.ads_action));
              this.navCtrl.setRoot('TodolistPage');
            }
          });
        }).catch(err => {
        alert('non connecté');
      })
    })
  }
}
