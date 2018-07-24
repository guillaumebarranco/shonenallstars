import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ArcadeComponent } from './arcade.component';
import { ArcadeService } from './arcade.service';
import { ArcadeDispatcher } from './arcade.dispatcher';
import { CharacterListComponent } from './character-list/character-list.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  providers: [ArcadeService, ArcadeDispatcher],
  declarations: [ArcadeComponent, CharacterListComponent],
  exports: [ArcadeComponent],
})
export class ArcadeModule {}
