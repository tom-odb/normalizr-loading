import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { omitBy } from 'lodash-es';

@Injectable()
export class HeroRepository {

  constructor(public http: HttpClient) {}

  public fetchAll(options = null): Observable<any> {
    return this.http
      .get('https://gateway.marvel.com/v1/public/characters', {
        params: omitBy({
          apikey: '7832ba518ca14cbb617cd001eb0ca6db',
          offset: options.offset,
          limit: options.limit,
        }, (value) => {
          return !value;
        }),
      })
      .pipe(
        map((response: any) => {
          return response.data;
        }),
        // delay(Math.floor(Math.random() * Math.floor(10) * 1000)),
        // delay(10000),
      );
  }

}
