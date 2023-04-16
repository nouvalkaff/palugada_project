const { randomWordGenerator } = require('./helper_function');

exports.userNameGenerator = async (req, res) => {
  try {
    const randomWord = await randomWordGenerator();

    return res.status(200).send({
      code: 200,
      codeMessage: 'OK',
      success: true,
      message: randomWord
    });
  } catch (error) {
    console.log(error);
  }
};
