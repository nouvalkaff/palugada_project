const { generateNumber } = require("./helper_function");

exports.genNumber = (req, res) => {
  try {
    let format = req.query;

    const data = generateNumber(format);

    return res.status(200).send({
      code: 200,
      codeMessage: "OK",
      success: true,
      message: "A new set of number is generated.",
      data,
    });
  } catch (error) {
    console.error(error);
  }
};
