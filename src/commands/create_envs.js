import { program } from 'commander'
import path from 'path'
import { validarYCopiarArchivo } from '../utils/index.js'

program.command('create:envs')
.description('crea los archivos de entorno en caso de que no existan')
.action(async () => {
  const rutaFlywayConfExample = path.join('./src', 'database', 'migrations', 'conf', 'flyway.conf.example')
  const rutaFlywayConf = path.join('./src', 'database', 'migrations', 'conf', 'flyway.conf')
  try {
    await validarYCopiarArchivo(rutaFlywayConfExample, rutaFlywayConf)
  } catch (error) {
    console.error('Error:', error.message)
    return
  }

  const rutaEnvExample = path.join('./.env.example')
  const rutaEnv = path.join('./.env')
  try {
    await validarYCopiarArchivo(rutaEnvExample, rutaEnv)
  } catch (error) {
    console.error('Error:', error.message)
    return
  }
})

export { program }