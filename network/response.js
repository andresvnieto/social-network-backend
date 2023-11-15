function success(req, res, message, status) {
  let statusCode = status || 500;
  let statusMessage = message || "";
  res.status(status).send({
    error: false,
    status: statusCode,
    body: statusMessage,
  });
}

function error(req, res, message, status) {
  let statusCode = status || 500;
  let statusMessage = message || "Internal server error";
  res.status(statusCode).send({
    error: true,
    status: statusCode,
    body: statusMessage,
  });
}

const response = {
  success,
  error,
};

export default response;
