import { describe, expect, it } from "@jest/globals";
import { ConsoleHelper, LogInterface } from '../src/index.js';

interface TestValue {
  name: string;
  value: any;
  expected: LogInterface
}

const log = 'test';
const anObject = { property: true };

const testValues: TestValue[] = [
  { name: 'text', value: log, expected: { title: log } },
  { name: 'log simple', value: { title: log }, expected: { title: log } },
  {
    name: 'log formated with an object',
    value: { title: log, data: anObject },
    expected: { title: log, data: [ anObject ] }
  },
  {
    name: 'log formated with an array',
    value: { title: log, data: [ anObject ] },
    expected: { title: log, data: [ anObject ] }
  },
  {
    name: 'log extend format',
    value: { title: log, data: [ anObject ], otherProperty: true },
    expected: { title: log, data: [ { title: log, data: [ anObject ], otherProperty: true } ] }
  },
  { name: 'log unknonw object', value: anObject, expected: { title: '', data: [ anObject ] } },
  { name: 'log array', value: [ anObject ], expected: { title: '', data: [ anObject ] } }
]

describe("ConsoleHelper", () => {
  describe("format", () => {
    it.each(testValues)(
      "Value '$name' should format",
      (test: TestValue) => {
        // @ts-ignore
        expect(ConsoleHelper.format(test.value))
          .toStrictEqual(test.expected);
      }
    );
  })
});