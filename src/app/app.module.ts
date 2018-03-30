import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {GooglePlus} from "@ionic-native/google-plus";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import firebase from 'firebase';
import {LoginPageModule} from "../pages/login/login.module";
import {LoginPage} from "../pages/login/login";
import {FirebaseserviceProvider} from '../providers/firebaseservice/firebaseservice';
import {NgxLoremIpsumModule} from 'ngx-lorem-ipsum';
import {AuthserviceProvider} from '../providers/authservice/authservice';
import {AboutPage} from "../pages/about/about";
import {TodoitemsPageModule} from "../pages/todoitems/todoitems.module";
import {TodolistPageModule} from "../pages/todolist/todolist.module";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { ImagefirebaseProvider } from '../providers/imagefirebase/imagefirebase';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AdMobFree } from '@ionic-native/admob-free';
import {SharedtodolistePageModule} from "../pages/sharedtodoliste/sharedtodoliste.module";
import {AboutPageModule} from "../pages/about/about.module";

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
    //AboutPage,
   // TodolistPage,
    //SharedtodolistePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(Firebaseconfig),
    LoginPageModule,
    AngularFireDatabaseModule,
    NgxLoremIpsumModule,
    HttpClientModule,
    TodoitemsPageModule,
    TodolistPageModule,
   AboutPageModule,
    SharedtodolistePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
   // AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    FirebaseserviceProvider,
    AuthserviceProvider,
    BarcodeScanner,
    Camera,
    AdMobFree,
    ImagefirebaseProvider
  ]
})
export class AppModule {
}
