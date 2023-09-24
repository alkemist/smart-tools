import { ValueKey } from '../models/index.js';

export class SmartMap<V, K extends ValueKey = string> extends Map<K, V> {
    private readonly _keys: K[] = [];
    private readonly _values: V[] = [];

    constructor(entries: [ K, V ][] = []) {
        super(entries);
        this._keys = entries.map(value => value[0]);
        this._values = entries.map(value => value[1]);
    }

    get(key: K): V {
        return <V>super.get(key);
    }

    set(key: K, value: V): this {
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

    map(predicate: (value: V, index: K, indexNumber: number) => V) {
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