import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {AboutPage} from "../pages/about/about";
import {TodolistPage} from "../pages/todolist/todolist";
import {SharedtodolistePage} from "../pages/sharedtodoliste/sharedtodoliste";
import {UserProfile} from "../Models/Todoliste";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  menu=[
    // {title:'Accueil',component:AccueilPage},
    {title:'Mes Listes',component:TodolistPage},
    {title:'Listes Partagées',component:SharedtodolistePage},
    {title:'A Propos',component:AboutPage},

  ];

      //_CurrentUser:UserProfile;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
      // this._CurrentUser = JSON.parse(localStorage.getItem('_currentUser'));
      // if (!this._CurrentUser.email){
      //   console.log('message ',this._CurrentUser)
      //   this._CurrentUser.email='hhhhhhhhhhhh';
      // }
      // this.rootPage=TodolistPage;
    platform.ready().then(() => {
      if (1) {
        this.rootPage = LoginPage;
      } else {
        this.rootPage = LoginPage;
      }
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  onPage(m){
    this.rootPage=m.component;
  }

  // ionViewDidLoad(){
  //   this._CurrentUser.email = JSON.parse(localStorage.getItem('_currentUser')).email || 'hhhhhh';
  // }
}
