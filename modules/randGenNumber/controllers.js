const { generateNumber } = require('./helper_function');

exports.genNumber = (req, res) => {
  try {
    let format = req.query;
    const { maxnum, length } = format;

    if (+format.simple === 0 && (maxnum > 10000 || length > 2000)) {
      return res.status(400).send({
        code: 400,
        codeMessage: 'Bad Request',
        success: false,
        message:
          'The max amount of maximum number is 10,000 and length is 2,000'
      });
    } else if (+format.simple === 1 && (maxnum > 100000 || length > 10)) {
      return res.status(400).send({
        code: 400,
        codeMessage: 'Bad Request',
        success: false,
        message: 'The max amount of maximum number is 100,000 and length is 10'
      });
    }

    if (+format.simple === 1) {
      return res
        .setHeader('Content-type', 'text/html')
        .status(200)
        .send(`==> ${generateNumber(format)} <==`);
    }

    const data = generateNumber(format);
    return res.status(200).send({
      code: 200,
      codeMessage: 'OK',
      success: true,
      message: 'A new set of number is generated.',
      data
    });
  } catch (error) {
    console.error(error);
  }
};
