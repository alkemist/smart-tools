import { LogInterface } from '../models/index.js';
export declare abstract class ConsoleHelper {
    static group(parent: LogInterface | string | any, children: (LogInterface | string | any)[], colors?: string[]): void;
    static log(title: string, style: string, isGroup?: boolean, ...data: any[]): void;
    private static format;
}
//# sourceMappingURL=console.helper.d.ts.map