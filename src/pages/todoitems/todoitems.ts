import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController,Modal,ToastController,AlertController} from 'ionic-angular';
import {FirebaseserviceProvider} from "../../providers/firebaseservice/firebaseservice";
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {TodoItem, TodoList} from "../../Models/Todoliste";

@IonicPage()
@Component({
  selector: 'page-todoitems',
  templateUrl: 'todoitems.html',
})
export class TodoitemsPage {

  itemsListe: Observable<TodoItem[]> = null;
  _currentListe:TodoList ;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              private _modal: ModalController,
              public navParams: NavParams, private _Fireservice: FirebaseserviceProvider,
              private _authent: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoitemsPage');
  }

  ngOnInit() {
    this._currentListe = this.navParams.data.listeSelected || 'L7D6CDIZZO9Koi1A7D5';
    console.log("liste selection", this._currentListe.uuid);
   this.itemsListe = this._Fireservice.getItemsList(this._currentListe.uuid);
    console.log("liste", this.itemsListe);

  }

  private openTodoItemModal() {
    const myModal: Modal = this._modal.create('ModaltodoitemsPage');
    myModal.present();
    myModal.onDidDismiss((data => {
      console.log('OKK', data);
      if (data != null) {
        let _todoitems: TodoItem = { name: data.name, desc: data.desc,complete: false}
        this._Fireservice.insertItmes(this._currentListe,_todoitems);
      }
    }));
  }




  showToast(position: string, msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

  // public removeItem(id_item) {
  //
  //   let prompt = this.alertCtrl.create({
  //     title: 'Delete Item',
  //     message: "Are you sure you want to delete this Item?",
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //         }
  //       },
  //       {
  //         text: 'Yes',
  //         handler: _ => this._Fireservice.removeItemFromList(this.CurrenetList, id_item)
  //           .then(_ => {
  //             this.getItemsOfList();
  //             this.showToast('middle', 'successful removal')
  //            })
  //           .catch(err => console.log("Deletion is not successful"))
  //       }]
  //   });
  //   prompt.present();
  //
  //
  // }




}
