const {
  getIdnYear,
  formatNumber,
  toInt
} = require('../general_function_helper');

exports.calculateFidyah = async (rate, body) => {
  /**
   * If the year is same with the current year, quantity is one.
   * If the year is minus one from the current year, quantity is one.
   * If the year is minus two and so on from the current year, quantity is current year minus chosen year.
   */

  toInt(rate);
  let fidyahPaid = 0;

  const idnTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Jakarta'
  });

  const idnYear = getIdnYear(idnTime);

  for (let element of body) {
    const { year, days } = element;

    toInt(year);
    toInt(days);

    const yearDiff = idnYear - year;

    if (yearDiff < 0) throw 'Year input cannot exceeds current year.';

    const quantity = days;
    const multiplier = yearDiff === 0 ? 1 : yearDiff;
    fidyahPaid += multiplier * quantity * rate;
  }

  return String(rate).includes('.')
    ? fidyahPaid.toFixed(2)
    : formatNumber(fidyahPaid);
};
