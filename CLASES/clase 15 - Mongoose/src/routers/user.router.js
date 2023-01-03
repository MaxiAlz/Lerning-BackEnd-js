// import express from 'express'
import { Router } from "express";
import { userModel } from "../models/user.model.js";

const router = Router()

router.get('/', async (req, res) => {

  try {
    const user = await userModel.find(
      res.send({
        result: "success",
        payload: user
      })
    )
  } catch (error) {
    console.log(error);
  }
})

export default router