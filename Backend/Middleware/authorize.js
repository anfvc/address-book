import createHttpError from "http-errors";

function authorizeRole(authorizedRole) {
  return function (req, res, next) {
    //? This is to check if the user is "admin" or not:
    if (req.user.role !== authorizedRole) {
      return next(
        createHttpError(403, "User is not authorized to perform this action.")
      );
    }

    next();
  };
}
