import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {TodoItem, TodoList, UserProfile} from "../../Models/Todoliste";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from 'angularfire2/auth';
import {NgxLoremIpsumService} from 'ngx-lorem-ipsum';


@Injectable()
export class FirebaseserviceProvider {

  listes: AngularFireList<TodoList> = null;
  waitingListes: AngularFireList<TodoList> = null;
  sharedLists: AngularFireList<TodoList> = null;
  items: AngularFireList<TodoItem> = null;
  users: AngularFireList<UserProfile> = null;
  currUser: UserProfile;


  uuidUserToShare:any;

  constructor(private db: AngularFireDatabase,
              private  gene_para: NgxLoremIpsumService,
              private afAuth: AngularFireAuth) {
  }

  private setUserUid() {
    this.currUser = JSON.parse(localStorage.getItem('_currentUser'));
    this.listes = this.db.list('Listes/'.concat(this.currUser.uid));
    this.waitingListes = this.db.list('WaitingSahredLists/'.concat(this.currUser.uid));
   this.sharedLists = this.db.list('SharedLists/'.concat(this.currUser.uid));
  }

  getUidCurrentUser():string{
    this.currUser = JSON.parse(localStorage.getItem('_currentUser'));
    return this.currUser.uid;
  }


  getTodoList(): Observable<TodoList[]> {
    this.setUserUid();
    return this.listes.valueChanges();
  }

  getWaitingListe(): Observable<TodoList[]> {
    this.setUserUid();
    return this.waitingListes.valueChanges();
  }

  getSharedLists(): Observable<TodoList[]> {
    this.setUserUid();
    return this.sharedLists.valueChanges();
  }

  removeWaitingListe(_liste:TodoList):Promise<void>{
    this.setUserUid();
    // return this.waitingSharedList.remove(_liste.uuid);
    return this.db.list('WaitingSahredLists/'.concat(this.currUser.uid)).remove(_liste.uuid);
  }


  acceptWaitingListe(_liste:TodoList){
    this.setUserUid();
    this.db.list('SharedLists/'.concat(this.currUser.uid)).set(_liste.uuid, _liste);
    console.log('list encours ', _liste);
    this.removeWaitingListe(_liste);
  }

  removeSharedList(_liste:TodoList):Promise<void>{
    this.setUserUid();
    return this.db.list('SharedLists/'.concat(this.currUser.uid)).remove(_liste.uuid);
  }

  insertListe(liste: TodoList) {
    this.setUserUid();
    const listRef$ = this.listes.push(<TodoList>{});
    liste.desc = this.gene_para.get(1, 0);
    liste.uuid = listRef$.key;
    liste.creation_date = Date.now();
    listRef$.set(liste);
  }


  getItemsList(uid_liste: string): Observable<TodoItem[]> {
    this.items = this.db.list('Items/'.concat(uid_liste));
    return this.items.valueChanges();
  }


  insertItmes(liste: TodoList, item: TodoItem) {
    this.items = this.db.list('Items/'.concat(liste.uuid));
    const listItem$ = this.items.push(<TodoItem>{});
    item.desc = this.gene_para.get(1, 0);
    item.uuid = listItem$.key;
    item.creation_date = Date.now();
    listItem$.set(item);
  }

  public updateList(_todolist: TodoList): Promise<void> {
    return this.db.list('Listes/'.concat(this.getUidCurrentUser())).set(_todolist.uuid, _todolist);
  }


  public updateItemFromList(_todolist: TodoList, _item: TodoItem): Promise<void> {
    return this.db.list('Items/'.concat(_todolist.uuid)).set(_item.uuid, _item);
  }

  public removeList(_todolist: TodoList,): Promise<void> {
    return this.db.list('Listes/'.concat(this.currUser.uid)).remove(_todolist.uuid);
  }

  public removeItemFromList(_todolist: TodoList,_uidItem): Promise<void> {
    return this.db.list('Items/' + _todolist.uuid).remove(_uidItem);
  }


  public sahredListByEmail(_liste:TodoList,_email:string){
    this.getUserUid(_email).then((user:UserProfile)=>{
      console.log(user);
       this.db.list('WaitingSahredLists/'.concat(user.uid)).set(_liste.uuid, _liste);

      // localStorage.setItem('uuid', JSON.stringify(this.uuidUserToShare));

    })
    // this.uuidUserToShare = JSON.parse(localStorage.getItem('uuid'));
     console.log('uid en fin', this.uuidUserToShare);

  }

  getListByuid(uidUser:string ,uidList:string)
  {
    const path = 'Listes/'.concat(uidUser);
    console.log('ptah', path);
    let lists = this.db.list(path, ref => ref.orderByChild('uuid').equalTo(uidList));
    return new Promise(resolve => {
      lists.valueChanges().subscribe(
        (data: any) => {
          data.map((l: UserProfile) => {
            console.log(l);
            resolve(l);
          })
        })
    })
  }

  public sahredListByQRcode(uidUserList: string) {
    let splitted = uidUserList.split("/", 2);
    let uidUser = splitted[0];
    let uidList = splitted[1];
    console.log("userUid", uidUser);
    console.log("userList", uidList);
    this.getListByuid(uidUser, uidList).then((list: TodoList) => {
      console.log(list);
      this.db.list('SharedLists/'.concat(this.getUidCurrentUser())).set(list.uuid, list);
      // localStorage.setItem('uuid', JSON.stringify(this.uuidUserToShare));
    })
  }

  private getUserUid(_email: string) {
    const path = 'Users/';
    console.log('ptah', path);
    this.users = this.db.list(path, ref => ref.orderByChild('email').equalTo(_email));
    return new Promise(resolve => {
      this.users.valueChanges().subscribe(
        (data: any) => {
          data.map((t: UserProfile) => {
            console.log(t);
            resolve(t);
          })
        })
    })


    //  ref$.snapshotChanges().subscribe(data=>{
    //    console.log('la taile de la reposne',data)
    // })

  }




  /*  public getLists(): Observable<TodoList[]> {
      return this.TodoRef$.valueChanges();
    }
    public insertListe(_NewListe): Promise<void> {
      const todoListRef$ = this.TodoRef$.push(<TodoList>{});
      const todoList: TodoList = {
        uuid: todoListRef$.key,
        name: _NewListe.name,
        desc:_NewListe.desc,
        items: new Set()
      };
      console.log("path", '/list-tasks/' + todoListRef$.key + '/items/');
      return todoListRef$.set(todoList);
    }
    public updateListe() {
    }
    public insertItem(_todolist: TodoList, _data_clavier): Promise<void> {
      const todoListItemRef$ = this.db.list('/list-tasks/' + _todolist.uuid + '/items/').push(<TodoItem>{});
      const item: TodoItem = {
        uuid: todoListItemRef$.key,
        name: _data_clavier.titre,
        desc: _data_clavier.desc,
        complete: false
      };
      return todoListItemRef$.set(item);
    }
    public GetItmesListeByKeyFirebase(todolist: TodoList): AngularFireList<TodoItem> {
      return this.db.list(`/todo-lists/${todolist.uuid}/items/`);
    }
    public GetItems(_todoliste: TodoList): Observable<TodoList> {
      const itemslist: AngularFireObject<TodoList> = this.db.object('/list-tasks/' + _todoliste.uuid + '/');
      return itemslist.valueChanges();
    }
    public removeItemFrom(_todolist: TodoList, id_item): Promise<void> {
      return this.db.list('/list-tasks/' + _todolist.uuid + '/items/').remove(id_item);
    }
    public updateItemFrom(_todolist: TodoList, _item: TodoItem): Promise<void> {
      return this.db.list('/list-tasks/' + _todolist.uuid + '/items/').set(_item.uuid, _item);
    }*/
}
