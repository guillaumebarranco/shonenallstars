import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Character } from '../../shared/interfaces/character/character';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-list',
  styleUrls: ['./character-list.component.scss'],
  templateUrl: './character-list.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class CharacterListComponent {
  @Input() public characters: Character[];
  @Output() public chooseCharacter: EventEmitter<number> = new EventEmitter();

  public choose(characterId: number): void {
    this.chooseCharacter.emit(characterId);
  }
}
