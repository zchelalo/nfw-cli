import { program } from 'commander'
import path from 'path'
import { verificarExistenciaArchivo, crearArchivo } from '../utils/index.js'

program.command('create:service')
.description('crea un router de javascript con express según el nombre dado')
.argument('<nombreRouter>', 'nombre del router a crear')
.action(async (nombreRouter) => {
  try {
    await crearRouter(nombreRouter)
  } catch (error) {
    console.error('Error: ', error)
    return
  }
})

async function crearRouter(nombreRouter){
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
  const router =
``

  try {
    await crearArchivo(rutaNuevoArchivo, router)
  } catch (error) {
    console.error('Error:', error.message)
    return
  }
}

export { program, crearRouter }