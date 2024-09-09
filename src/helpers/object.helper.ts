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

  static filterByAllowedProperties<T>(raw: T, allowedProperties: (string | number)[]): Partial<T> {
    return Object.keys(raw as Record<(string | number), any>)
        .filter(key => allowedProperties.includes(key))
        .reduce((obj, key) => ({
          ...obj,
          [key]: raw[(key as keyof T)]
        }), {} as Partial<T>);
  }

  static filterByRejectedProperties<T>(raw: T, rejectedProperties: (string | number)[]): Partial<T> {
    return Object.keys(raw as Record<(string | number), any>)
        .filter(key => !rejectedProperties.includes(key))
        .reduce((obj, key) => ({
          ...obj,
          [key]: raw[(key as keyof T)]
        }), {} as Partial<T>);
  }
}