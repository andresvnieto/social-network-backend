import express from "express";
import checkAuth from "./secure.js";
import response from "../../../network/response.js";
import User from "./index.js";

export const router = express.Router();

//Routes
router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
router.put("/", checkAuth('update'), upsert);
router.delete("/:id", remove);

//Functions
async function list(req, res) {
  try {
    const users = await User.list();
    response.success(req, res, users, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
}

async function get(req, res) {
  try {
    const user = await User.get(req.params.id);
    response.success(req, res, user, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
}

async function upsert(req, res) {
  try {
    const user = await User.upsert(req.body);
    response.success(req, res, user, 201);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
}

async function remove(req, res) {
  try {
    const user = await User.remove(req.params.id);
    response.success(req, res, user, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
}
