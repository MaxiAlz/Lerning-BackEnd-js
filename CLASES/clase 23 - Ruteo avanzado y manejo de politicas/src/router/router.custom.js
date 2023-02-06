import { Router } from "express";

export default class Router {
  constructor() {
    this.router = Router()
    this.init()
  }

  getRouter() {
    return this.router
  }

  init() { }

  get(path, ...callbacks) {
    this.router.get(path, this.applyCallbacks(callbacks))
  }

  applyCallbacks(callbacks) {
    return callbacks.map(callback => async (...params) => {
      try {
        //params (req,res,next)
        //apply apunta directamente a la funcion callback
        //this es para que se utilice en el contexto de la clase router
        await callback.apply(this, params)
      } catch (error) {
        console.log(error);
        params[1].status(500).send(error)
      }
    })
  }

  handlePolicies = polices => (req,res,next)=>{
    if(polices.include('PUBLIC ')) return next()

    if(polices.includes('USER') || polices.includes('ADMIN')){
      const authHeaders = req.headers.autorizaion
      

    }
    if(!authHeaders)
    next()
  }
}

