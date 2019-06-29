import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

import { BaseDispatcher } from '../shared/dispatchers/base.dispatcher';
import {
  CharacterResponse,
  Character,
} from '../shared/interfaces/character/character';
import { IAppState } from '../store';
import {
  CharacterActionType,
  CharacterSetCharactersAction,
  UnlockCharacterAction,
} from './arcade.actions';
import { ArcadeService } from './arcade.service';

@Injectable()
export class ArcadeDispatcher extends BaseDispatcher {
  constructor(
    protected ngRedux: NgRedux<IAppState>,
    private service: ArcadeService
  ) {
    super(ngRedux);
  }

  public getCharacters(): void {
    if (localStorage.getItem('characters') !== null) {
      this._dispatchCharacters(JSON.parse(localStorage.getItem('characters')));
    } else {
      this.service.getCharacters().subscribe((response: CharacterResponse) => {
        this._dispatchCharacters(response.persos);
        localStorage.setItem('characters', JSON.stringify(response.persos));
      });
    }
  }

  private _dispatchCharacters(characters: Character[]): void {
    this.dispatch<CharacterSetCharactersAction>({
      payload: characters,
      type: CharacterActionType.CHARACTER_SET_CHARACTERS,
    });
  }

  public unlockCharacter(characterId: number): void {
    this.dispatch<UnlockCharacterAction>({
      payload: characterId,
      type: CharacterActionType.UNLOCK_CHARACTER,
    });
  }
}
