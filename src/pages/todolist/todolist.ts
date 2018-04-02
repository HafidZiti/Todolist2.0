import {Component} from '@angular/core';
import {Modal, IonicPage, NavController, NavParams, ModalController, Platform,AlertController, ToastController} from 'ionic-angular';
import {TodoList} from "../../Models/Todoliste";
import {FirebaseserviceProvider} from "../../providers/firebaseservice/firebaseservice"
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {ImagefirebaseProvider} from "../../providers/imagefirebase/imagefirebase";
import {
  AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig,
  AdMobFreeRewardVideoConfig
} from '@ionic-native/admob-free';


import {UserProfile} from "../../Models/Todoliste";

@IonicPage()
@Component({
  selector: 'page-todolist',
  templateUrl: 'todolist.html',
})
export class TodolistPage {
  listes01: Observable<TodoList[]> = null;
  //itemListe: Observable<TodoList[]> = null;

  currUser: UserProfile;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private _modal: ModalController,
              public alertCtrl: AlertController,
              private _Fireservice: FirebaseserviceProvider,
              private afAuth: AngularFireAuth,
              private imagefirebase: ImagefirebaseProvider,
              private adMobFree: AdMobFree,
              private platform: Platform,
              private db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    if (this.platform.is('cordova') && JSON.parse(localStorage.getItem('ads')) == 1) {
      this.showBannerAd();
      // this.showInterstitialAd()
      // this.showVideoRewardsAd()
    }
  }

  async showBannerAd() {
    try {
      const bannerConfig: AdMobFreeBannerConfig = {
        id: 'ca-app-pub-1716950648369531/6026722385',
        isTesting: true,
        autoShow: true
      }

      this.adMobFree.banner.config(bannerConfig);

      const result = await this.adMobFree.banner.prepare();
      console.log(result);
    }
    catch (e) {
      console.error(e);
    }
  }

  async showInterstitialAd() {
    try {
      const interstitialConfig: AdMobFreeInterstitialConfig = {
        id: 'ca-app-pub-1716950648369531/4699244566',
        isTesting: false,
        autoShow: true
      }

      this.adMobFree.interstitial.config(interstitialConfig);

      const result = await this.adMobFree.interstitial.prepare();
      console.log(result);
    }
    catch (e) {
      console.error(e)
    }
  }

  async showVideoRewardsAd() {
    try {
      const videoRewardsConfig: AdMobFreeRewardVideoConfig = {
        id: 'ca-app-pub-1716950648369531/3476881980',
        isTesting: false,
        autoShow: true
      }

      this.adMobFree.rewardVideo.config(videoRewardsConfig);

      const result = await this.adMobFree.rewardVideo.prepare();
      console.log(result);
    }
    catch (e) {
      console.error(e);
    }
  }


  ngOnInit() {
    console.log('ngOnInit TodolistPage');
    this.listes01 = this._Fireservice.getTodoList();
  }


  onloadItemsPage(liste: TodoList) {
    let params = {listeSelected: liste};
    this.navCtrl.push("TodoitemsPage", params);

  }

  private openTodoListModal() {
    const myModal: Modal = this._modal.create('ModaltodolistPage');
    myModal.present();
    myModal.onDidDismiss((data => {
      console.log('OKK', data);
      if (data != null) {
        console.log('data recuprer', data);
        if (data.imageBase64) {
          let UploadTask = this.imagefirebase.uploadImage(data.imageBase64);
          UploadTask.then(PictureSaved => {
            console.log('url image ', PictureSaved.downloadURL);
            let _todolist: TodoList = {
              name: data.liste.name,
              desc: data.liste.desc,
              url_image: PictureSaved.downloadURL
            }
            this._Fireservice.insertListe(_todolist);
          })
        } else {
          let _todolist: TodoList = {name: data.liste.name, desc: data.liste.desc, url_image: null}
          this._Fireservice.insertListe(_todolist);
        }
      }
    }));
  }

  private openUpdateModal(_list:TodoList) {
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
        let edited_list : TodoList = {uuid: data.uuid, name: data.name, desc: data.desc, url_image: data.url_image};
        this._Fireservice.updateList(edited_list);
        //this.serviceliste.editTodo(id_liste, edit_item);
      }
    }));
  }

  private removeList(_list:TodoList){
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
              this.listes01 = this._Fireservice.getTodoList();
              this.showToast('middle', 'successful removal')
            })
            .catch(err => console.log("Deletion is not successful"))
        }]
    });
    prompt.present();
  }

  showToast(position: string, msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

  logoutUser() {
    this.afAuth.auth.signOut().then()
      .then(res => {
        console.log("after logout ");
        localStorage.clear();
        console.log('on arrivé a ', this.navCtrl.length());
        this.navCtrl.remove(0, this.navCtrl.length() - 1);
        this.navCtrl.setRoot('LoginPage').then(() => {
          const index = this.navCtrl.getActive().index;
          console.log('on arrivé a ', index);
          // this.navCtrl.remove(0, this.navCtrl.length());
        });
      })
  }
}
