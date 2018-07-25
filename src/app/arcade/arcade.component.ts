import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { Character } from '../shared/interfaces/character/character';
import { ArcadeDispatcher } from './arcade.dispatcher';

@Component({
  selector: 'app-arcade',
  templateUrl: './arcade.component.html',
  styleUrls: ['./arcade.component.css']
})
export class ArcadeComponent implements OnInit {
  @select(['characters', 'list'])
  readonly characters: Observable<Character[]>;

  currentCharacter: Character = null;
  ennemyCharacter: Character = null;

  constructor(private dispatcher: ArcadeDispatcher) { }

  ngOnInit() {
    this.dispatcher.getCharacters();
  }

  onChooseCharacter(character: Character): void {
    console.log('okk');
    this.currentCharacter = character;
    this.beginArcade();
  }

  beginArcade(): void {
    console.log('begin arcade');

    const subscription = this.characters.subscribe((values: Character[]) => {

      const randomValue: number = Math.floor(Math.random() * values.length);

      this.ennemyCharacter = values
        .filter((value: Character) => value.id !== this.currentCharacter.id)
        .find((value: Character, index: number) => index === randomValue);
    });
  }
}
