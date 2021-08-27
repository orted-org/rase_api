import makeError from "http-errors";
function coatError(err: any) {
  if (err.status) return err;
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError")
    return new makeError.Unauthorized();
  return new makeError.InternalServerError();
}

export { makeError, coatError };
