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
  items: AngularFireList<TodoItem> = null;
  currUser: UserProfile;

  constructor(private db: AngularFireDatabase,
              private  gene_para: NgxLoremIpsumService,
              private afAuth: AngularFireAuth) {
  }

  private setUserUid() {
    this.currUser = JSON.parse(localStorage.getItem('_currentUser'));
    this.listes = this.db.list('Listes/'.concat(this.currUser.uid));
  }


  getTodoList(): Observable<TodoList[]> {
    this.setUserUid();
    return this.listes.valueChanges();
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

  public updateItemFromList(_todolist: TodoList, _item: TodoItem): Promise<void> {
    return this.db.list('Items/'.concat(_todolist.uuid)).set(_item.uuid, _item);
  }

  public removeItemFromList(_todolist: TodoList,_uidItem): Promise<void> {
    return this.db.list('Items/' + _todolist.uuid).remove(_uidItem);
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
