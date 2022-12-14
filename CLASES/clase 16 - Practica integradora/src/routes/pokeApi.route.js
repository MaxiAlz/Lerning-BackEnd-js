import { Router } from "express";
import pokeModel from "../models/pokemon.model.js";

const router = Router()

router.get('/', async (req, res) => {
    const pokemons = await pokeModel.find()

    res.json(pokemons)
})

router.post('/', async (req, res) => {
    const result = await pokeModel.create(req.body)
    res.json({ success: "created", result: result })
})
// export default router
export { router as pokeRouter }