import { program } from 'commander'
import path from 'path'
import { verificarExistenciaArchivo, crearArchivo } from '../utils/index.js'

program.command('create:service')
.description('crea un service de javascript con sequelize y boom según el nombre dado')
.argument('<nombreService>', 'nombre del service a crear')
.action(async (nombreService) => {
  try {
    await crearService(nombreService)
  } catch (error) {
    console.error('Error: ', error)
    return
  }
})

async function crearService(nombreService){
  const rutaServices = path.join('./src', 'services')
  const rutaNuevoArchivo = path.join(rutaServices, `${nombreService}.service.js`)
  try {
    if (await verificarExistenciaArchivo(rutaNuevoArchivo)){
      console.error(`El archivo ${rutaNuevoArchivo} ya existe.`)
      return
    }
  } catch (error) {
    console.error('Error:', error.message)
    return
  }

  const nombreServicePrimeraMayuscula = `${nombreService.charAt(0).toUpperCase()}${nombreService.slice(1)}`
  const service =
`import boom from '@hapi/boom'

import { sequelize } from '../libs/sequelize.js'

const ${nombreServicePrimeraMayuscula}Model = sequelize.models.${nombreServicePrimeraMayuscula}

class ${nombreServicePrimeraMayuscula}Service {
  constructor(){}

  async create(data) {
    const new${nombreServicePrimeraMayuscula} = await ${nombreServicePrimeraMayuscula}Model.create(data)
    return new${nombreServicePrimeraMayuscula}
  }

  async find() {
    const response = await ${nombreServicePrimeraMayuscula}Model.findAll()
    return response
  }

  async findOne(id) {
    const ${nombreService} = await ${nombreServicePrimeraMayuscula}Model.findByPk(id)
    if (!${nombreService}){
      throw boom.notFound('${nombreServicePrimeraMayuscula} no encontrado')
    }
    return ${nombreService}
  }

  async update(id, changes) {
    const ${nombreService} = await this.findOne(id)
    const response = await ${nombreService}.update(changes)
    return response
  }

  async delete(id) {
    const ${nombreService} = await this.findOne(id)
    await ${nombreService}.destroy()
    return { id }
  }
}

export { ${nombreServicePrimeraMayuscula}Service }`

  try {
    await crearArchivo(rutaNuevoArchivo, service)
  } catch (error) {
    console.error('Error:', error.message)
    return
  }
}

export { program, crearService }