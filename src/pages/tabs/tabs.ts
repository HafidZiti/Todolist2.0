import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root='TodolistPage';
  tab2Root='SharedtodolistePage';
  myIndex:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.myIndex= this.navParams.data.tabIndex || 0;

  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad TabsPage');
  // }

}
