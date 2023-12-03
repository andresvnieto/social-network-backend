import { checkToken } from "../../../auth/index.js";


export default function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case "update":
        const owner = req.body.id;
        checkToken(req, owner);
        next();
        break;
      default:
        next();
    }
  }
  return middleware;
}
