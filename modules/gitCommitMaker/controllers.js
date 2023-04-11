const { commitGenerator } = require('./helper_function');

exports.commitMaker = async (req, res) => {
  try {
    const { branch, commitMessage, headMessage } = req.body;
    const { bullet, useStep } = req.query;
    const data = commitGenerator({
      branch,
      bullet,
      commitMessage,
      headMessage,
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
  }
};
