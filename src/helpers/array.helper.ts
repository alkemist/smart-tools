import { StringHelper } from './string.helper.js';
import { KeyValue, ValueKey, ValueRecordKeys } from '../models/index.js';

export abstract class ArrayHelper {
  static sortBy<T>(array: T[], field: string): T[] {
    return array.sort((a: any, b: any) => {
      const aValue = StringHelper.slugify(a[field]!);
      const bValue = StringHelper.slugify(b[field]!);
      return (aValue > bValue) ? 1 : ((bValue > aValue) ? -1 : 0);
    });
  }

  static unique<T>(array: T[]) {
    return array.filter((value, index, array) => array.indexOf(value) === index)
  }

  static recordToList<T extends string, U>(record: Record<T, U>): KeyValue<string, U>[] {
    return Object.entries<U>(record).map(([ t, u ]: [ string, U ]) => ({
      key: t,
      value: u as U
    }));
  }

  static listToRecord<
    T extends ValueRecordKeys<T, ValueKey>,
    K extends keyof T
  >(array: T[], selector: K): Record<T[K], T> {
    return array.reduce(
      (acc, item) => {
        acc[item[selector]] = item;
        return acc;
      }, {} as Record<T[K], T>
    )
  }

  static enumToArray<V extends ValueKey>(enumClass: Record<string, V> | Record<V, string>, revert: boolean = false): KeyValue<string, V>[] {
    if (revert) {
      const enumValueKey = enumClass as Record<V, string>;
      const values = Object.keys(enumValueKey)
        .filter((key) => !new RegExp(/^\d+$/).test(key)) as V[];

      return values.map((value) => {
        return { key: enumValueKey[value], value }
      });
    } else {
      const enumKeyValue = enumClass as Record<string, V>;

      const keys = Object.keys(enumKeyValue)
        .filter((key) => !new RegExp(/^\d+$/).test(key));

      return keys.map((key) => {
        return { key, value: enumKeyValue[key] }
      });
    }
  }
}