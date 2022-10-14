export async function doItNow(req, res) {
  try {
  } catch (error) {
    console.error(error);
    return res.status.send({
      code: 500,
      codeMessage: "Internal Server Error",
      success: false,
    });
  }
}
