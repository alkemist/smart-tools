export type NotEvaluable = null | undefined;
export type ValueKey = string | number
export type ValuePrimitive = ValueKey | boolean | symbol
export type ValueFunction = Function;
export type ValueDate = Date;
export type ValueArray = AnyValue[];
export type GenericValueArray<T> = T[];
export type ValueRecord = {
  [key: ValueKey]: AnyValue;
};
export type GenericValueRecord<T> = {
  [key: ValueKey]: T;
};
export type ValueTree = ValueArray | ValueRecord;
export type GenericValueTree<T> = GenericValueArray<T> | GenericValueRecord<T>;
export type Evaluable = ValuePrimitive | ValueFunction | ValueTree | ValueDate | object;
export type AnyValue = Evaluable | NotEvaluable;

export type ValueRecordKeys<T, V> = { [K in keyof T]: V };