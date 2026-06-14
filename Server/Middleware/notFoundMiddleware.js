import { StatusCodes } from "http-status-codes";

/*
=================================
NOT FOUND MIDDLEWARE
=================================
Handles unknown routes.
=================================
*/

function notFoundMiddleware(req, res) {
  return res.status(StatusCodes.NOT_FOUND).json({
    message: "Route not found",
  });
}

export default notFoundMiddleware;
