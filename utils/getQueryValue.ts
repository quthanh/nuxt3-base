import type { LocationQueryValue } from 'vue-router';

export const getQueryValue = (value?: LocationQueryValue | LocationQueryValue[]) => {
  return value
    ? Array.isArray(value)
      ? value.map((item) => String(item))
      : String(value).includes(',')
      ? String(value)
          .split(',')
          .map((item) => item)
      : String(value)
    : undefined;
};
