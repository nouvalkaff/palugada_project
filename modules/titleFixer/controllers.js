const { capsMe } = require("../general_function_helper");

exports.titleFixer = (req, res) => {
  const { judul } = req.body;

  let capitalize = capsMe(judul);

  return res.status(200).send({
    code: 200,
    codeMessage: "OK",
    success: true,
    message: "Succesfully generating smart commit message",
    data: judul,
  });
};
