import { AnyValue, GenericValueRecord } from '../models/index.js';
export declare abstract class ObjectHelper {
    static hasStringIndex<T = AnyValue>(value: unknown): value is GenericValueRecord<T>;
    static objectToRecord<V>(object: any): Record<string, V>;
}
//# sourceMappingURL=object.helper.d.ts.map