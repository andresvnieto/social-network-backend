import express from "express";
import response from "../../../network/response.js";
import UserController from "./index.js";

export const router = express.Router();

//Routes
router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
router.delete("/:id", remove);

//Functions
function list(req, res) {
  UserController.list()
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function get(req, res) {
  UserController.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function upsert(req, res) {
  let userData = {
    name: "Andrés",
  };
  UserController.upsert(userData)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function remove(req, res) {
  UserController.remove(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}
