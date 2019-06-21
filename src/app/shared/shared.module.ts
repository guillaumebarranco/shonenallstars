import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BattleComponent } from './components/battle/battle.component';
import { CharacterComponent } from './components/battle/character/character.component';

@NgModule({
  declarations: [BattleComponent, CharacterComponent],
  exports: [BattleComponent, CharacterComponent],
  imports: [CommonModule],
})
export class SharedModule {}
