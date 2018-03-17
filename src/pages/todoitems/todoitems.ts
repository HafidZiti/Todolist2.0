import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController,Modal,ToastController,AlertController} from 'ionic-angular';
import {FirebaseserviceProvider} from "../../providers/firebaseservice/firebaseservice";
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {TodoList, TodoItem} from "../../Models/Todoliste";
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


  private openUpdateModal(item:TodoItem) {
    let myData =
      {
        id_liste: item.id,
        uuid: item.uuid,
        name: item.name,
        desc: item.desc,
        complete: item.complete
      }
    const myModal: Modal = this._modal.create('ModaltodoitemsPage', {dataName: myData});
    myModal.present();
    myModal.onDidDismiss((data => {
      console.log('OKK', data);
      if (data != null) {
        let edit_item: TodoItem = {uuid: data.uuid, name: data.name, desc: data.desc, complete: data.complete};
        this._Fireservice.updateItemFromList(this._currentListe, edit_item);
        //this.serviceliste.editTodo(id_liste, edit_item);
      }
    }));
  }


  public removeItem(uid_item) {

    let prompt = this.alertCtrl.create({
      title: 'Delete Item',
      message: "Are you sure you want to delete this Item?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Yes',
          handler: _ => this._Fireservice.removeItemFromList(this._currentListe, uid_item)
            .then(_ => {
              this.itemsListe = this._Fireservice.getItemsList(this._currentListe.uuid);
              this.showToast('middle', 'successful removal')
             })
            .catch(err => console.log("Deletion is not successful"))
        }]
    });
    prompt.present();

  }
}
