import {Component} from '@angular/core';
import {IonicPage, ViewController, NavParams,Platform, ActionSheetController} from 'ionic-angular';
import {TodoList} from "../../Models/Todoliste";
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ModaltodolistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface  dataToSend {
  liste: TodoList,
  imageBase64
}


@IonicPage()
@Component({
  selector: 'page-modaltodolist',
  templateUrl: 'modaltodolist.html',
})

export class ModaltodolistPage {
  todolist = {} as TodoList;

  datatoSend = {} as dataToSend;

  constructor(private view: ViewController,
              public actionsheetCtrl: ActionSheetController,
              public platform: Platform,
              private camera: Camera,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModaltodolistPage');
  }

  ionViewWillLoad() {
    let data = this.navParams.get('dataName');
  }

  chargeData(_list:TodoList) {
    console.log("data a envoyer", _list);
    this.datatoSend.liste = _list;
    console.log("data a envoyer", this.datatoSend);
    this.view.dismiss(this.datatoSend);
  }

  closeModal() {
    this.view.dismiss(null);
  }


  openOption(){
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Source',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Photo album',
          //  role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
            this.selectPrictFromAlbum();
          }
        },
        {
          text: 'Take new Picture',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
            this.takeNewPict();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  takeNewPict(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.datatoSend.imageBase64 = base64Image;
    }, (err) => {
      console.log('Error when photo takes', err)
    });

  }

  selectPrictFromAlbum(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.datatoSend.imageBase64 = base64Image;
    }, (err) => {
      console.log('Error when photo was selected', err)
    });
  }

}
