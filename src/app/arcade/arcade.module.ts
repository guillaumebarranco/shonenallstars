import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ArcadeComponent } from './arcade.component';
import { ArcadeDispatcher } from './arcade.dispatcher';
import { ArcadeService } from './arcade.service';
import { CharacterListComponent } from './character-list/character-list.component';

@NgModule({
  declarations: [ArcadeComponent, CharacterListComponent],
  exports: [ArcadeComponent],
  imports: [CommonModule, SharedModule],
  providers: [ArcadeService, ArcadeDispatcher],
})
export class ArcadeModule {}
