import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CharacterResponse } from '../shared/interfaces/character/character';
import { BaseService } from '../shared/services/base.service';

@Injectable()
export class ArcadeService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public getCharacters(): Observable<CharacterResponse> {
    return this.getSingleData<CharacterResponse>(`battle/getPersos`);
  }
}
