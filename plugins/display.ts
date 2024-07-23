const formatNumber = (number: number, toFixed: number = 0) => {
  if (!number) return '0';

  // let newNumber;

  // newNumber = Number(number).toFixed(toFixed);

  // const [integerPart, decimalPart] = newNumber.split('.');

  // const formattedIntegerPart = integerPart
  //   .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  //   .replace(/(\.\d*?[1-9])0+|\.0+$/g, '$1');

  // return Number(decimalPart) ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;

  return Number(number)
    .toFixed(toFixed)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export interface DisplayPlugin {
  formatNumber: (number: number, toFixed?: number) => string;
}

const display: DisplayPlugin = {
  formatNumber,
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      display: display,
    },
  };
});
