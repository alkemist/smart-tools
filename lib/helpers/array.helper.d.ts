import { KeyValue, ValueKey } from '../models/index.js';
export declare abstract class ArrayHelper {
    static sortBy<T>(array: T[], field: string): T[];
    static unique<T>(array: T[]): T[];
    static recordToList<T extends string, U>(record: Record<T, U>): KeyValue<string, U>[];
    static listToRecord<T extends {
        [K in keyof T]: string | number;
    }, K extends keyof T>(array: T[], selector: K): Record<T[K], T>;
    static enumToArray<V extends ValueKey = ValueKey, K extends ValueKey = ValueKey>(enumValue: Record<V, K>): KeyValue<K, V>[];
}
//# sourceMappingURL=array.helper.d.ts.map