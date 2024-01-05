import { program } from 'commander'
import path from 'path'
import plural from 'pluralize-es'
import { verificarExistenciaArchivo, crearArchivo } from '../utils/index.js'
import { crearMigracion } from './create_migration.js'

program.command('create:model')
.description('crea un modelo de javascript según el nombre dado')
.argument('<nombreModelo>', 'nombre del modelo a crear')
.option('-m, --migration', 'si se utiliza esta flag se creará la migración del modelo creado')
.option('-s, --schema', 'si se utiliza esta flag se creará el schema del modelo creado')
.option('-r, --router', 'si se utiliza esta flag se creará el router del modelo creado')
.option('-se, --service', 'si se utiliza esta flag se creará el servicio del modelo creado')
.option('-a, --all', 'si se utiliza esta flag se crearan todos los recursos necesarios para el modelo (migration, schema, router, service)')
.action(async (nombreModelo, options) => {
  const rutaModelos = path.join('./src', 'database', 'models')
  const rutaNuevoArchivo = path.join(rutaModelos, `${nombreModelo}.model.js`)
  try {
    if (await verificarExistenciaArchivo(rutaNuevoArchivo)){
      console.error(`El archivo ${rutaNuevoArchivo} ya existe.`)
      return
    }
  } catch (error) {
    console.error('Error:', error.message)
    return
  }

  const nombreModeloMayusculas = nombreModelo.toUpperCase()
  const nombreModeloPrimeraMayuscula = `${nombreModelo.charAt(0).toUpperCase()}${nombreModelo.slice(1)}`
  const modelo = 
`import { Model, DataTypes, Sequelize } from 'sequelize'

const ${nombreModeloMayusculas}_TABLE = '${plural(nombreModelo)}'

const ${nombreModeloPrimeraMayuscula}Schema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW
  }
}

class ${nombreModeloPrimeraMayuscula} extends Model {
  static associate(models){
    
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ${nombreModeloMayusculas}_TABLE,
      modelName: '${nombreModeloPrimeraMayuscula}',
      timestamps: true
    }
  }
}

export { ${nombreModeloMayusculas}_TABLE, ${nombreModeloPrimeraMayuscula}Schema, ${nombreModeloPrimeraMayuscula} }`

  try {
    await crearArchivo(rutaNuevoArchivo, modelo)
  } catch (error) {
    console.error('Error:', error.message)
    return
  }

  if (options.migration){
    try {
      await crearMigracion(nombreModelo)
    } catch (error) {
      console.error('Error: ', error)
      return
    }
  }

  if (options.schema){
    console.log('Crear schema')
  }

  if (options.router){
    console.log('Crear router')
  }

  if (options.router){
    console.log('Crear router')
  }

  if (options.service){
    console.log('Crear servicio')
  }

  if (options.all){
    console.log('Crear todos los recursos')
  }
})

export { program }