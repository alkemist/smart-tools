import { describe, expect, it } from "@jest/globals";
import { StringHelper } from '../src/index.js';

describe("StringHelper", () => {
  describe('slugify', () => {
    it('should slugify', () => {
      expect(StringHelper.slugify()).toEqual('');
      expect(StringHelper.slugify('Azért(#@%i " qWérti°')).toEqual('azerti-qwerti');
    });
  });
});