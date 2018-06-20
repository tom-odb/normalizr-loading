import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { omitBy, isNil } from 'lodash-es';

@Injectable()
export class HeroRepository {

  private apiUrl = 'https://gateway.marvel.com/v1/public/characters';

  constructor(public http: HttpClient) {}

  public fetchAll(options?): Observable<any> {
    return this.http
      .get(this.apiUrl, {
        params: this.getParams(options),
      })
      .pipe(
        map((response: any) => {
          return response.data;
        }),
        // delay(Math.floor(Math.random() * Math.floor(10) * 1000)),
        // delay(10000),
      );
  }

  public fetchById(id): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}`, {
        params: this.getParams(),
      })
      .pipe(
        map((response: any) => {
          return response.data;
        }),
      );
  }

  private getParams({
    offset,
    limit,
  } = {} as any) {
    return omitBy({
      apikey: '7832ba518ca14cbb617cd001eb0ca6db',
      offset,
      limit,
    }, isNil);
  }

}
