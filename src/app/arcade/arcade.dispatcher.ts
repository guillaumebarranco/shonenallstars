import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

import { BaseDispatcher } from '../shared/dispatchers/base.dispatcher';
import { CharacterResponse } from '../shared/interfaces/character/character';
import { IAppState } from '../store';
import { CharacterSetCharactersAction } from './arcade.actions';
import { ArcadeService } from './arcade.service';

@Injectable()
export class ArcadeDispatcher extends BaseDispatcher {
  constructor(
    protected ngRedux: NgRedux<IAppState>,
    private service: ArcadeService
  ) {
    super(ngRedux);
  }

  public getCharacters() {
    this.service.getCharacters().subscribe((response: CharacterResponse) => {
      this.dispatch<CharacterSetCharactersAction>({
        payload: response.persos,
        type: 'CHARACTER_SET_CHARACTERS',
      });
    });
  }
}
