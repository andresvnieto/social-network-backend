import express from "express";
import config from "../config.js";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger.js";
import errors from "../network/errors.js";

import { router as routerUser } from "./components/user/network.js";
import { router as routerAuth } from "./components/auth/network.js";

const app = express();

app.use(express.json());

// ROUTER
app.use("/api/user", routerUser);
app.use("/api/auth", routerAuth);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(errors);

app.listen(config.api.port, () => {
  console.log("Api escuchando en el puerto: " + config.api.port);
});
