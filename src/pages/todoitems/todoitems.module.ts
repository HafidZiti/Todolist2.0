import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoitemsPage } from './todoitems';

@NgModule({
  declarations: [
    TodoitemsPage,
  ],
  imports: [
    IonicPageModule.forChild(TodoitemsPage),
  ],
})
export class TodoitemsPageModule {}
