/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { isEqual } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  areEqual(a: any, b: any): boolean {
    return isEqual(a, b);
  }
}
