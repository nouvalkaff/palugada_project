const { smartCommitGenerator } = require('./helper_function');

exports.smartCommitMaker = async (req, res) => {
  try {
    const { branch, headComment, detailComment } = req.body;
    const { bullet } = req.query;

    const data = smartCommitGenerator({
      branch,
      bullet,
      detailComment,
      headComment
    });

    const response = {
      attention:
        'Please use --> Git Bash terminal <-- to execute the command below.',
      transitionInfo:
        'More information about smart commit please refer to https://plgda.cyclic.app/bQz',
      gitCommitCommand: data
    };

    return res.status(200).send({
      code: 200,
      codeMessage: 'OK',
      success: true,
      message: 'Succesfully generating smart commit message',
      data: response
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      code: 400,
      codeMessage: 'Bad Request',
      success: false,
      message: error.message || error
    });
  }
};
