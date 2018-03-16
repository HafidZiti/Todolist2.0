import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import {TodoItem} from "../../Models/Todoliste";

@IonicPage()
@Component({
  selector: 'page-modaltodoitems',
  templateUrl: 'modaltodoitems.html',
})
export class ModaltodoitemsPage {
  itemsListe = {} as TodoItem;


  constructor(private view: ViewController,
              public navParams: NavParams) {
  }

  ionViewWillLoad() {
    let data = this.navParams.get('dataName');
  }

  chargeData(item:TodoItem) {
    //console.log("donnée changées", this.todaData_recive);
    this.view.dismiss(item);
  }


  closeModal() {
    this.view.dismiss(null);
  }
}
