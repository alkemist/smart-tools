# Smart tools

## Installation

* From npm: `npm install @alkemist/smart-tools`
* From yarn: `yarn add @alkemist/smart-tools`

## Test

* From npm: `npm test`
* From yarn: `yarn test`

## About

### Managers

### Tools

#### Smart Map

This class is a mix between arrays and maps
It extends maps by making it easier to retrieve keys and values, and to browse like an array with map/each/find/filter.

#### Path

This class is an array that works like a json path, allowing you to quickly retrieve its string version.
Ex : The ar ray `['object', 'array', 0, 'otherProperty']` will be equivalent to `object.array[0].otherProperty`

### Types

    type NotEvaluable = null | undefined;
    type ValueKey = string | number
    type ValuePrimitive = ValueKey | boolean | symbol
    type ValueFunction = Function;
    type ValueDate = Date;
    type ValueArray = AnyValue[];
    type GenericValueArray<T> = T[];
    type ValueRecord = {
        [key: ValueKey]: AnyValue;
    };
    type GenericValueRecord<T> = {
        [key: ValueKey]: T;
    };
    type ValueTree = ValueArray | ValueRecord;
    type GenericValueTree<T> = GenericValueArray<T> | GenericValueRecord<T>;
    type Evaluable = ValuePrimitive | ValueFunction | ValueTree | ValueDate | object;
    type AnyValue = Evaluable | NotEvaluable;

    type ValueRecordKeys<T, V> = { [K in keyof T]: V };

### Helpers

#### Array

    abstract class ArrayHelper {
        static sortBy<T>(array: T[], field: string): T[]
        static unique<T>(array: T[]): T[]

        static recordToList<T extends string, U>(record: Record<T, U>): KeyValue<string, U>[]
        static listToRecord<
            T extends ValueRecordKeys<T, ValueKey>,
            K extends keyof T
        >(array: T[], selector: K): Record<T[K], T>

        static enumToArray<V extends ValueKey, K extends ValueKey>(enumValue: Record<V, K>): KeyValue<K, V>[]
    }

#### Date

    abstract class DateHelper {
        static seconds(date: Date = new Date()): number
        static dayStart(date: Date = new Date()): Date
        static dayEnd(date: Date = new Date()): Date
        static calcHoursAfter(date: string | Date): number
    }

#### Math

    abstract class MathHelper {
        static parseInt(value: ValueKey): number
        static clamp(value: number, min: number, max: number): number
        static round(value: number, decimal: number = 1): number
        static floor(value: number, decimal: number = 1): number
        static sum(numbers: number[]): number
        static distance(lat1: number, lon1: number, lat2: number, lon2: number): number
    }

#### Object

    abstract class ObjectHelper {
        static hasStringIndex<T = AnyValue>(value: AnyValue): value is GenericValueRecord<T>

        static objectToRecord<V>(object: any): Record<string, V>
    }

#### String

    abstract class StringHelper {
        static stringify(value: AnyValue): string
        static slugify(value: string): string
    }

#### Tree

    abstract class TreeHelper {
        static keys<
            D extends AnyValue, 
            T extends GenericValueTree<D>, 
            R extends ValueKey = T extends GenericValueArray<D> ? string : number
        >(tree: T): R[]

        static getIn(object: unknown, path: string[]): unknown

        static setIn(object: unknown, path: string[], value: unknown): unknown
    
        static hasProperty(value: AnyValue, path: ValueKey[] | ValueKey): boolean 

        static hasOwn(tree: ValueTree, property: ValueKey): boolean 

        static getCycles(object: ValueRecord): string[]
    }

#### Console

    interface LogInterface {
        title: string;
        data?: any | any[];
    }

    abstract class ConsoleHelper {
        static group(parent: LogInterface | string | any, children: (LogInterface | string | any)[], colors?: string[]): void;
        static log(title: string, style: string, isGroup?: boolean, ...data: any[]): void;
    }

#### Type

    abstract class TypeHelper {
        static getPrototypeOf(value: unknown): {}

        static isEvaluable(value: AnyValue): value is Evaluable

        static isBoolean(value: AnyValue): value is boolean
        static isKey(value: AnyValue): value is ValueKey
        static isNumber(value: AnyValue): value is number
        static isSymbol(value: AnyValue): value is symbol
        static isString(value: AnyValue): value is string
        static isArray<T = AnyValue>(value: AnyValue): value is GenericValueArray<T>
        static isRecord<T = AnyValue>(value: AnyValue): value is GenericValueRecord<T>
        static isObject<T = AnyValue>(value: AnyValue): value is GenericValueRecord<T>
        static isTree<T = AnyValue>(value: AnyValue): value is GenericValueTree<T>
        static isFunction(value: AnyValue): value is ValueFunction
        static isDate(value: AnyValue): value is ValueDate
        static isPrimitive(value: AnyValue): value is ValuePrimitive

        static isEqual(sideValue: AnyValue, otherSideValue: AnyValue): boolean

        static serialize(value: AnyValue): string

        static deepClone<T extends AnyValue>(source: T): T
    }

### Interfaces

    interface KeyValue<K, V> {
        key: K;
        value: V;
    }

## License

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)