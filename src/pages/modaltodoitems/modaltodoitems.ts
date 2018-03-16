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
  toEdit : boolean = false;

  todaData_recive;
  completeORnot;


  constructor(private view: ViewController,
              public navParams: NavParams) {
  }

  ionViewWillLoad() {
    let data = this.navParams.get('dataName');
    if (data){
      this.toEdit = true;
      this.todaData_recive = data;
      this.completeORnot = data.complete;
    }
  }

  chargeData(item:TodoItem) {
    if (this.toEdit)
    this.view.dismiss(this.todaData_recive);
    else
      this.view.dismiss(item);
  }

  closeModal() {
    this.view.dismiss(null);
  }
}
