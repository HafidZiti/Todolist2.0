import {Component} from '@angular/core';
import {Modal, IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {TodoList} from "../../Models/Todoliste";
import {FirebaseserviceProvider} from "../../providers/firebaseservice/firebaseservice"
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';


import {UserProfile} from "../../Models/Todoliste";

@IonicPage()
@Component({
  selector: 'page-todolist',
  templateUrl: 'todolist.html',
})
export class TodolistPage {
  //listes: AngularFireList<TodoList> = null;
  listes01: Observable<TodoList[]> = null;

  currUser:UserProfile;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _modal: ModalController,
              private _Fireservice: FirebaseserviceProvider,
              private afAuth: AngularFireAuth,
              private db : AngularFireDatabase) {}

  ngOnInit() {

    console.log('ngOnInit TodolistPage');
    this.listes01 = this._Fireservice.getItemsList();

  }

  private openTodoListModal() {
    const myModal: Modal = this._modal.create('ModaltodolistPage');
    myModal.present();
    myModal.onDidDismiss((data => {
      console.log('OKK', data);
      if (data != null) {
        let _todolist: TodoList = {name: data.name, desc: data.desc}
        this._Fireservice.insertListe(_todolist);
      }
    }));
  }

  logoutUser() {
    this.afAuth.auth.signOut().then()
      .then(res => {
        console.log("after logout ");
        localStorage.clear();
        // this.navCtrl.setRoot('LoginPage').then(res=>{this.navCtrl.remove(0,2)});
        this.navCtrl.setRoot('LoginPage');
      })
  }


}
