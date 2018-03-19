import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {UserProfile} from "../../Models/Todoliste";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthserviceProvider {
  users: AngularFireList<UserProfile> = null;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
  }

  saveUser(_user: UserProfile) {
    if (this.checkUserIfArealySaved(_user).length == 0) {
      this.db.list('Users/').set(_user.uid, _user);
    } else console.log('user deja existe');
  }


  private checkUserIfArealySaved(user: UserProfile): any {
    const path = 'Users/';
    console.log('ptah', path);
    const ref$ = this.db.list(path, ref => ref.orderByChild('email').equalTo(user.email));
    ref$.valueChanges().subscribe(data => {
      console.log('la taille de l data', data.length);
      return data;
      // data.map((t:UserProfile)  => {
      //   console.log('objet returne',t.email);
      // })
    })

    //  ref$.snapshotChanges().subscribe(data=>{
    //    console.log('la taile de la reposne',data)
    // })

  }
}


// this.item = af.database.object('/item', { preserveSnapshot: true });
// this.item.subscribe(snapshot => {
//   this.values= snapshot.val();
