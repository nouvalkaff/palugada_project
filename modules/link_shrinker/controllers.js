import { ShrinkMyLongURLPlease } from "./helper_function.js";

export async function doItNow(req, res) {
  try {
    const URL_ORI = req.body.url_ori;

    const SHRINKED_URL = ShrinkMyLongURLPlease(URL_ORI);

    return res.status(200).send({
      code: 200,
      codeMessage: "OK",
      success: true,
      urlOri: URL_ORI,
      urlShrinked: SHRINKED_URL,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      codeMessage: "Internal Server Error",
      success: false,
    });
  }
}
