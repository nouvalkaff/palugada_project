const { generateNumber } = require('./helper_function');

exports.genNumber = (req, res) => {
  try {
    // setTimeout(() => {
    //   return res.status(408).send({
    //     code: 408,
    //     codeMessage: 'Request Timeout',
    //     success: false,
    //     message: `The request time exceeds 2 seconds, please try again.`
    //   });
    // }, 2000);

    let format = req.query;

    const { maxnum, length } = format;

    if (maxnum > 10000 || length > 2000) {
      return res.status(400).send({
        code: 400,
        codeMessage: 'Bad Request',
        success: false,
        message:
          'The max amount of maximum number is 10,000 and length is 2,000'
      });
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
