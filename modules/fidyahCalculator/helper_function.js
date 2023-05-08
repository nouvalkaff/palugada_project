const {
  getIdnYear,
  formatNumber,
  toInt
} = require('../general_function_helper');

const errorMessage =
  "Input 'year' tidak bisa melebihi tahun di waktu sekarang.";

exports.calculateFidyah = async (rate, req) => {
  /**
   * If the year is same with the current year, quantity is one.
   * If the year is minus one from the current year, quantity is one.
   * If the year is minus two and so on from the current year, quantity is current year minus chosen year.
   */

  const { body, query } = req;

  let calculateOldOrIllFidyah = +query.oldill;

  toInt(rate);
  let fidyahPaid = 0;

  const idnTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Jakarta'
  });

  const idnYear = getIdnYear(idnTime);

  if (!calculateOldOrIllFidyah) {
    for (let element of body) {
      const { year, days } = element;

      toInt(year);
      toInt(days);

      const yearDiff = idnYear - year;

      if (yearDiff < 0) throw errorMessage;

      const quantity = days;
      const multiplier = yearDiff === 0 ? 1 : yearDiff;
      const addition = +(multiplier * quantity * rate).toFixed(2);
      fidyahPaid += addition;
    }
  } else {
    for (let element of body) {
      const { year, days } = element;

      toInt(year);
      toInt(days);

      const yearDiff = idnYear - year;

      if (yearDiff < 0) throw errorMessage;

      const quantity = days;
      const multiplier = 1;
      const addition = +(multiplier * quantity * rate).toFixed(2);
      fidyahPaid += addition;
    }
  }

  return String(rate).includes('.')
    ? fidyahPaid.toFixed(2)
    : formatNumber(fidyahPaid);
};
