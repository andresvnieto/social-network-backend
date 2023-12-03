import express from "express";
import response from "../../../network/response.js";
import Auth from "./index.js";
export const router = express.Router();

router.post("/login", function (req, res) {
  Auth.login(req.body.username, req.body.password)
    .then((token) => {
        response.success(req, res, token, 200)
    })
    .catch(error=>{
        console.log(error);
        response.error(req, res, 'Información inválida', 400)
    });

});

