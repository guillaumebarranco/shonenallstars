import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { CharacterResponse } from '../shared/interfaces/character/character';
import { BaseService } from '../shared/services/base.service';

@Injectable()
export class ArcadeService {
private apiUrl: string;
  private http = inject(HttpClient);

  constructor() {
    this.apiUrl = environment.apiUrl;
  }

  public getCharacters(): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(this.apiUrl + `assets/persos.json`, {})
  }
}
