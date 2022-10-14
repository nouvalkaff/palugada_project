export async function doItNow(req, res) {
  try {
    const URL_ORI = req.body.url_ori;

    console.log(URL_ORI, "URL_ORI");

    return res.status(200).send({
      code: 200,
      codeMessage: "OK",
      success: true,
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
