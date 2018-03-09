import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Nav} from 'ionic-angular';

import {AngularFireAuth} from 'angularfire2/auth';
import {GooglePlus} from "@ionic-native/google-plus";

export interface PageInteface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  rootPage = 'TabsPage';
  @ViewChild(Nav) nav: Nav;

  pages: PageInteface[] = [
    {
      title: 'My Todolist',
      pageName: 'TabsPage',
      tabComponent: 'TodolistPage',
      index: 0, icon: 'person'
    },

    {
      title: 'Shared Todoliste',
      pageName: 'TabsPage',
      tabComponent: 'SharedtodolistePage',
      index: 1, icon: 'people'
    },

    {
      title: 'About',
      pageName: 'AboutPage',
      icon: 'home'
    },

  ]


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _googleplus: GooglePlus,
              private _authent: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPage(page: PageInteface) {
    let params = {};

    if (page.index) {
      params = {tabIndex: page.index};
    }

    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      this.nav.setRoot(page.pageName, params);
    }
  }

  isActive(page: PageInteface) {
    let childNav = this.nav.getActiveChildNav();
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
  }

  logoutUser() {
   this._authent.auth.signOut().then(() => {
      this.navCtrl.push('LoginPage');
   });
  }

}
