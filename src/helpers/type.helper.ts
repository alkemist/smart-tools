import { StringHelper } from './string.helper.js';
import { ObjectHelper } from './object.helper.js';
import { TreeHelper } from './tree.helper.js';
import { TypeState } from '../tools/index.js';
import {
  AnyValue,
  Evaluable,
  GenericValueArray,
  GenericValueRecord,
  GenericValueTree,
  PrimitiveClassNames,
  ValueDate,
  ValueFunction,
  ValueKey,
  ValuePrimitive,
  ValueRecord
} from '../models/index.js';

export abstract class TypeHelper {
    static isEvaluable(value: unknown): value is Evaluable {
        return value !== null && value !== undefined;
    }

    static getPrototypeOf(value: unknown): {} {
        return Object.getPrototypeOf(value) ?? {}
    }

    static isBoolean(value: unknown): value is boolean {
        return TypeHelper.isEvaluable(value)
            && (
                typeof value === "boolean"
                || TypeHelper.getPrototypeOf(value).constructor === Boolean
            );
    }

    static isKey(value: unknown): value is ValueKey {
        return TypeHelper.isEvaluable(value)
            && (TypeHelper.isNumber(value)
                || TypeHelper.isString(value))
    }

    static isNumber(value: unknown): value is number {
        return TypeHelper.isEvaluable(value)
            && (
                typeof value === "number"
                || TypeHelper.getPrototypeOf(value).constructor === Number
            )
            && !isNaN(+StringHelper.stringify(value));
    }

    static isSymbol(value: unknown): value is symbol {
        return TypeHelper.isEvaluable(value)
            && (
                typeof value === "symbol"
                || TypeHelper.getPrototypeOf(value).constructor === Symbol
            );
    }

    static isString(value: unknown): value is string {
        return TypeHelper.isEvaluable(value)
            && (
                typeof value === "string"
                || TypeHelper.getPrototypeOf(value).constructor === String
            );
    }

    static isArray<T>(value: unknown): value is GenericValueArray<T> {
        return TypeHelper.isEvaluable(value)
            && Array.isArray(value);
    }

    static isRecord<T = AnyValue>(value: unknown): value is GenericValueRecord<T> {
        return TypeHelper.isEvaluable(value)
            && typeof value === "object"
            && TypeHelper.getPrototypeOf(value).constructor.name === "Object";
    }

    static isObject<T = AnyValue>(value: unknown): value is GenericValueRecord<T> {
        return TypeHelper.isEvaluable(value)
            && typeof value === "object"
            && [ ...PrimitiveClassNames, "Array", "Object" ]
                .indexOf(TypeHelper.getPrototypeOf(value).constructor.name) === -1;
    }

    static isTree<T = AnyValue>(value: unknown): value is GenericValueTree<T> {
        return TypeHelper.isArray<T>(value)
            || ObjectHelper.hasStringIndex<T>(value);
    }

    static isFunction(value: unknown): value is ValueFunction {
        return TypeHelper.isEvaluable(value) &&
            (
                typeof value === 'function'
                || (value instanceof Function)
                || StringHelper.stringify(value) === '[object Function]'
            );
    }

    static isDate(value: unknown): value is ValueDate {
        return TypeHelper.isObject(value) && TypeHelper.getPrototypeOf(value).constructor.name === "Date";
    }

    static isT<T>(value: T): T {
        return value as T;
    }

    static isPrimitive(value: unknown): value is ValuePrimitive {
        return TypeHelper.isEvaluable(value)
            && !TypeHelper.isTree(value)
            && !TypeHelper.isFunction(value);
    }

    static isEqual(sideValue: unknown, otherSideValue: unknown): boolean {
        const typeStateSideValue = new TypeState(sideValue);
        let typeStateOtherSideValue = new TypeState(otherSideValue);

        const valueCompareState = Object.is(
            TypeHelper.serialize(sideValue),
            TypeHelper.serialize(otherSideValue)
        );

        if (valueCompareState) {
            const typeCompareState = Object.is(typeStateSideValue.type, typeStateOtherSideValue.type);
            if (typeCompareState && typeStateSideValue.isObject && typeStateOtherSideValue.isObject) {
                return Object.is(
                    TypeHelper.getPrototypeOf(sideValue),
                    TypeHelper.getPrototypeOf(otherSideValue)
                );
            }
            return typeCompareState;
        }

        return valueCompareState;
    }

    static serialize(value: unknown): string {
        const flat = TreeHelper.flat(value);
        if (TypeHelper.isString(flat)) {
            return flat;
        }

        return JSON.stringify(flat);
    }

    static deepClone<T>(source: T): T {
        if (TypeHelper.isArray(source)) {
            return source.map((item): unknown => TypeHelper.deepClone(
                    item,
                )
            ) as T;
        } else if (TypeHelper.isDate(source)) {
            return new Date(source) as T;
        } else if (ObjectHelper.hasStringIndex(source)) {
            const cycles = TreeHelper.getCycles(source);
            const prototype = TypeHelper.getPrototypeOf(source);

            return (TreeHelper.keys(source) as string[])
                .filter(key => cycles.indexOf(key) === -1)
                .reduce((object: ValueRecord, property) => {
                    const propDesc = Object.getOwnPropertyDescriptor(source, property);
                    if (propDesc !== undefined) {
                        Object.defineProperty(object, property, propDesc);
                    }

                    object[property] = TypeHelper.deepClone(source[property]);
                    return object;
                }, (prototype ? Object.create(prototype) : {}) as ValueRecord) as T;
        }
        return source;
    }
}