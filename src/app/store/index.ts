import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';

import {
  CharactersState,
  initialState as charactersInitialState,
  charactersReducer,
} from './characters';

export interface IAppState {
  characters: CharactersState;
}

export const initialState: IAppState = {
  characters: charactersInitialState,
}

export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers<IAppState>({
    characters: charactersReducer,
  })
);
