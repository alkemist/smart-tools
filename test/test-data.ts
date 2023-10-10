import { TypeStateEnum } from "../src/index.js";


const voidFunction: () => void = () => {
};
const voidFunctionSerialized = "() => {\n" +
  "}";

const paramsFunction: (param: string, callback: () => boolean) => boolean
  = (param: string, callback: () => boolean) => true;
const paramsFunctionSerialized = "(param, callback) => true";

const classicFunction: () => { param: string }
  = function () {
  return {
    param: "string"
  }
}
const classicFunctionSerialized = "function () {\n" +
  "    return {\n" +
  "        param: \"string\"\n" +
  "    };\n" +
  "}";

const asyncFunction: () => Promise<number>
  = async () => {
  return Promise.resolve(1)
}
const asyncFunctionSerialized = "async () => {\n" +
  "    return Promise.resolve(1);\n" +
  "}";

class ParentTest {
  static staticVar = 'staticVar'

  constructor(
    public propertyOverride?: string,
    public propertyUndefined = undefined,
    public propertyNull = null,
    public readonly propertyZero = 0,
    private propertyOne = 1,
    private propertyTwo = 2,
    private propertyTwoPointOne = 2.1,
    private propertyTrue = true,
    private propertyRecord?: { property: string },
    private voidFn?: () => void,
    private paramsFn?: (param: string, callback: () => boolean) => boolean,
    private classicFn?: () => { param: string },
    private asyncFn?: () => Promise<number>,
  ) {
    this.propertyRecord = { property: "value" };
    this.voidFn = voidFunction;
    this.paramsFn = paramsFunction;
    this.classicFn = classicFunction;
    this.asyncFn = asyncFunction;
  }

  static staticFunc() {
    return 'staticFunc';
  }
}

const objectFunction = (promiseCallback: () => Promise<boolean>) => ParentTest;
const objectFunctionSerialized = "(promiseCallback) => ParentTest";

const commonObjectTestSerialized = {
  propertyOverride: '"1"',
  propertyUndefined: "undefined",
  propertyNull: "null",
  propertyZero: "0",
}

const privateObjectTestSerialized = {
  propertyOne: "1",
  propertyTwo: "2",
  propertyTwoPointOne: "2.1",
  propertyTrue: "true",
  propertyRecord: { "property": '"value"' },
  voidFn: voidFunctionSerialized,
  paramsFn: paramsFunctionSerialized,
  classicFn: classicFunctionSerialized,
  asyncFn: asyncFunctionSerialized,
}

const parentTestSerialized = {
  ...commonObjectTestSerialized,
  ...privateObjectTestSerialized
}

const anyArray = [
  "1",
  undefined,
  null,
  0,
  1,
  2,
  2.1,
  true,
  { property: "value" },
  voidFunction,
  paramsFunction,
  classicFunction,
  asyncFunction,
  objectFunction
];

const anyArraySerialized = [
  ...Object.values(commonObjectTestSerialized),
  ...Object.values(privateObjectTestSerialized),
  objectFunctionSerialized
]

class ChildTest extends ParentTest {
  constructor(
    public override propertyOverride?: string,
    public propertyObject = new ParentTest("x"),
  ) {
    super(propertyOverride);
  }

  // @TODO To improve with definition functions
  definitionFunction() {
    return true;
  }
}

const childTestSerialized = {
  ...parentTestSerialized,
  propertyOverride: '"2"',
  propertyObject: {
    ...parentTestSerialized,
    propertyOverride: '"x"',
  },
}

export const testValues = [
  {
    name: "undefined",
    value: undefined,
    expectedType: TypeStateEnum.NO_EVALUABLE,
    expectedSerialize: "undefined",
    isEvaluable: false,
    isNumber: false,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: "null", value: null, expectedType: TypeStateEnum.NO_EVALUABLE, expectedSerialize: "null",
    isEvaluable: false,
    isNumber: false,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: "true", value: true, expectedType: TypeStateEnum.PRIMITIVE, expectedSerialize: "true",
    isEvaluable: true,
    isNumber: false,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: "false", value: false, expectedType: TypeStateEnum.PRIMITIVE, expectedSerialize: "false",
    isEvaluable: true,
    isNumber: false,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: "object false", value: Boolean(false), expectedType: TypeStateEnum.PRIMITIVE, expectedSerialize: "false",
    isEvaluable: true,
    isNumber: false,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: "0", value: 0, expectedType: TypeStateEnum.PRIMITIVE, expectedSerialize: "0",
    isEvaluable: true,
    isNumber: true,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: "1", value: 1, expectedType: TypeStateEnum.PRIMITIVE, expectedSerialize: "1",
    isEvaluable: true,
    isNumber: true,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: "2", value: 2, expectedType: TypeStateEnum.PRIMITIVE, expectedSerialize: "2",
    isEvaluable: true,
    isNumber: true,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: "2.1", value: 2.1, expectedType: TypeStateEnum.PRIMITIVE, expectedSerialize: "2.1",
    isEvaluable: true,
    isNumber: true,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: "object 2.1", value: Number(2.1), expectedType: TypeStateEnum.PRIMITIVE, expectedSerialize: "2.1",
    isEvaluable: true,
    isNumber: true,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: "", value: "", expectedType: TypeStateEnum.PRIMITIVE, expectedSerialize: '""',
    isEvaluable: true,
    isNumber: false,
    isArray: false,
    isString: true,
    isRecord: false,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: "string", value: "string", expectedType: TypeStateEnum.PRIMITIVE, expectedSerialize: '"string"',
    isEvaluable: true,
    isNumber: false,
    isArray: false,
    isString: true,
    isRecord: false,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: "object string",
    value: String("string"),
    expectedType: TypeStateEnum.PRIMITIVE,
    expectedSerialize: '"string"',
    isEvaluable: true,
    isNumber: false,
    isArray: false,
    isString: true,
    isRecord: false,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: "[]", value: [], expectedType: TypeStateEnum.ARRAY, expectedSerialize: "[]",
    isEvaluable: true,
    isNumber: false,
    isArray: true,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: "object []", value: new Array(0), expectedType: TypeStateEnum.ARRAY, expectedSerialize: "[]",
    isEvaluable: true,
    isNumber: false,
    isArray: true,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: '[{property: "value"}]',
    value: [ { property: "value" } ],
    expectedType: TypeStateEnum.ARRAY,
    expectedSerialize: '[{"property":"\\\"value\\\""}]',
    isEvaluable: true,
    isNumber: false,
    isArray: true,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: '{property: "value"}',
    value: { property: "value" },
    expectedType: TypeStateEnum.RECORD,
    expectedSerialize: '{"property":"\\\"value\\\""}',
    isEvaluable: true,
    isNumber: false,
    isArray: false,
    isString: false,
    isRecord: true,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: "voidFunction",
    value: voidFunction,
    expectedType: TypeStateEnum.FUNCTION,
    expectedSerialize: voidFunctionSerialized,
    isEvaluable: true,
    isNumber: false,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: true,
    isDate: false,
  },
  {
    name: "paramsFunction",
    value: paramsFunction,
    expectedType: TypeStateEnum.FUNCTION,
    expectedSerialize: paramsFunctionSerialized,
    isEvaluable: true,
    isNumber: false,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: true,
    isDate: false,
  },
  {
    name: "classicFunction",
    value: classicFunction,
    expectedType: TypeStateEnum.FUNCTION,
    expectedSerialize: classicFunctionSerialized,
    isEvaluable: true,
    isNumber: false,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: true,
    isDate: false,
  },
  {
    name: "asyncFunction",
    value: asyncFunction,
    expectedType: TypeStateEnum.FUNCTION,
    expectedSerialize: asyncFunctionSerialized,
    isEvaluable: true,
    isNumber: false,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: true,
    isDate: false,
  },
  {
    name: "objectFunction",
    value: objectFunction,
    expectedType: TypeStateEnum.FUNCTION,
    expectedSerialize: objectFunctionSerialized,
    isEvaluable: true,
    isNumber: false,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: true,
    isDate: false,
  },
  {
    name: "object parent",
    value: new ParentTest("1"),
    expectedType: TypeStateEnum.OBJECT,
    expectedSerialize: JSON.stringify(parentTestSerialized),
    isEvaluable: true,
    isNumber: false,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: true,
    isFunction: false,
    isDate: false,
  },
  {
    name: "object child",
    value: new ChildTest("2"),
    expectedType: TypeStateEnum.OBJECT,
    expectedSerialize: JSON.stringify(childTestSerialized),
    isEvaluable: true,
    isNumber: false,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: true,
    isFunction: false,
    isDate: false,
  },
  {
    name: "any array",
    value: anyArray,
    expectedType: TypeStateEnum.ARRAY,
    expectedSerialize: JSON.stringify(anyArraySerialized),
    isEvaluable: true,
    isNumber: false,
    isArray: true,
    isString: false,
    isRecord: false,
    isObject: false,
    isFunction: false,
    isDate: false,
  },
  {
    name: "date",
    value: new Date("2023-07-12T14:38:58.480Z"),
    expectedType: TypeStateEnum.OBJECT,
    expectedSerialize: JSON.stringify("2023-07-12T14:38:58.480Z"),
    isEvaluable: true,
    isNumber: false,
    isArray: false,
    isString: false,
    isRecord: false,
    isObject: true,
    isFunction: false,
    isDate: true,
  },
] as ValueTest[]

export interface ValueTest {
  name: string,
  value: any,
  expectedType: TypeStateEnum,
  expectedSerialize: any,
  isEvaluable: boolean,
  isNumber: boolean,
  isArray: boolean,
  isString: boolean,
  isRecord: boolean,
  isObject: boolean,
  isFunction: boolean,
  isDate: boolean,
}