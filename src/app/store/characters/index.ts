import { Character } from 'app/shared/interfaces/character/character';
import { Reducer } from 'redux';

import { CharacterActions, CharacterSetCharactersAction } from '../../arcade/arcade.actions';

export interface CharactersState {
  list: Character[];
}

export const initialState: CharactersState = {
  list: [],
};

export const charactersReducer: Reducer<CharactersState> = (
  state = initialState,
  action: CharacterActions
): CharactersState => {
  switch (action.type) {
    case 'CHARACTER_SET_CHARACTERS':
      const setCharacterAction = action as CharacterSetCharactersAction;

      return {
        ...state,
        list: setCharacterAction.payload,
      };

    default:
      return state;
  }
};
