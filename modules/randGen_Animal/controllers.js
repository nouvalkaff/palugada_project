const { generateAnimal } = require("./helper_function");

exports.genAnimal = (req, res) => {
  try {
    let format = req.query;

    const data = generateAnimal(format);

    console.log(data, "data");

    if (typeof data === "number") {
      return res.status(400).send({
        code: 400,
        codeMessage: "Bad Request",
        success: false,
        message: `The current animals data length is ${data} while your request is ${format.length}`,
      });
    }

    return res.status(200).send({
      code: 200,
      codeMessage: "OK",
      success: true,
      message: "A new set of animal is generated.",
      data,
    });
  } catch (error) {
    console.error(error);
  }
};
