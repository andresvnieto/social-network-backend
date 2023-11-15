import express from "express";
import { router } from "./components/user/network.js";
import config from "../config.js";

const app = express();

app.use(express.json());

// ROUTER
app.use("/api/user", router);

app.listen(config.api.port, () => {
  console.log("Api escuchando en el puerto: " + config.api.port);
});
