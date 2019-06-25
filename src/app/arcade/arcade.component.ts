import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Character } from '../shared/interfaces/character/character';
import { ArcadeDispatcher } from './arcade.dispatcher';

const MAX_ARCADE_ROUNDS = 5;
const SUPREME_CHARACTER = 'saitama';

@Component({
  selector: 'app-arcade',
  styleUrls: ['./arcade.component.scss'],
  templateUrl: './arcade.component.html',
})
export class ArcadeComponent implements OnInit {
  @select(['characters', 'list'])
  public readonly _characters$: Observable<Character[]>;

  private _characters: Character[] = [];

  public _currentCharacterId = 0;
  public _allyCharacter: Character = null;
  public _ennemyCharacter: Character = null;
  public _currentRound = 1;

  public _arcadeWon = false;
  public _arcadeLost = false;

  constructor(private dispatcher: ArcadeDispatcher) {}

  public ngOnInit() {
    this.dispatcher.getCharacters();

    this._characters$.subscribe((characters: Character[]) => {
      this._characters = characters.map(
        this._handleLockedCharacters.bind(this)
      );
    });
    // setTimeout(() => {
    //   this._onChooseCharacter(1);
    // }, 1000);
  }

  public _onChooseCharacter(character: number): void {
    this._currentCharacterId = character;
    this._beginArcade();
  }

  public _onBattleEnded(winner: string): void {
    if (winner === 'ally') {
      if (this._currentRound < MAX_ARCADE_ROUNDS) {
        this._currentRound = this._currentRound + 1;
        this._beginNewBattle();
      } else {
        this._wonArcade();
      }
    } else {
      this._lostArcade();
    }
  }

  private _wonArcade(): void {
    this._updateArcadesWonStorage();

    this._arcadeWon = true;

    const characterUnlocked = this._characters.find(
      character => !!character.unlocked
    );
    this.dispatcher.unlockCharacter(characterUnlocked.id);
  }

  private _updateArcadesWonStorage(): void {
    const storageArcadesWon = this._storageArcadesWon;
    const currentArcadesWon = storageArcadesWon + 1;
    localStorage.setItem('arcadesWon', currentArcadesWon.toString());
  }

  private get _storageArcadesWon(): number {
    return Number(localStorage.getItem('arcadesWon'));
  }

  private _lostArcade(): void {
    this._arcadeLost = true;
  }

  private _handleLockedCharacters(
    character: Character,
    index: number
  ): Character {
    const minIndexLock = 4;

    if (index < minIndexLock) {
      return {
        ...character,
        unlocked: true,
      };
    }

    return index < this._storageArcadesWon + minIndexLock
      ? {
          ...character,
          unlocked: true,
        }
      : {
          ...character,
          unlocked: false,
        };
  }

  private _beginArcade(): void {
    this._allyCharacter = this._characters.find(
      (value: Character) => value.id === this._currentCharacterId
    );

    this._beginNewBattle();
  }

  private _beginNewBattle(): void {
    this._setEnnemyCharacter();
  }

  private _setEnnemyCharacter(): void {
    const randomValue: number = Math.floor(
      Math.random() * this._characters.length
    );

    this._ennemyCharacter = this._characters
      .filter((value: Character) => value.id !== this._currentCharacterId)
      .find((value: Character, index: number) => index === randomValue);

    if (this._ennemyCharacter.name.toLowerCase() === SUPREME_CHARACTER) {
      this._setEnnemyCharacter();
    }
  }
}
