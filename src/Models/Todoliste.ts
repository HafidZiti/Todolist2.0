import {Time} from "@angular/common";

export interface TodoList {
  id?: string,
  uuid? : string,
  creation_date?,
  name : string,
  desc? :string,
  items ?: Set<TodoItem>
}

export interface TodoItem {
  id?: string,
  uuid? : string,
  name : string,
  desc? : string,
  creation_date?,
  complete : boolean
}

export interface UserProfile{
  uid:string,
  name?:string,
  url_image ?:string,
  email :string,
  //from?:string,    //form facebook or gmail or authentification antive
}

export interface Groupe{
  uid:string;
  creator:UserProfile,
  list_Users:Set<UserProfile>,
  sharedList:Set<TodoList>
}
