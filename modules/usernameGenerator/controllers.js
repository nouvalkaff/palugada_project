const { randomUsernameGenerator } = require('./helper_function');

exports.userNameGenerator = async (req, res) => {
  try {
    const data = await randomUsernameGenerator(req.query);

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
