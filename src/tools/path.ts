import { ValueKey } from '../models/index.js';
import { TypeHelper } from '../helpers/index.js';

export class Path extends Array<ValueKey> {

  add(el: ValueKey): Path {
    super.push(el);
    return this;
  }

  clone(): Path {
    return this.slice();
  }

  override slice(start?: number, end?: number): Path {
    const path = new Path();
    path.push(...super.slice(start, end))
    return path;
  }

  override toString(): string {
    return this.reduce((strPath, currentPath) => {
      const newPath = TypeHelper.isNumber(currentPath)
        ? `[${ currentPath }]`
        : `${ strPath === "" ? "" : "." }${ currentPath }`;

      return strPath + newPath;
    }, "") as string;
  }

  last(): ValueKey | undefined {
    return this.length > 0 ? this[this.length - 1] : undefined;
  }
}