import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedtodolistePage } from './sharedtodoliste';
import {TimeAgoPipe} from 'time-ago-pipe';


@NgModule({
  declarations: [
    SharedtodolistePage,
   // TimeAgoPipe
  ],
  imports: [
    IonicPageModule.forChild(SharedtodolistePage),
  ],
})
export class SharedtodolistePageModule {}
