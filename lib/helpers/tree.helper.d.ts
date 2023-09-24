import { GenericValueArray, GenericValueTree, ValueKey, ValueRecord, ValueTree } from '../models/index.js';
export declare abstract class TreeHelper {
    static keys<D, T extends GenericValueTree<D>, R extends ValueKey = T extends GenericValueArray<D> ? string : number>(tree: T): R[];
    static getIn(object: unknown, path: ValueKey[]): unknown;
    static hasProperty(value: unknown, path: ValueKey[] | ValueKey): boolean;
    static hasOwn(tree: ValueTree, property: ValueKey): boolean;
    static flat(value: unknown): unknown;
    static getCycles(object: ValueRecord): string[];
}
//# sourceMappingURL=tree.helper.d.ts.map