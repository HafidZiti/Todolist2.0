import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {AboutPage} from "../pages/about/about";
import {TodolistPage} from "../pages/todolist/todolist";
import {SharedtodolistePage} from "../pages/sharedtodoliste/sharedtodoliste";

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

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      if (1) {
        this.rootPage = LoginPage;
      } else {
        this.rootPage = LoginPage;
      }
                 /* logout() {
                    this.oauthService.logOut();
                    this.nav.setRoot(LoginPage);
                    this.nav.popToRoot();
                  }*/


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  onPage(m){
    this.rootPage=m.component;
  }
}
