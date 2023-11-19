import { KeyValue, ValueKey } from '../models/index.js';
export declare class SmartMap<V, K extends ValueKey = string> extends Map<K, V> {
    private readonly _keys;
    private readonly _values;
    constructor(entries?: [K, V][]);
    static fromRecord<K extends ValueKey, V>(record: Record<K, V>): SmartMap<V, K>;
    static fromKeyValues<K extends ValueKey, V = string>(keyValues: KeyValue<K, V>[]): SmartMap<V, K>;
    static fromEnum<E extends Record<ValueKey, any>, K = keyof E, V = E[keyof E]>(enumValue: E): SmartMap<V, string>;
    get(key: K): V;
    set(key: K, value: V): this;
    getKeys(): K[];
    getValues(): V[];
    toRecord(): Record<K, V>;
    toKeyValues(): KeyValue<K, V>[];
    map(predicate: (value: V, index: K, indexNumber: number) => V): V[];
    each(predicate: (value: V, index: K, indexNumber: number) => void): void;
    find(predicate: (value: V, index: K, indexNumber: number) => boolean): V | undefined;
    filter(predicate: (value: V, index: K, indexNumber: number) => boolean): SmartMap<V, K>;
}
//# sourceMappingURL=smart-map.d.ts.map