import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { do } from 'rxjs/observable/do';

import { environment } from '../../../environments/environment';

export abstract class BaseService {
  private apiUrl: string;

  constructor(
    protected http: HttpClient,
  ) {
    this.apiUrl = environment.apiUrl;
  }

  protected getData<T>(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders,
  ): Observable<T[]> {
    return this.http
      .get<T[]>(this.apiUrl + url, { headers, params })
      // .do(
      //   data => this.log(``),
      //   err => this.log(``)
      // );
  }

  protected getSingleData<T>(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders,
  ): Observable<T> {
    return this.http
      .get<T>(this.apiUrl + url, { headers, params })
      // .do(
      //   data => this.log(``),
      //   err => this.log(``)
      // );
  }

  private log(value: string): void {
    console.log(value);
  }
}
