import { program } from 'commander'
import path from 'path'
import plural from 'pluralize-es'
import { verificarExistenciaArchivo, crearArchivo } from '../utils/index.js'

program.command('create:router')
.description('crea un router de javascript con express según el nombre dado')
.argument('<nombreRouter>', 'nombre del router a crear')
.option('-c, --crud', 'si se utiliza esta flag se creará el router con todos los métodos básicos (get, get:id, post, patch, delete)')
.action(async (nombreRouter, options) => {
  try {
    await crearRouter(nombreRouter, options.crud)
  } catch (error) {
    console.error('Error: ', error)
    return
  }
})

async function crearRouter(nombreRouter, crud){
  const rutaRoutes = path.join('./src', 'routes')
  const rutaNuevoArchivo = path.join(rutaRoutes, `${nombreRouter}.router.js`)
  try {
    if (await verificarExistenciaArchivo(rutaNuevoArchivo)){
      console.error(`El archivo ${rutaNuevoArchivo} ya existe.`)
      return
    }
  } catch (error) {
    console.error('Error:', error.message)
    return
  }

  const nombreRouterPrimeraMayuscula = `${nombreRouter.charAt(0).toUpperCase()}${nombreRouter.slice(1)}`
  let router = undefined
  if (!crud){
    router =
`import express from 'express'

import { ${nombreRouterPrimeraMayuscula}Service } from '../services/${nombreRouter}.service.js'

const router = express.Router()
const service = new ${nombreRouterPrimeraMayuscula}Service()

router.get('/', async (req, res, next) => {
  try {
    const ${plural(nombreRouter)} = await service.find()
    res.json(${plural(nombreRouter)})
  } catch (error) {
    next(error)
  }
})

export { router }`
  }
  else{
    router =
`import express from 'express'

import { ${nombreRouterPrimeraMayuscula}Service } from '../services/${nombreRouter}.service.js'
import { validatorHandler } from '../middlewares/validator.handler.js'
import { update${nombreRouterPrimeraMayuscula}Schema, create${nombreRouterPrimeraMayuscula}Schema, get${nombreRouterPrimeraMayuscula}Schema } from '../schemas/${nombreRouter}.schema.js'

const router = express.Router()
const service = new ${nombreRouterPrimeraMayuscula}Service()

router.get('/', async (req, res, next) => {
  try {
    const ${plural(nombreRouter)} = await service.find()
    res.json(${plural(nombreRouter)})
  } catch (error) {
    next(error)
  }
})

router.get('/:id', validatorHandler(get${nombreRouterPrimeraMayuscula}Schema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const ${nombreRouter} = await service.findOne(id)
    res.json(${nombreRouter})
  } catch (error) {
    next(error)
  }
})

router.post('/', validatorHandler(create${nombreRouterPrimeraMayuscula}Schema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const new${nombreRouterPrimeraMayuscula} = await service.create(body)
    res.status(201).json(new${nombreRouterPrimeraMayuscula})
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', validatorHandler(get${nombreRouterPrimeraMayuscula}Schema, 'params'), validatorHandler(update${nombreRouterPrimeraMayuscula}Schema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const ${nombreRouter} = await service.update(id, body)
    res.json(${nombreRouter})
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', validatorHandler(get${nombreRouterPrimeraMayuscula}Schema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    await service.delete(id)
    res.status(201).json({id})
  } catch (error) {
    next(error)
  }
})

export { router }`
  }
  
  try {
    await crearArchivo(rutaNuevoArchivo, router)
  } catch (error) {
    console.error('Error:', error.message)
    return
  }
}

export { program, crearRouter }