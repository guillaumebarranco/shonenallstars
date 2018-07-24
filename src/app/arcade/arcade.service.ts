import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from '../shared/services/base.service';
import { Character, CharacterResponse } from '../shared/interfaces/character/character';

@Injectable()
export class ArcadeService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  getCharacters(): Observable<CharacterResponse> {
    return this.getSingleData<CharacterResponse>(`battle/getPersos`);
  }
}
