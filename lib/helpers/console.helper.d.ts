import { LogInterface } from '../models/index.js';
export declare abstract class ConsoleHelper {
    static group(parent: LogInterface | string | any, children: (LogInterface | string | any)[], colors?: string[]): void;
    static logBlue(title: string, ...data: any[]): void;
    static logGreen(title: string, ...data: any[]): void;
    static logGrey(title: string, ...data: any[]): void;
    static logRed(title: string, ...data: any[]): void;
    private static format;
}
//# sourceMappingURL=console.helper.d.ts.map