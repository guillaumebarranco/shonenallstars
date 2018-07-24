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

  currentCharacter: any = null;

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
  }
}
