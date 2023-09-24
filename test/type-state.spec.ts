import { describe, expect, it } from "@jest/globals";
import { TypeState } from '../src/index.js';
import { testValues } from './test-data.js';


describe("TypeState", () => {
  it.each(testValues)(
    "Type state '$name' should return '$expectedType'",
    (typeStateTest) => {
      expect(new TypeState(typeStateTest.value).type).toBe(typeStateTest.expectedType);
    }
  );
});