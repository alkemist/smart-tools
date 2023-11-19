import { StringHelper } from './string.helper.js';
import { KeyValue, ValueKey } from '../models/index.js';

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
    T extends { [K in keyof T]: string | number },
    K extends keyof T
  >(array: T[], selector: K): Record<T[K], T> {
    return array.reduce(
      (acc, item) => {
        acc[item[selector]] = item;
        return acc;
      }, {} as Record<T[K], T>
    )
  }

  static enumToArray<V extends ValueKey = ValueKey, K extends ValueKey = ValueKey>(enumValue: Record<V, K>): KeyValue<K, V>[] {
    // Enum is a inversed record
    const values = Object.keys(enumValue) as V[];

    return values.map((value: V) => {
      const key = enumValue[value] as K;
      return { key, value }
    });
  }
}