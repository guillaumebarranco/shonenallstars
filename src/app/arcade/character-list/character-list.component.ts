import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Character } from '../../shared/interfaces/character/character';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  @Input() characters: Character[];
  @Output() chooseCharacter: EventEmitter<Character> = new EventEmitter();

  ngOnInit() {
    console.log(this.characters);
  }

  choose(character: Character): void {
    this.chooseCharacter.emit(character);
  }
}
