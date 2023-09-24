import { ValueKey } from '../models/index.js';
export declare class SmartMap<V, K extends ValueKey = string> extends Map<K, V> {
    private readonly _keys;
    private readonly _values;
    constructor(entries?: [K, V][]);
    get(key: K): V;
    set(key: K, value: V): this;
    getKeys(): K[];
    getValues(): V[];
    map(predicate: (value: V, index: K, indexNumber: number) => V): V[];
    each(predicate: (value: V, index: K, indexNumber: number) => void): void;
    find(predicate: (value: V, index: K, indexNumber: number) => boolean): V | undefined;
    filter(predicate: (value: V, index: K, indexNumber: number) => boolean): SmartMap<V, K>;
}
//# sourceMappingURL=smart-map.d.ts.map