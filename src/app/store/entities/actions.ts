import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { normalize } from 'normalizr';
import { pathOr } from 'ramda';

@Injectable()
export class EntitiesActions {
  constructor(
    private ngRedux: NgRedux<any>
  ) {}

  public setEntity(schema, data) {
    const entity = schema._key;
    const normalized = normalize({
      [entity]: data,
    }, {
      [entity]: [schema],
    });

    this.ngRedux.dispatch({
      type: 'ENTITY/SET',
      entity,
      data: pathOr(null, ['entities', entity], normalized),
    });

    return pathOr(null, ['result', entity], normalized);
  }
}
