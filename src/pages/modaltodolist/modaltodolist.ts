import {Component} from '@angular/core';
import {IonicPage, ViewController, NavParams} from 'ionic-angular';
import {TodoList} from "../../Models/Todoliste";

/**
 * Generated class for the ModaltodolistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modaltodolist',
  templateUrl: 'modaltodolist.html',
})
export class ModaltodolistPage {
  todolist = {} as TodoList;

  constructor(private view: ViewController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModaltodolistPage');
  }

  ionViewWillLoad() {
    let data = this.navParams.get('dataName');
  }

  chargeData(todo:TodoList) {
    //console.log("donnée changées", this.todaData_recive);
    this.view.dismiss(todo);
  }


  closeModal() {
    this.view.dismiss(null);
  }


}
