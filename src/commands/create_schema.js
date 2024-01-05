import { program } from 'commander'
import path from 'path'
import { verificarExistenciaArchivo, crearArchivo } from '../utils/index.js'

program.command('create:schema')
.description('crea un schema de javascript con JOI según el nombre dado')
.argument('<nombreSchema>', 'nombre del schema a crear')
.action(async (nombreSchema) => {
  try {
    await crearSchema(nombreSchema)
  } catch (error) {
    console.error('Error: ', error)
    return
  }
})

async function crearSchema(nombreSchema){
  const rutaSchemas = path.join('./src', 'schemas')
  const rutaNuevoArchivo = path.join(rutaSchemas, `${nombreSchema}.schema.js`)
  try {
    if (await verificarExistenciaArchivo(rutaNuevoArchivo)){
      console.error(`El archivo ${rutaNuevoArchivo} ya existe.`)
      return
    }
  } catch (error) {
    console.error('Error:', error.message)
    return
  }

  const nombreSchemaPrimeraMayuscula = `${nombreSchema.charAt(0).toUpperCase()}${nombreSchema.slice(1)}`
  const schema =
`import Joi from 'joi'

const id = Joi.number().integer()
const nombre = Joi.string()

const create${nombreSchemaPrimeraMayuscula}Schema = Joi.object({
  nombre: nombre.required()
})

const update${nombreSchemaPrimeraMayuscula}Schema = Joi.object({
  nombre
})

const get${nombreSchemaPrimeraMayuscula}Schema = Joi.object({
  id: id.required()
})

export { create${nombreSchemaPrimeraMayuscula}Schema, update${nombreSchemaPrimeraMayuscula}Schema, get${nombreSchemaPrimeraMayuscula}Schema }`

  try {
    await crearArchivo(rutaNuevoArchivo, schema)
  } catch (error) {
    console.error('Error:', error.message)
    return
  }
}

export { program, crearSchema }