import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModaltodolistPage } from './modaltodolist';

@NgModule({
  declarations: [
    ModaltodolistPage,
  ],
  imports: [
    IonicPageModule.forChild(ModaltodolistPage),
  ],
})
export class ModaltodolistPageModule {}
