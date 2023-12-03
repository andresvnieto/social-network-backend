import jwt from "jsonwebtoken";
import config from "../config.js";
import error from "../utils/error.js";

export async function sign(data) {
  return jwt.sign(data, config.jwt.secret);
}

export async function checkToken(req, owner) {
  const decoded = await decodeHeader(req);
  if (decoded.id !== owner) {
    throw error("No puedes hacer esto", 401);
  }
}

function verify(token) {
  return jwt.verify(token, config.jwt.secret);
}

function getToken(auth) {
  if (!auth) {
    throw error("No viene token", 401);
  }
  if (auth.indexOf("Bearer ") === -1)
    throw error("Formato de token inválido", 401);
  let token = auth.replace("Bearer ", "");
  return token;
}

async function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);
  req.user = decoded;
  return decoded;
}

const auth = {
  sign,
  checkToken,
  decodeHeader,
};

export default auth;
