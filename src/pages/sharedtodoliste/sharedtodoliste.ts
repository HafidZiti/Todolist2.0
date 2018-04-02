import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from "rxjs/Observable";
import {TodoList} from "../../Models/Todoliste";
import {FirebaseserviceProvider} from "../../providers/firebaseservice/firebaseservice";
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';



@IonicPage()
@Component({
  selector: 'page-sharedtodoliste',
  templateUrl: 'sharedtodoliste.html',
})
export class SharedtodolistePage {

  waitList: Observable<TodoList[]> = null;
  acceptedList: Observable<TodoList[]> = null;
  size_data;

  qrdata={ };
  encodemyData:string = 'hello';
  option:BarcodeScannerOptions ;

  constructor(public navCtrl: NavController,
              public barcodeScanner:BarcodeScanner,
              public navParams: NavParams,
              private _Fireservice: FirebaseserviceProvider,
              private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    console.log('ngOnInit TodolistSahred liste Page');
    this.waitList = this._Fireservice.getWaitingListe();
    // this.waitList.switchMap().subscribe(data=>{
    //   this.size_data = data.length;
    // })
    this.waitList.subscribe(data=>{
      console.log("taille de data ", data.length);

    })
    this.acceptedList = this._Fireservice.getSharedLists();
  }

  scanQRcode() {
    this.option = {
      prompt: "Please scan Liste"
    }

    this.barcodeScanner.scan(this.option).then((encodeData) => {
      // Success! Barcode data is here
      console.log(encodeData);
      this.qrdata = encodeData;
      this._Fireservice.sahredListByQRcode(encodeData.text);

    }, (err) => {
      // An error occurred
      console.log(err);
    });
  }

  ActionWaitingList(type, _list: TodoList) {
    if (type == 0) {
      this._Fireservice.removeWaitingListe(_list);
    } else if (type == 1) {
      this._Fireservice.acceptWaitingListe(_list);
    }

  }

  removeList(list:TodoList){
    this._Fireservice.removeSharedList(list);
  }

  onloadItemsPage(liste: TodoList) {
    console.log("function clicked");
    let params = {listeSelected: liste};
    this.navCtrl.push("TodoitemsPage", params);
  }


  logoutUser() {
    this.afAuth.auth.signOut().then()
      .then(res => {
        console.log("after logout ");
        localStorage.clear();
        this.navCtrl.setRoot('LoginPage');
      })
  }

}
