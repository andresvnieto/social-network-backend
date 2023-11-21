import express from "express";
import { router } from "./components/user/network.js";
import config from "../config.js";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

const app = express();

app.use(express.json());

// ROUTER
app.use("/api/user", router);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(config.api.port, () => {
  console.log("Api escuchando en el puerto: " + config.api.port);
});
