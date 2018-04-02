import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {AboutPage} from "../pages/about/about";
import {TodolistPage} from "../pages/todolist/todolist";
import {SharedtodolistePage} from "../pages/sharedtodoliste/sharedtodoliste";
import {UserProfile} from "../Models/Todoliste";
import { timer } from "rxjs/observable/timer";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = LoginPage;

  showSplash = true;

  menu=[
    // {title:'Accueil',component:AccueilPage},
    {title:'Mes Listes',component:TodolistPage,icon:'person'},
    {title:'Listes Partagées',component:SharedtodolistePage,icon:'people'},
    {title:'A Propos',component:AboutPage,icon:'md-information-circle'},
  ];

      //  _CurrentUser:UserProfile;

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

      timer(3000).subscribe(()=>this.showSplash=false)
    });
  }
  onPage(m){
    this.rootPage=m.component;
  }

  // ionViewDidLoad(){
  //   this._CurrentUser.email = JSON.parse(localStorage.getItem('_currentUser')).email || 'hhhhhh';
  // }
}






// <!--<preference name="SplashMaintainAspectRatio" value="true" />-->
// <!--<preference name="FadeSplashScreenDuration" value="300" />-->
// <!--<preference name="SplashShowOnlyFirstTime" value="false" />-->
// <!--<preference name="SplashScreen" value="screen" />-->
// <!--<preference name="SplashScreenDelay" value="3000" />-->




// *****************************animation  config
// <preference name="FadeSplashScreenDuration" value="300" />
// <preference name="SplashScreenDelay" value="3000" />
// <preference name="AutoHideSplashScreen" value="false" />
// <preference name="FadeSplashScreen" value="true" />
// <preference name="ShowSplashScreen" value="true" />




// ************************ solve probleme of blank page
// <preference name="AutoHideSplashScreen" value="false" />
// <preference name="SplashScreenDelay" value="10000" />
// <preference name="FadeSplashScreenDuration" value="1000" />
// <preference name="SplashScreen" value="screen" />
// <preference name="ShowSplashScreen" value="true" />
// <preference name="ShowSplashScreenSpinner" value="false" />
// <preference name="SplashShowOnlyFirstTime" value="false" />
// <preference name="FadeSplashScreen" value="true" />
//
