import { TypeHelper } from './type.helper.js';
import { AnyValue, GenericValueRecord, PrimitiveClassNames } from '../models/index.js';

export abstract class ObjectHelper {
    static hasStringIndex<T = AnyValue>(value: unknown): value is GenericValueRecord<T> {
        return TypeHelper.isEvaluable(value)
            && typeof value === "object"
            && [ ...PrimitiveClassNames, "Array" ]
                .indexOf(TypeHelper.getPrototypeOf(value).constructor.name) === -1;
    }
}