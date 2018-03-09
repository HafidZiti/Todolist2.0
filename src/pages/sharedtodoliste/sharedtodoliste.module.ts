import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedtodolistePage } from './sharedtodoliste';

@NgModule({
  declarations: [
    SharedtodolistePage,
  ],
  imports: [
    IonicPageModule.forChild(SharedtodolistePage),
  ],
})
export class SharedtodolistePageModule {}
