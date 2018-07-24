export type CharacterActionType = 'CHARACTER_SET_CHARACTERS' | 'UNKNOWN';

export type CharacterActions = CharacterSetCharactersAction;

export interface CharacterAction {
  type: CharacterActionType;
}

export interface CharacterActionWithPayload<Payload> extends CharacterAction {
  payload: Payload;
}

export interface CharacterSetCharactersAction extends CharacterActionWithPayload<any[]> {
  type: 'CHARACTER_SET_CHARACTERS';
}
