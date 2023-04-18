const { randomUsernameGenerator } = require('./helper_function');

exports.userNameGenerator = async (req, res) => {
  try {
    const { preset } = req.query;
    const data = await randomUsernameGenerator(preset);

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
