const {
  ShrinkMyLongURLPlease,
  saveToDB,
  checkMyUniqChars,
  isUniqueCharsExist,
  getAllFromDB,
} = require("./helper_function");
const UNIQ_LEN_LINK = process.env.UNIQ_LEN_LINK;

exports.getAllURLs = async (req, res) => {
  try {
    const allData = await getAllFromDB();

    return res.status(200).send({
      code: 200,
      codeMessage: "OK",
      success: true,
      message: "Succesfully get all data from database",
      data: allData,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.redirectToRealURL = async (req, res) => {
  try {
    const uniqChars = req.params.id;

    const isExist = await isUniqueCharsExist(uniqChars);

    if (!isExist) {
      return res.status(400).send({
        code: 400,
        codeMessage: "Bad Request",
        success: false,
        message: "Set of unique characters that you search is not exist",
      });
    }

    return res
      .writeHead(301, {
        Location: isExist.original,
      })
      .end();
  } catch (error) {
    console.error(error);
  }
};

exports.doItNow = async (req, res) => {
  try {
    const longURL = req.query.url_ori;

    // field url_ori cannot be empty or undefined
    if (!longURL) {
      return res.status(400).send({
        code: 400,
        codeMessage: "Bad Request",
        success: false,
        message: "Field url_ori cannot be empty or undefined",
      });
    }

    /**
     * shrinkedURL = [ '5JwbK7W', 'localhost:1927/5JwbK7W', true ]
     * shrinkedURL[0] = unique chars
     * shrinkedURL[1] = domain + unique chars
     * shrinkedURL[2] = status function
     */
    const shrinkedURL = ShrinkMyLongURLPlease(longURL, UNIQ_LEN_LINK);

    if (shrinkedURL[2] === false) {
      return res.status(400).send({
        code: 400,
        codeMessage: "Bad Request",
        success: false,
        message: "URL is not valid. Please input the valid URL.",
      });
    }

    // below is a function to check the unique characters already exist or not
    const uniqueCharsChecker = await checkMyUniqChars(
      longURL,
      UNIQ_LEN_LINK,
      shrinkedURL[0],
      shrinkedURL
    );

    if (uniqueCharsChecker.length !== 0) {
      const savedData = await saveToDB(longURL, uniqueCharsChecker[0]);

      if (savedData) {
        return res.status(200).send({
          code: 200,
          codeMessage: "OK",
          success: true,
          message: "Here is your new short URL",
          urlOri: longURL,
          urlShrinked: uniqueCharsChecker[1],
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      codeMessage: "Internal Server Error",
      success: false,
    });
  }
};
