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
    // if (this.checkUserIfArealySaved(_user)) {

    this.checkUserIfArealySaved(_user);
    this.db.list('Users/').set(_user.uid, _user);

   // this.checkUserIfArealySaved(_user);

    // this.users = this.db.list('Users/');
    // const Ref$ = this.users.push(<UserProfile>{});
    // _user.key = Ref$.key;


    // }else console.log('user deja existe');
  }

  private checkUserIfArealySaved(user: UserProfile): AngularFireObject<UserProfile> {
    // const path = 'Users/'.concat(user.uid).concat('/').concat(user.uid);
    const path = 'Users/';
    console.log('ptah', path);
    const ref$ = this.db.list(path, ref => ref.orderByChild('email').equalTo(user.email));

    //  ref$.snapshotChanges().subscribe(data=>{
    //    console.log('la taile de la reposne',data)
    // })


    ref$.valueChanges().subscribe(data => {
      console.log('la taile de la reposne', data.length);


      // for (let user:UserProfile of data){
      //   console.log('objet returne',user.email);
      // }

      data.map((t:UserProfile)  => {
       // t.valueOf().hasOwnProperty('email')
        //con
        console.log('objet returne',t.email);
      })
    })



    return null;


// this.item = af.database.object('/item', { preserveSnapshot: true });
// this.item.subscribe(snapshot => {
//   this.values= snapshot.val();


  }
}
