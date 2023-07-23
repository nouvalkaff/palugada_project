const { titleFixerService } = require('./helper_function');

exports.titleFixer = (req, res) => {
  const { judul, simple } = req.query;

  const fixedTitle = titleFixerService(judul);

  if (simple === '1') {
    return res
      .setHeader('Content-type', 'text/html')
      .status(200)
      .send(
        `Hasil mungkin belum sempurna, mohon cek kembali ==> ${fixedTitle} <==`
      );
  }

  return res.status(200).send({
    code: 200,
    codeMessage: 'OK',
    success: true,
    message: 'Succesfully fixing the title',
    data: fixedTitle
  });
};
