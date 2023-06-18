const { titleFixerService } = require('./helper_function');

exports.titleFixer = (req, res) => {
  const { judul } = req.query;

  const fixedTitle = titleFixerService(judul);

  return res.status(200).send({
    code: 200,
    codeMessage: 'OK',
    success: true,
    message: 'Succesfully fixing the title',
    data: fixedTitle
  });
};
