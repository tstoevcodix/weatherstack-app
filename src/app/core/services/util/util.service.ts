/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { isEqual, pick as _pick } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  areEqual(a: any, b: any): boolean {
    return isEqual(a, b);
  }

  pick(obj: any, props: Array<string>): any {
    return _pick(obj, props);
  }
}
