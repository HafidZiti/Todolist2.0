import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {UserProfile} from "../../Models/Todoliste";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthserviceProvider {

  users: AngularFireList<UserProfile> = null;
  constructor(private db:AngularFireDatabase) {
  }

/*  insertUser(user: UserProfile) {
    this.users = this.db.list('Users/'.concat(user.uid));
    const listRef$ = this.listes.push(<TodoList>{});
    liste.desc=this.gene_para.get(1, 0);
    liste.uuid=listRef$.key;
    liste.creation_date = Date.now();
    listRef$.set(liste);
  }*/

}
