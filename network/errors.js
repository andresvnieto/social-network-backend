import response from "./response.js";

export default function errors(err, req, res, next) {
  console.error("Error", error);
  const message = err.message || "Error interno";
  const status = err.statusCode;

  response.error(req, res, message, status);
}
