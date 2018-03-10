import {Component} from '@angular/core';
import {Modal, IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {TodoList} from "../../Models/Todoliste";
import {FirebaseserviceProvider} from "../../providers/firebaseservice/firebaseservice"
import {Observable} from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-todolist',
  templateUrl: 'todolist.html',
})
export class TodolistPage {
  listes: Observable<TodoList[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _modal: ModalController,
              private _Fireservice: FirebaseserviceProvider) {
  }

  ngOnInit() {
    console.log('ngOnInit TodolistPage');
    this.listes = this._Fireservice.getItemsList();
    //OR to get an array you can use
    // this._Fireservice.getItemsList().subscribe( data => {
    //   let list:TodoList[] = data;
    // });
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


}
