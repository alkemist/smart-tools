import { TypeHelper } from './type.helper.js';
import { AnyValue, GenericValueRecord, PrimitiveClassNames } from '../models/index.js';

export abstract class ObjectHelper {
  static hasStringIndex<T = AnyValue>(value: unknown): value is GenericValueRecord<T> {
    return TypeHelper.isEvaluable(value)
      && typeof value === "object"
      && [ ...PrimitiveClassNames, "Array" ]
        .indexOf(TypeHelper.getPrototypeOf(value).constructor.name) === -1;
  }

  static objectToRecord<V>(object: any) {
    return Object.entries(object).reduce((result, [ key, value ]) => {
      result[key] = value as V;
      return result;
    }, {} as Record<string, V>)
  }
}