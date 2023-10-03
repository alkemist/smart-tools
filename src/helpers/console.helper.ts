import { LogInterface } from '../models/index.js';
import { TypeHelper } from './type.helper.js';
import { TreeHelper } from './tree.helper.js';

export abstract class ConsoleHelper {
  static group(
    parent: LogInterface | string | any,
    children: (LogInterface | string | any)[],
    colors?: string[]
  ) {
    const parentLog = ConsoleHelper.format(parent);

    ConsoleHelper.log(
      parentLog.title,
      colors && colors[0] ? colors[0] : '',
      true,
      ...parentLog.data ?? []
    );

    children.forEach((child, index) => {
        const childLog = ConsoleHelper.format(child);

        ConsoleHelper.log(
          childLog.title,
          colors && colors[index + 1] ? colors[index + 1] : '',
          false,
          ...childLog.data ?? []
        )
      }
    )

    console.groupEnd();
  }

  static log(title: string, style: string, isGroup: boolean = false, ...data: any[]) {
    const fn = isGroup ? console.group : console.log;

    fn.call(console, `%c ${ title }`, style, ...data);
  }

  private static format(log: LogInterface | string | any): LogInterface {
    if (TypeHelper.isString(log)) {
      return {
        title: log
      };
    } else if (log.title !== undefined && TreeHelper.keys(log).length === 1) {
      return log;
    } else if (
      log.title !== undefined
      && log.data !== undefined
      && TreeHelper.keys(log).length === 2
    ) {
      return {
        title: log.title,
        data: TypeHelper.isArray(log.data) ? log.data : [ log.data ]
      }
    } else {
      return {
        title: log.title ?? '',
        data: TypeHelper.isArray(log) ? log : [ log ]
      }
    }
  }
}