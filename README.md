# Compare Engine

## Installation

* From npm: `npm install @alkemist/smart-tools`
* From yarn: `yarn add @alkemist/smart-tools`

## Test

* From npm: `npm test`
* From yarn: `yarn test`

## About

Compares 2 value, considering array object movement :

- Either with a signature (identical object)
- Or with a key defined by the method passed to the constructor
- The search is recursive: if an object has been moved within a moved object, it will be detected as moved
- Takes into consideration : value type/class, function name and signature (without parameter type)

## Examples

### With JSON

    import {CompareEngine} from '@alkemist/smart-tools';

    const jsonLeft = {
        objectArray: [
            {
                id: "movedIndex",
                property: "old property",
                otherObjectArray: [
                    {id: "1"},
                    {id: "2"},
                ],
                otherArray: [
                    0, 1, 2
                ]
            },
            {
                id: "removedObject",
            },
            {
                id: "equal"
            }
        ]
    };
    const jsonright = {
        objectArray: [
            {
                id: "newObject",
            },
            {
                id: "movedIndex",
                property: "updated property",
                otherObjectArray: [
                    {id: "2"},
                    {id: "1"},
                ],
                otherArray: [
                    2, 1, 3
                ]
            },
            {
                id: "equal"
            }
        ]
    };

    const compareEngine = new CompareEngine((paths: string[]) => {
      return "id";
    });

    compareEngine.updateLeft(jsonLeft);
    compareEngine.updateRight(jsonRight);

    compareEngine.updateCompareIndex();

    compareEngine.getLeftState("") // return UPDATED CompareState
    compareEngine.getLeftState("objectArray") // return UPDATED CompareState
    compareEngine.getLeftState("objectArray[0]") // return UPDATED CompareState
    compareEngine.getLeftState("objectArray[0].id") // return UPDATED CompareState
    compareEngine.getLeftState("objectArray[0].property") // return UPDATED CompareState
    compareEngine.getLeftState("objectArray[0].otherObjectArray") // return UPDATED CompareState
    compareEngine.getLeftState("objectArray[0].otherObjectArray[0]") // return UPDATED CompareState
    compareEngine.getLeftState("objectArray[0].otherObjectArray[0].id") // return UPDATED CompareState
    compareEngine.getLeftState("objectArray[0].otherObjectArray[1]") // return UPDATED CompareState
    compareEngine.getLeftState("objectArray[0].otherObjectArray[1].id") // return UPDATED CompareState
    compareEngine.getLeftState("objectArray[0].otherArray") // return UPDATED CompareState
    compareEngine.getLeftState("objectArray[0].otherArray[0]") // return UPDATED CompareState
    compareEngine.getLeftState("objectArray[0].otherArray[1]") // return UPDATED CompareState
    compareEngine.getLeftState("objectArray[0].otherArray[2]") // return UPDATED CompareState
    compareEngine.getLeftState("objectArray[1]") // return UPDATED CompareState
    compareEngine.getLeftState("objectArray[1].id") // return UPDATED CompareState
    compareEngine.getLeftState("objectArray[2]") // return UPDATED CompareState
    compareEngine.getLeftState("objectArray[2].id") // return UPDATED CompareState

    compareEngine.getRightState("") // return UPDATED CompareState
    compareEngine.getRightState("objectArray") // return UPDATED CompareState
    compareEngine.getRightState("objectArray[0]") // return UPDATED CompareState
    compareEngine.getRightState("objectArray[0].id") // return UPDATED CompareState
    compareEngine.getRightState("objectArray[1]") // return UPDATED CompareState
    compareEngine.getRightState("objectArray[1].id") // return UPDATED CompareState
    compareEngine.getRightState("objectArray[1].property") // return UPDATED CompareState
    compareEngine.getRightState("objectArray[1].otherObjectArray") // return UPDATED CompareState
    compareEngine.getRightState("objectArray[1].otherObjectArray[0]") // return UPDATED CompareState
    compareEngine.getRightState("objectArray[1].otherObjectArray[0].id") // return UPDATED CompareState
    compareEngine.getRightState("objectArray[1].otherObjectArray[1]") // return UPDATED CompareState
    compareEngine.getRightState("objectArray[1].otherObjectArray[1].id") // return UPDATED CompareState
    compareEngine.getRightState("objectArray[1].otherArray") // return UPDATED CompareState
    compareEngine.getRightState("objectArray[1].otherArray[0]") // return UPDATED CompareState
    compareEngine.getRightState("objectArray[1].otherArray[1]") // return UPDATED CompareState
    compareEngine.getRightState("objectArray[1].otherArray[2]") // return UPDATED CompareState
    compareEngine.getRightState("objectArray[2]") // return UPDATED CompareState
    compareEngine.getRightState("objectArray[2].id") // return UPDATED CompareState

### With Objects

    class Parent {
        constructor(protected property = "value") {
        }
    }

    class Child extends Parent {
        constructor(protected override property = "value") {
            super();
        }
    }

    const compareEngine = new CompareEngine((paths: string[]) => {
      return "id";
    }, new Parent(), new Parent());
    compareEngine.updateCompareIndex();
    compareEngine.getLeftState("") // return EQUAL CompareState

    const compareEngine = new CompareEngine((paths: string[]) => {
      return "id";
    }, new Parent(), new Child());
    compareEngine.updateCompareIndex();
    compareEngine.getLeftState("") // return UPDATED CompareState

    const compareEngine = new CompareEngine((paths: string[]) => {
      return "id";
    }, new Child(), new Child("otherValue"));
    compareEngine.updateCompareIndex();
    compareEngine.getLeftState("") // return UPDATED CompareState

## Exposed models, enums and utils

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

    enum CompareStateEnum {
        NONE = "",
        ADDED = "added",
        MOVED = "moved",
        UPDATED = "updated",
        REMOVED = "removed",
        EQUAL = "equal",
    }

    class CompareEngine<DATA_TYPE> {
        constructor(
            protected determineArrayIndexFn?: (paths: ValueKey[]) => ValueKey
            leftValue?: DATA_TYPE = null,
            rightValue?: DATA_TYPE = null
        )

        get leftValue(): DATA_TYPE | undefined
        get rightValue(): DATA_TYPE | undefined

        updateLeft(value: DATA_TYPE | undefined): void
        updateRight(value: DATA_TYPE | undefined): void

        leftToRight(): void
        rightToLeft(): void

        updateCompareIndex(): void

        hasChange(): boolean

        getLeftState(paths: ValueKey[] | ValueKey): CompareState
        getRightState(paths: ValueKey[] | ValueKey): CompareState
    }

    class CompareState {
        value: CompareStateEnum

        isNone(): boolean
        isAdded(): boolean
        isMoved(): boolean
        isUpdated(): boolean
        isRemoved(): boolean
        isEqual(): boolean
        isChanged(): boolean

        toString(): string
    }

    abstract class CompareHelper {
        static isEvaluable(value: AnyValue): value is Evaluable
        static isBoolean(value: AnyValue): value is boolean
        static isKey(value: AnyValue): value is ValueKey
        static isNumber(value: AnyValue): value is number
        static isSymbol(value: AnyValue): value is symbol
        static isString(value: AnyValue): value is string
        static isArray<T = AnyValue>(value: AnyValue): value is GenericValueArray<T>
        static isRecord<T = AnyValue>(value: AnyValue): value is GenericValueRecord<T>
        static isObject<T = AnyValue>(value: AnyValue): value is GenericValueRecord<T>
        static hasStringIndex<T = AnyValue>(value: AnyValue): value is GenericValueRecord<T>
        static isTree<T = AnyValue>(value: AnyValue): value is GenericValueTree<T>
        static isFunction(value: AnyValue): value is ValueFunction
        static isPrimitive(value: AnyValue): value is ValuePrimitive

        static isEqual(sideValue: AnyValue, otherSideValue: AnyValue): boolean

        static keys<
            D extends AnyValue, 
            T extends GenericValueTree<D>, 
            R extends ValueKey = T extends GenericValueArray<D> ? string : number
        >(tree: T): R[]

        static deepClone<T extends AnyValue>(source: T): T

        static getIn(object: AnyValue, path: string[]): AnyValue

        static parseInt(value: ValueKey): number

        static hasOwn(tree: ValueTree, property: ValueKey): boolean 
    
        static hasProperty(value: AnyValue, path: ValueKey[] | ValueKey): boolean 

        static serialize(value: AnyValue): string

        static stringify(value: AnyValue): string
    }

## License

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)