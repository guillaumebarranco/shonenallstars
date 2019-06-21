import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export abstract class BaseService {
  private apiUrl: string;

  constructor(protected http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  protected getData<T>(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl + url, { headers, params });
  }

  protected getSingleData<T>(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http.get<T>(this.apiUrl + url, { headers, params });
  }
}
