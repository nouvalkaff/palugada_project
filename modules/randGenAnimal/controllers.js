const { generateAnimal } = require('./helper_function');

exports.genAnimal = (req, res) => {
  try {
    const format = req.query;

    const data = generateAnimal(format);

    if (typeof data === 'number') {
      return res.status(400).send({
        code: 400,
        codeMessage: 'Bad Request',
        success: false,
        message: `The current animals in database is ${data} while user request is ${format.length}`
      });
    }

    if (+format.simple === 1) {
      return res
        .setHeader('Content-type', 'text/html')
        .status(200)
        .send(`==> ${data} <==`);
    }

    return res.status(200).send({
      code: 200,
      codeMessage: 'OK',
      success: true,
      message: 'A new set of animal is generated.',
      data
    });
  } catch (error) {
    console.error(error);
  }
};
