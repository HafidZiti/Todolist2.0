import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import {GooglePlus} from "@ionic-native/google-plus";
import {AngularFireModule} from "angularfire2";
import{AngularFireAuthModule} from 'angularfire2/auth';
import firebase from 'firebase';


import {LoginPage} from "../pages/login/login";

export const Firebaseconfig = {
  apiKey: "AIzaSyAn8rqs5ppwHvMmkXClmykymGEgJg4CRXQ",
  authDomain: "todoliste2-0.firebaseapp.com",
  databaseURL: "https://todoliste2-0.firebaseio.com",
  projectId: "todoliste2-0",
  storageBucket: "todoliste2-0.appspot.com",
  messagingSenderId: "387359062142"
}

  firebase.initializeApp(Firebaseconfig)

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(Firebaseconfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus
  ]
})
export class AppModule {}
