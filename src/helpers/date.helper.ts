export abstract class DateHelper {
  static seconds(date: Date = new Date()) {
    return Math.round(date.getTime() / 1000);
  }

  static dayStart(date: Date = new Date()) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  static dayEnd(date: Date = new Date()) {
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    date.setMilliseconds(59);
    return date;
  }

  static calcHoursAfter(date: string | Date): number {
    const dateTime = (new Date()).getTime();
    const lastUpdatedTime = new Date(date).getTime();
    return Math.abs(Math.round((dateTime - lastUpdatedTime) / (1000 * 60 * 60)));
  }
}