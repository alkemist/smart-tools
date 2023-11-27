import { describe, expect, it } from '@jest/globals';
import { KeyValue, SmartMap, ValueKey } from '../src/index.js';

interface TestSimple<I = any, K extends ValueKey = ValueKey, V = any> {
  name: string,
  input: I;
  expectedKeys: K[];
  expectedValues: V[];
}

interface TestAdvanced<K extends ValueKey = ValueKey, V = any> extends TestSimple<[ K, V ][], K, V> {
  expectedMapValues: [ K, V ][];
  expectedRecord: Record<K, V>;
  expectedKeysValues: KeyValue<K, V>[];
  newKey: K,
  newValue: V,
}

describe("SmartMap", () => {
  describe("construct", () => {
    const testItems = <K extends ValueKey = ValueKey, V = any>(smartMap: SmartMap<V, K>, expectedItems: any[]) => {
      expect(smartMap.values()).toEqual(new Map(expectedItems).values());
      expect(smartMap.size).toEqual(expectedItems.length);

      expect(smartMap.map((v, iI, iV) => `${ iV } ${ iI } ${ v?.toString() ?? '' }`)).toEqual(
        expectedItems.map((v, i) => `${ i } ${ v[0] } ${ v[1]?.toString() ?? '' }`)
      );

      const values: any[] = [];
      smartMap.each((v, iI, iV) => {
        values.push([ iV, iI, v ])
      });
      expect(values).toEqual(expectedItems.map((value, i) => [ i, value[0], value[1] ]));

      if (expectedItems.length > 0) {
        expect(smartMap.filter((v, iI, iV) => iV > 0).size)
          .toEqual(expectedItems.length - 1);

        const lastIndex = expectedItems.length - 1;

        expect(smartMap.find((v, iI, iV) => iV === lastIndex))
          .toEqual(expectedItems[lastIndex][1]);

        expect(smartMap.findKey((v, iI, iV) => iV === lastIndex))
          .toEqual(expectedItems[lastIndex][0]);
      } else {
        expect(smartMap.filter((v, iI, iV) => iV > 0).size)
          .toEqual(0);
      }
    }

    const advancedTests: TestAdvanced[] = [
      {
        name: 'empty',
        input: [],
        expectedMapValues: [],
        expectedKeys: [],
        expectedValues: [],
        expectedRecord: {},
        expectedKeysValues: [],
        newKey: 'newKey',
        newValue: 'newValue'
      },
      {
        name: 'number => string map',
        input: [ [ 1, 'value1' ], [ 2, 'value2' ] ],
        expectedMapValues: [ [ 1, 'value1' ], [ 2, 'value2' ] ],
        expectedKeys: [ 1, 2 ],
        expectedValues: [ 'value1', 'value2' ],
        expectedRecord: { 1: 'value1', 2: 'value2' },
        expectedKeysValues: [ { key: 1, value: 'value1' }, { key: 2, value: 'value2' } ],
        newKey: 999,
        newValue: 'value999'
      },
      {
        name: 'string => object map',
        input: [ [ 'key1', { property: 1 } ], [ 'key2', { property: 2 } ] ],
        expectedMapValues: [ [ 'key1', { property: 1 } ], [ 'key2', { property: 2 } ] ],
        expectedKeys: [ 'key1', 'key2' ],
        expectedValues: [ { property: 1 }, { property: 2 } ],
        expectedRecord: { key1: { property: 1 }, key2: { property: 2 } },
        expectedKeysValues: [ { key: 'key1', value: { property: 1 } }, { key: 'key2', value: { property: 2 } } ],
        newKey: 'key999',
        newValue: { property: 'value999' }
      }
    ];
    it.each(advancedTests)('from array with $name', function (test: TestAdvanced) {
      const smartMap = new SmartMap(test.input);

      expect(smartMap.getKeys()).toEqual(test.expectedKeys);
      expect(smartMap.getValues()).toEqual(test.expectedValues);
      expect(smartMap.toRecord()).toEqual(test.expectedRecord);
      expect(smartMap.toKeyValues()).toEqual(test.expectedKeysValues);

      testItems(smartMap, test.expectedMapValues);

      smartMap.set(test.newKey, null);

      testItems(smartMap, [
        ...test.expectedMapValues,
        [ test.newKey, null ]
      ])

      smartMap.set(test.newKey, test.newValue);

      testItems(smartMap, [
        ...test.expectedMapValues,
        [ test.newKey, test.newValue ]
      ])
    });
  })

  describe("from record", () => {
    const recordTests: TestSimple<Record<ValueKey, any>>[] = [
      { name: 'empty', input: {}, expectedKeys: [], expectedValues: [] },
      {
        name: 'number => string',
        input: {
          1: "value1",
          2: "value2",
        },
        expectedKeys: [ "1", "2" ],
        expectedValues: [ "value1", "value2" ]
      },
      {
        name: 'string => object',
        input: {
          key1: { property: "value1" },
          key2: { property: "value2" },
        },
        expectedKeys: [ "key1", "key2" ],
        expectedValues: [ { property: "value1" }, { property: "value2" } ]
      }
    ];
    it.each(recordTests)('$name', (test) => {
      const smartMap = SmartMap.fromRecord(test.input);
      expect(smartMap.getKeys()).toEqual(test.expectedKeys)
      expect(smartMap.getValues()).toEqual(test.expectedValues)
    })
  })

  describe("from keyValues", () => {
    const keyValueTests: TestSimple<KeyValue<ValueKey, any>[]>[] = [
      { name: 'empty', input: [], expectedKeys: [], expectedValues: [] },
      {
        name: 'number => string',
        input: [ { key: 1, value: "value1" }, { key: 2, value: "value2" } ],
        expectedKeys: [ 1, 2 ],
        expectedValues: [ "value1", "value2" ]
      },
      {
        name: 'string => object',
        input: [ { key: "key1", value: { property: "value1" } }, { key: "key2", value: { property: "value2" } } ],
        expectedKeys: [ "key1", "key2" ],
        expectedValues: [ { property: "value1" }, { property: "value2" } ]
      }
    ]
    it.each(keyValueTests)('$name', (test) => {
      const smartMap = SmartMap.fromKeyValues(test.input);
      expect(smartMap.getKeys()).toEqual(test.expectedKeys)
      expect(smartMap.getValues()).toEqual(test.expectedValues)
    })
  });

  describe("from enum", () => {
    enum StringNumber {
      key0,
      key1,
      key999 = 999,
      key1000
    }

    enum StringString {
      key1 = "value1",
      key2 = "value2"
    }

    enum Mixed {
      number0,
      string1 = "value1"
    }

    it.each([
      {
        name: 'string => number',
        input: StringNumber,
        expectedKeys: [ "key0", "key1", "key999", "key1000" ],
        expectedValues: [ 0, 1, 999, 1000 ],
      },
      {
        name: 'string => string',
        input: StringString,
        expectedKeys: [ 'key1', "key2" ],
        expectedValues: [ "value1", "value2" ],
      },
      {
        name: 'mixed',
        input: Mixed,
        expectedKeys: [ "number0", "string1" ],
        expectedValues: [ 0, "value1" ],
      },
    ])('$name', (test) => {
      const smartMap = SmartMap.fromEnum(test.input);
      expect(smartMap.getKeys()).toEqual(test.expectedKeys)
      expect(smartMap.getValues()).toEqual(test.expectedValues)
    })
  });
});