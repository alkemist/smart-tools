import { describe, expect, it } from "@jest/globals";
import { testValues, ValueTest } from "./test-data.js";
import { AnyValue, TreeHelper, TypeHelper } from '../src/index.js';

describe("CompareHelper", () => {
  describe("serialize", () => {
    it.each(testValues)(
      "Value '$name' should serialize",
      (serializeTest) => {
        expect(TypeHelper.serialize(serializeTest.value))
          .toStrictEqual(serializeTest.expectedSerialize);
      }
    );
  });

  describe.each([
    { function: "isEvaluable" },
    { function: "isNumber" },
    { function: "isArray" },
    { function: "isString" },
    { function: "isRecord" },
    { function: "isObject" },
    { function: "isFunction" },
    { function: "isDate" },
  ] as { function: keyof TypeHelper & keyof ValueTest }[])(
    "$function",
    (test) => {
      const method: (value: AnyValue) => boolean
        = TypeHelper[test.function];
      const testSequence = `${ test.function } with value '$name' should return '$${ test.function }'`;

      it.each(testValues)(
        testSequence,
        (typeStateTest) => {
          const expected = typeStateTest[test.function]

          expect(method(typeStateTest.value))
            .toBe(expected)
          ;
        }
      );
    }
  );

  describe("Get cycles", () => {
    const x = {
      cycle: null as any,
    };
    x.cycle = x;
    const objWithCycles = {
      prop: {},
      test: "test",
      prop2: [ 1, 2, [ { subArray: x } ] ]
    };

    it("Should detect circular references", () => {
      expect(TreeHelper.getCycles(objWithCycles)).toEqual([
        "prop2[2][0].subArray.cycle"
      ]);
    })

    it("Should deep clone without circular references", () => {
      expect(TypeHelper.deepClone(objWithCycles)).toEqual({
        prop: {},
        test: "test",
        prop2: [ 1, 2, [ { subArray: {} } ] ]
      });
    });
  })
});

