const { commitGenerator } = require('./helper_function');

exports.commitMaker = async (req, res) => {
  try {
    const { branch, commitMessage, headMessage } = req.body;
    const { bullet, oneLiner, useStep } = req.query;
    const data = commitGenerator({
      branch,
      bullet,
      commitMessage,
      headMessage,
      oneLiner,
      useStep
    });
    return res.status(200).send({
      code: 200,
      codeMessage: 'OK',
      success: true,
      message: 'Succesfully generating commit message',
      data: data
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      code: 400,
      codeMessage: 'Bad Request',
      success: false,
      message: error.message
    });
  }
};
