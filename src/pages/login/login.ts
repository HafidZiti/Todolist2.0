import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from '../../models/user';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HostListener } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

import {GooglePlus} from "@ionic-native/google-plus";

import {AngularFireModule} from "angularfire2";
import firebase from 'firebase';
import {TodolistPage} from "../todolist/todolist";
import {RegisterPage} from "../register/register";
import {MenuPage} from "../menu/menu";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user  = {} as User;
  inputsClicked=true;

  provider ={
    loggedin:'',
    name : '',
    profilePicture:'',
    email:''
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private ofAuth:AngularFireAuth,
              // public _facebook:Facebook
              public google_plus :  GooglePlus){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  inputsClick(){
    this.inputsClicked=false;
  }

  login(user:User){
    try {
      const result = this.ofAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      console.log(result);
      if (result){
        this.navCtrl.setRoot('MenuPage');
      }
    }catch (e)
    {
      console.error(e)
    }

  }

  register(){
    this.navCtrl.push('RegisterPage');
  }

  loginGoogle(){
    this.google_plus.login({
      'webClientId':'387359062142-6h38hdacmoi8eidrem5foahehmba4fnp.apps.googleusercontent.com',
      'offline':true
    }).then(res=>{
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(suss=>{
          alert('bien connecté ');
            this.navCtrl.setRoot('MenuPage');
        }).catch(err=>{
        alert('non connecté');
      })
    })
  }

}
