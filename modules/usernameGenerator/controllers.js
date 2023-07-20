const { randomUsernameGenerator } = require('./helper_function');

exports.userNameGenerator = async (req, res) => {
  try {
    const data = await randomUsernameGenerator(req.query);

    if (req.query.simple === '1') {
      return res
        .setHeader('Content-type', 'text/html')
        .status(200)
        .send(` Here is your new username ==> ${data} <==`);
    }

    return res.status(200).send({
      code: 200,
      codeMessage: 'OK',
      success: true,
      message: data
    });
  } catch (error) {
    console.log(error);
  }
};
