const { User_URL } = require("../../models");
const { ShrinkMyLongURLPlease } = require("./helper_function");

exports.doItNow = async (req, res) => {
  try {
    const URL_ORI = req.body.url_ori;

    let shrinkedURL = ShrinkMyLongURLPlease(URL_ORI);

    let is_exist = await User_URL.findOne({
      where: { params: shrinkedURL[2] },
    });

    if (is_exist) {
      const UNIQ_CHAR_DB = is_exist.dataValues.uniqchar;

      // THIS CONDITION IS HANDLING SAME GENERATED SHRINKED URL AND GENERATE IT AGAIN
      if (shrinkedURL[0] === UNIQ_CHAR_DB) {
        shrinkedURL = ShrinkMyLongURLPlease(URL_ORI);
      }

      // regular expression to get "domain.xyz" from "http(s)://domain.xyz"
      const REGEX_DOMAIN = /\w+\.\w{2,}$/;

      // return "domain.xyz" only from "http(s)://domain.xyz"
      const DOMAIN_ONLY_BODY = shrinkedURL[1].match(REGEX_DOMAIN)[0];

      // get domain data from database by params of original URL in variable 'is_exist'
      const DOMAIN_DB = is_exist.dataValues.domain;

      /**
       * THIS CONDITION IS HANDLING SAME DOMAIN AND ITS PARAMS FROM BODY
       * IDENTICAL URL FROM BODY AND DATABASE WILL USE EXISTING SHRINKED URL IN DATABASE
       
       * DOMAIN_DB.includes(DOMAIN_ONLY_BODY) ==> Check same string domain name in DB and from body
       * is_exist.dataValues.params === shrinkedURL[2] ==> Check same unique original url params from body
       */
      if (
        DOMAIN_DB.includes(DOMAIN_ONLY_BODY) &&
        is_exist.dataValues.params === shrinkedURL[2]
      ) {
        return res.status(200).send({
          code: 200,
          codeMessage: "OK",
          success: true,
          message:
            "Identical URL found in DB, please use this existing shrinked URL",
          urlOri: URL_ORI,
          urlShrinked: is_exist.dataValues.uniqchar,
        });
      }
    }

    // Create data to database
    await User_URL.create({
      domain: shrinkedURL[1],
      params: shrinkedURL[2],
      uniqchar: shrinkedURL[0],
    });

    return res.status(200).send({
      code: 200,
      codeMessage: "OK",
      success: true,
      message: "Here it is your new shrinked URL",
      urlOri: URL_ORI,
      urlShrinked: shrinkedURL[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      codeMessage: "Internal Server Error",
      success: false,
    });
  }
};
