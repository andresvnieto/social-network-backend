import express from "express";
import response from "../../../network/response.js";
import User from "./index.js";

export const router = express.Router();

//Routes
router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
router.delete("/:id", remove);

//Functions
function list(req, res) {
  User.list()
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function get(req, res) {
  User.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function upsert(req, res) {
  User.upsert(req.body)
    .then((user) => {
      response.success(req, res, req.body ,201);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function remove(req, res) {
  User.remove(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

