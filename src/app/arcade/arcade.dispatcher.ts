import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../store';
import { BaseDispatcher } from '../shared/dispatchers/base.dispatcher';
import { Character, CharacterResponse } from '../shared/interfaces/character/character';
import { ArcadeService } from './arcade.service';
import { CharacterSetCharactersAction } from './arcade.actions';

@Injectable()
export class ArcadeDispatcher extends BaseDispatcher {
  constructor(
    protected ngRedux: NgRedux<IAppState>,
    private service: ArcadeService
  ) {
    super(ngRedux);
  }

  getCharacters() {
    this.service.getCharacters().subscribe((response: CharacterResponse) => {

      this.dispatch<CharacterSetCharactersAction>({
        type: 'CHARACTER_SET_CHARACTERS',
        payload: response.persos,
      })
    });
  }
}
