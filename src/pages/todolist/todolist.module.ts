import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodolistPage } from './todolist';

import {TimeAgoPipe} from 'time-ago-pipe';


@NgModule({
  declarations: [
    TodolistPage,
    TimeAgoPipe

  ],
  imports: [
    IonicPageModule.forChild(TodolistPage),
  ],
})
export class TodolistPageModule {}
