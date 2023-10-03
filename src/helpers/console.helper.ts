import { CONSOLE_LOG_STYLES, LogInterface } from '../models/index.js';
import { TypeHelper } from './type.helper.js';
import { TreeHelper } from './tree.helper.js';

export abstract class ConsoleHelper {
  static group(
    parent: LogInterface | string | any,
    children: (LogInterface | string | any)[],
    colors?: string[]
  ) {
    const parentLog = ConsoleHelper.format(parent);

    console.group(
      `%c ${ parentLog.title }`,
      colors && colors[0] ? colors[0] : '',
      ...(parentLog.data ?? []),
    );

    children.forEach((child, index) => {
        const childLog = ConsoleHelper.format(child);

        console.log(
          `%c ${ childLog.title }`,
          colors && colors[index + 1] ? colors[index + 1] : '',
          ...(childLog.data ?? []),
        );
      }
    )

    console.groupEnd();
  }

  static logBlue(title: string, ...data: any[]) {
    console.log(`%c ${ title }`, CONSOLE_LOG_STYLES.blue, ...data);
  }

  static logGreen(title: string, ...data: any[]) {
    console.log(`%c ${ title }`, CONSOLE_LOG_STYLES.green, ...data);
  }

  static logGrey(title: string, ...data: any[]) {
    console.log(`%c ${ title }`, CONSOLE_LOG_STYLES.grey, ...data);
  }

  static logRed(title: string, ...data: any[]) {
    console.log(`%c ${ title }`, CONSOLE_LOG_STYLES.red, ...data);
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