import { Router } from "express";
import pokeModel from "../models/pokemon.model.js";
const router = Router()


router.get('/', async (req, res) => {
    const pokemons = await pokeModel.find().lean()
    // console.log(pokemons);
    res.render('index', {pokemons})
})

router.get('/:name', (req,res)=>{
    res.render('descriptionPokemon', {})
})

// export default router
export { router as pokeViews }