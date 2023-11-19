import { ValueKey } from '../models/index.js';
export declare abstract class MathHelper {
    static parseInt(value: ValueKey): number;
    static clamp(value: number, min: number, max: number): number;
    static round(value: number, decimal?: number): number;
    static floor(value: number, decimal?: number): number;
    static sum(numbers: number[]): number;
    static distance(lat1: number, lon1: number, lat2: number, lon2: number, unit?: string): number;
}
//# sourceMappingURL=math.helper.d.ts.map