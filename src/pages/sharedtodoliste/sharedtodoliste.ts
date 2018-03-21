import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from "rxjs/Observable";
import {TodoList} from "../../Models/Todoliste";
import {FirebaseserviceProvider} from "../../providers/firebaseservice/firebaseservice"


@IonicPage()
@Component({
  selector: 'page-sharedtodoliste',
  templateUrl: 'sharedtodoliste.html',
})
export class SharedtodolistePage {

  waitList: Observable<TodoList[]> = null;
  acceptedList: Observable<TodoList[]> = null;
  size_data;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _Fireservice: FirebaseserviceProvider,
              private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    console.log('ngOnInit TodolistSahred liste Page');
    this.waitList = this._Fireservice.getWaitingListe();
    // this.waitList.switchMap().subscribe(data=>{
    //   this.size_data = data.length;
    // })
    this.waitList.subscribe(data=>{
      console.log("taille de data ", data.length);

    })
    this.acceptedList = this._Fireservice.getSharedLists();
  }

  ActionWaitingList(type, _list: TodoList) {
    if (type == 0) {
      this._Fireservice.removeWaitingListe(_list);
    } else if (type == 1) {
      this._Fireservice.acceptWaitingListe(_list);
    }

  }

  logoutUser() {
    this.afAuth.auth.signOut().then()
      .then(res => {
        console.log("after logout ");
        localStorage.clear();
        this.navCtrl.setRoot('LoginPage');
      })
  }

}
