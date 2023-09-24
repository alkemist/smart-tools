import { TypeHelper } from './type.helper.js';
import { ValueKey } from '../models/index.js';

export abstract class MathHelper {
  static parseInt(value: ValueKey): number {
    if (TypeHelper.isNumber(value)) {
      return value;
    }
    return parseInt(value);
  }
}