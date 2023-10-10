import { Path, TypeState } from '../tools/index.js';
import {
  AnyValue,
  GenericValueArray,
  GenericValueTree,
  ValueArray,
  ValueKey,
  ValueRecord,
  ValueTree
} from '../models/index.js';
import { ObjectHelper } from './object.helper.js';
import { MathHelper } from './math.helper.js';
import { TypeHelper } from './type.helper.js';
import { StringHelper } from './string.helper.js';

export abstract class TreeHelper {
  static keys<
    D,
    T extends GenericValueTree<D>,
    R extends ValueKey = T extends GenericValueArray<D> ? string : number
  >(tree: T): R[] {
    if (!TypeHelper.isEvaluable(tree)) return [];

    return TypeHelper.isArray(tree)
      ? Object.keys(tree).map(index => parseInt(index)) as R[]
      : Object.getOwnPropertyNames(tree) as R[];
  }

  /**
   * Retrieves an element from a tree
   * @param object
   * @param path
   */
  static getIn(object: unknown, path: ValueKey[]): unknown {
    let value: unknown | undefined = object
    let i = 0

    if (value) {
      while (i < path.length) {
        const nextPath = path[i];
        if (ObjectHelper.hasStringIndex(value)) {
          value = value[nextPath]
        } else if (TypeHelper.isArray<AnyValue>(value)) {
          value = value[MathHelper.parseInt(nextPath)]
        } else {
          value = undefined
        }

        i++
      }
    }

    return value
  }

  /**
   * Set an element from a tree
   * @param object
   * @param path
   * @param value
   */
  static setIn(object: unknown, path: ValueKey | ValueKey[], value: unknown): unknown {
    const paths = TypeHelper.isArray(path) ? path : [ path ];
    let currentValue: unknown | undefined = object
    let i = 0

    if (currentValue) {
      while (i < paths.length) {
        const nextPath = paths[i];
        const isLast = i === paths.length - 1;

        if (ObjectHelper.hasStringIndex(currentValue)) {
          if (isLast) {
            currentValue[nextPath] = value as AnyValue;
          } else {
            currentValue = currentValue[nextPath]
          }
        } else if (TypeHelper.isArray<AnyValue>(currentValue)) {
          if (isLast) {
            currentValue[MathHelper.parseInt(nextPath)] = value as AnyValue;
          } else {
            currentValue = currentValue[MathHelper.parseInt(nextPath)]
          }
        } else {
          currentValue = undefined
        }

        i++;
      }
    }

    return object
  }

  static hasProperty(value: unknown, path: ValueKey[] | ValueKey): boolean {
    if (TypeHelper.isKey(path)) {
      path = [ path ]
    }

    if (path.length === 0) {
      return true;
    } else if (!TypeHelper.isEvaluable(value) || !TypeHelper.isTree(value)) {
      return false;
    }

    let currentProperty = path[0];

    if (path.length === 1) {
      return TreeHelper.hasOwn(value, currentProperty);
    } else if (!TreeHelper.hasOwn(value, currentProperty)) {
      return false;
    }

    const subValue = TypeHelper.isNumber(currentProperty)
      ? (value as ValueArray)[currentProperty]
      : (value as ValueRecord)[currentProperty];


    return TypeHelper.isTree(subValue)
      ? TreeHelper.hasProperty(subValue, path.slice(1))
      : false;
  }

  static hasOwn(tree: ValueTree, property: ValueKey): boolean {
    if (TypeHelper.isArray(tree) && TypeHelper.isNumber(property)) {
      return property < tree.length;
    }
    return Object.hasOwn(tree, property)
  }

  static flat(value: unknown): unknown {
    const typeState = new TypeState(value);

    if (!typeState.isValuable || typeState.isPrimitive || typeState.isFunction) {
      if (TypeHelper.isString(value)) {
        return `"${ value }"`;
      }

      return StringHelper.stringify(value);
    } else if (TypeHelper.isDate(value)) {
      return value;
    } else if (TypeHelper.isTree(value)) {
      const flat: Record<string | number, unknown> = typeState.isArray ?
        [] as Record<number, AnyValue> : {} as ValueRecord;


      const keys = TreeHelper.keys(value);

      keys.forEach((index) => {
        if (TypeHelper.isArray(value)) {
          flat[index] = TreeHelper.flat(value[MathHelper.parseInt(index)]);
        } else if (ObjectHelper.hasStringIndex(value)) {
          flat[index] = TreeHelper.flat(value[index]);
        }
      });
      return flat;
    }
    return value;
  }

  static getCycles(object: ValueRecord) {
    if (!TypeHelper.isEvaluable(object)) {
      return [];
    }

    const traversedProps = new Set();
    const cycles: Path[] = [];

    // Recursive function to go over objects/arrays
    const traverse = function (currentObj: GenericValueTree<unknown>, path = new Path()) {
      if (traversedProps.has(currentObj)) {
        cycles.push(path);
        return;
      }

      traversedProps.add(currentObj);

      TreeHelper.keys(currentObj).forEach((key) => {
        const newPath = path.clone();
        newPath.push(key);

        const child = TypeHelper.isArray(currentObj) ?
          currentObj[MathHelper.parseInt(key)] : (currentObj as ValueRecord)[key];

        if (TypeHelper.isTree(child)) {
          traverse(child as GenericValueTree<unknown>, newPath);
        }
      })
    }

    traverse(object);
    return cycles.map(cycle => cycle.toString());
  };
}