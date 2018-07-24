import { Reducer } from 'redux';

import { CharacterActions } from '../../arcade/arcade.actions';

export interface CharactersState {
  list: any[];
}

export const initialState: CharactersState = {
  list: [],
};

export const charactersReducer: Reducer<CharactersState> = (
  state = initialState,
  action: CharacterActions,
): CharactersState => {

  switch (action.type) {
    case "CHARACTER_SET_CHARACTERS":
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
};

