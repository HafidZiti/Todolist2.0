import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  Modal,
  ToastController,
  AlertController
} from 'ionic-angular';
import {FirebaseserviceProvider} from "../../providers/firebaseservice/firebaseservice";
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {TodoList, TodoItem} from "../../Models/Todoliste";
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
import {ImagefirebaseProvider} from "../../providers/imagefirebase/imagefirebase";

@IonicPage()
@Component({
  selector: 'page-todoitems',
  templateUrl: 'todoitems.html',
})
export class TodoitemsPage {


  itemsListe: Observable<TodoItem[]> = null;
  _currentListe: TodoList;

  constructor(public navCtrl: NavController,
              private imagefirebase: ImagefirebaseProvider,
              public barcodeScanner: BarcodeScanner,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              private _modal: ModalController,
              public navParams: NavParams,
              private _Fireservice: FirebaseserviceProvider,
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


  generateQRcode(_list: TodoList) {
    let currentUserUid = this._Fireservice.getUidCurrentUser();
    let uidUserList = currentUserUid.concat('/').concat(_list.uuid);
    console.log("uid Combinés", uidUserList);
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, uidUserList).then((res) => {
      console.log(res)
      //this.encodedData = res;
    }, (err) => {
      // An error occurred
      console.log(err);
    })
  }

  private openTodoItemModal() {
    const myModal: Modal = this._modal.create('ModaltodoitemsPage');
    myModal.present();
    myModal.onDidDismiss((data => {
      console.log('OKK', data);
      if (data != null) {
        let _todoitems: TodoItem = {name: data.name, desc: data.desc, complete: false}
        this._Fireservice.insertItmes(this._currentListe, _todoitems);
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


  private openUpdateModal(item: TodoItem) {
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

  ShowEmailShareAlert(_liste: TodoList) {
    let prompt = this.alertCtrl.create({
      title: 'Shared With',
      message: "Enter a personal email with which you will share this list",
      inputs: [
        {
          name: 'email',
          placeholder: 'email@email.com'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this._Fireservice.sahredListByEmail(_liste, data.email)
            // .then(_ => this.showToast('middle','List succesfuly sahred'))
            // .catch(err => this.showToast('middle','Something wrong happened'))
          }
        }
      ]
    });
    prompt.present();
  }


//  update Current Liste
  private _openUpdateModal(_list: TodoList) {
    let myData =
      {
        id_liste: _list.id,
        uuid: _list.uuid,
        name: _list.name,
        desc: _list.desc,
        url_image: _list.url_image
      }
    const myModal: Modal = this._modal.create('ModaltodolistPage', {dataName: myData});
    myModal.present();
    myModal.onDidDismiss((data => {
      console.log('OKK', data);
      if (data != null) {
        if (data.url_image_base64) {
          let UploadTask = this.imagefirebase.uploadImage(data.url_image_base64);
          UploadTask.then(PictureSaved => {
            console.log('url image ', PictureSaved.downloadURL);
            let edited_list: TodoList = {
              uuid: data.uuid,
              name: data.name,
              desc: data.desc,
              url_image: PictureSaved.downloadURL
            }
            this._Fireservice.updateList(edited_list).then(()=>{
              this._currentListe = edited_list;
            });
          })
        } else {
          let edited_list: TodoList = {uuid: data.uuid, name: data.name, desc: data.desc, url_image: data.url_image};
          this._Fireservice.updateList(edited_list).then(()=>{
            this._currentListe = edited_list;
          });
        }
        //this.serviceliste.editTodo(id_liste, edit_item);
      }
    }));
  }

  //Remove Current List

  private _removeList(_list: TodoList) {
    let prompt = this.alertCtrl.create({
      title: 'Delete List',
      message: "Are you sure you want to delete this List?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Yes',
          handler: _ => this._Fireservice.removeList(_list)
            .then(_ => {
             // this.listes01 = this._Fireservice.getTodoList();
              this.showToast('middle', 'successful removal');
              this.navCtrl.setRoot('TodolistPage');
            })
            .catch(err => console.log("Deletion is not successful"))
        }]
    });
    prompt.present();
  }
}
