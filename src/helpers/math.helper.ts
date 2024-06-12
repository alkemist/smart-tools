import { TypeHelper } from './type.helper.js';
import { ValueKey } from '../models/index.js';

export abstract class MathHelper {
  static parseInt(value: ValueKey): number {
    if (TypeHelper.isNumber(value)) {
      return value;
    }
    return parseInt(value);
  }

  static clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(min, value), max);
  }

  static round(value: number, decimal: number = 2) {
    return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
  }

  static floor(value: number, decimal: number = 2) {
    return Math.floor(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
  }

  static sum(numbers: number[]) {
    return numbers.reduce((s, c) => s + c, 0)
  }

  /**
   * @param lat1
   * @param lon1
   * @param lat2
   * @param lon2
   * @param unit 'M' is statute miles (default), 'K' is kilometers, 'N' is nautical miles
   * https://www.movable-type.co.uk/scripts/latlong.html
   */
  static distance(lat1: number, lon1: number, lat2: number, lon2: number, unit = "K") {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in metres
  }

  static random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}