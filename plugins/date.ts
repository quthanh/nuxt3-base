import dayjs, { Dayjs, type ConfigType, type OptionType } from 'dayjs';
import { defineNuxtPlugin } from '#app';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

dayjs.prototype.formatLocalDate = function (format = 'lll') {
  return this.utc().local().format(format);
};

export interface DayJS {
  (date?: ConfigType, option?: OptionType, locale?: string): Dayjs;
}

declare module 'dayjs' {
  interface Dayjs {
    formatLocalDate(format?: string): string;
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      date: dayjs,
    },
  };
});
