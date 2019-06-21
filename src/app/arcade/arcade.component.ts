import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Character } from '../shared/interfaces/character/character';
import { ArcadeDispatcher } from './arcade.dispatcher';

@Component({
  selector: 'app-arcade',
  styleUrls: ['./arcade.component.scss'],
  templateUrl: './arcade.component.html',
})
export class ArcadeComponent implements OnInit {
  @select(['characters', 'list'])
  public readonly characters: Observable<Character[]>;

  public currentCharacterId = 0;
  public allyCharacter: Character = null;
  public ennemyCharacter: Character = null;

  constructor(private dispatcher: ArcadeDispatcher) {}

  public ngOnInit() {
    this.dispatcher.getCharacters();
  }

  public onChooseCharacter(character: number): void {
    this.currentCharacterId = character;
    this.beginArcade();
  }

  public beginArcade(): void {
    this.characters.subscribe((values: Character[]) => {
      const randomValue: number = Math.floor(Math.random() * values.length);
      this.allyCharacter = values.find(
        (value: Character) => value.id === this.currentCharacterId
      );

      this.ennemyCharacter = values
        .filter((value: Character) => value.id !== this.currentCharacterId)
        .find((value: Character, index: number) => index === randomValue);
    });
  }
}
