import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FirebaseserviceProvider} from "../../providers/firebaseservice/firebaseservice";
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {TodoList} from "../../Models/Todoliste";

@IonicPage()
@Component({
  selector: 'page-todoitems',
  templateUrl: 'todoitems.html',
})
export class TodoitemsPage {



  constructor(public navCtrl: NavController, public navParams: NavParams,private _Fireservice:FirebaseserviceProvider,
              private _authent: AngularFireAuth){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoitemsPage');
  }

  ngOnInit() {
    console.log('ngOnInit TodolistPage');
  }


}
