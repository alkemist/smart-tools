import { KeyValue, ValueKey } from '../models/index.js';
import { ArrayHelper } from '../helpers/index.js';

export class SmartMap<V, K extends ValueKey = string> extends Map<K, V> {
  private readonly _keys: K[] = [];
  private readonly _values: V[] = [];

  constructor(entries: [ K, V ][] = []) {
    super(null);
    entries
      .forEach(entry => this.set(entry[0], entry[1]))
  }

  static fromRecord<V>(record: Record<string, V>) {
    return new SmartMap<V, string>(
      Object.entries(record) as [ string, V ][]
    );
  }

  static fromKeyValues<K extends ValueKey, V = string>(keyValues: KeyValue<K, V>[]) {
    return new SmartMap<V, K>(
      keyValues.map(kv => [ kv.key, kv.value ])
    );
  }

  static fromEnum<E extends Record<ValueKey, any>, V = E[keyof E]>(enumValue: E) {
    return SmartMap.fromKeyValues(
      ArrayHelper.enumToArray(enumValue) as KeyValue<string, V>[]
    );
  }

  override get(key: K): V {
    return <V>super.get(key);
  }

  override set(key: K, value: V): this {
    if (this.has(key)) {
      const keyIndex = this._keys.indexOf(key);
      this._values[keyIndex] = value;
    } else {
      this._keys.push(key);
      this._values.push(value);
    }

    super.set(key, value);
    return this;
  }

  getKeys(): K[] {
    return this._keys;
  }

  getValues(): V[] {
    return this._values;
  }

  toRecord(): Record<K, V> {
    return this._values.reduce((result, current, index) => ({
      ...result,
      [this._keys[index] as K]: current
    }), {} as Record<K, V>);
  }

  toKeyValues(): KeyValue<K, V>[] {
    return this._values.map((value, index) => ({
      key: this._keys[index],
      value
    }))
  }

  map<T>(predicate: (value: V, index: K, indexNumber: number) => T) {
    return this._keys.map((key, index) =>
      predicate(this._values[index], key, index)
    )
  }

  each(predicate: (value: V, index: K, indexNumber: number) => void) {
    this._keys.forEach((key, index) => {
      predicate(this._values[index], key, index);
    })
  }

  find(predicate: (value: V, index: K, indexNumber: number) => boolean) {
    return this._values.find((value, index) =>
      predicate(value, this._keys[index], index)
    );
  }

  findKey(predicate: (value: V, index: K, indexNumber: number) => boolean) {
    return this._keys.find((key, index) =>
      predicate(this._values[index], key, index)
    );
  }

  filter(predicate: (value: V, index: K, indexNumber: number) => boolean) {
    const newSmartMap = new SmartMap<V, K>();
    this._keys.filter((key, index) =>
      predicate(this._values[index], key, index)
    ).forEach(
      key => newSmartMap.set(key, this.get(key))
    )
    return newSmartMap;
  }
}