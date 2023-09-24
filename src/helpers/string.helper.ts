import { TypeHelper } from './type.helper.js';

export abstract class StringHelper {
    static stringify(value: unknown): string {
        if (TypeHelper.isEvaluable(value)) {
            if (typeof value.toString !== undefined
                || TypeHelper.isSymbol(value)
            ) {
                return value.toString();
            }
            return value + "";
        }
        return value === null ? "null" : "undefined";
    }
}