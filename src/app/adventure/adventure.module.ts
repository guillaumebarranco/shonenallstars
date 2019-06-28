import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ArcadeDispatcher } from 'app/arcade/arcade.dispatcher';
import { ArcadeService } from 'app/arcade/arcade.service';

import { SharedModule } from '../shared/shared.module';
import { AdventureComponent } from './adventure.component';

@NgModule({
  declarations: [AdventureComponent],
  exports: [AdventureComponent],
  imports: [CommonModule, SharedModule],
  providers: [ArcadeService, ArcadeDispatcher],
})
export class AdventureModule {}
