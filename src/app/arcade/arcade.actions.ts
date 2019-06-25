import { Character } from 'app/shared/interfaces/character/character';

export enum CharacterActionType {
  CHARACTER_SET_CHARACTERS = 'CHARACTER_SET_CHARACTERS',
  UNLOCK_CHARACTER = 'UNLOCK_CHARACTER',
}

export interface CharacterAction {
  type: CharacterActionType;
}

export interface CharacterActionWithPayload<Payload> extends CharacterAction {
  payload: Payload;
}

export class CharacterSetCharactersAction
  implements CharacterActionWithPayload<Character[]> {
  public type = CharacterActionType.CHARACTER_SET_CHARACTERS;
  constructor(public payload: Character[]) {}
}

export class UnlockCharacterAction
  implements CharacterActionWithPayload<number> {
  public type = CharacterActionType.UNLOCK_CHARACTER;
  constructor(public payload: number) {}
}

export type CharacterActions =
  | CharacterSetCharactersAction
  | UnlockCharacterAction;
