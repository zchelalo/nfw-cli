import fs from 'fs/promises'

async function validarYCopiarArchivo(rutaArchivo, rutaNuevoArchivo){
  try {
    if (!await verificarExistenciaArchivo(rutaArchivo)){
      console.error(`El archivo ${rutaArchivo} no existe.`)
      return
    }

    if (await verificarExistenciaArchivo(rutaNuevoArchivo)){
      console.error(`El archivo ${rutaNuevoArchivo} ya existe.`)
      return
    }

    await copiarArchivo(rutaArchivo, rutaNuevoArchivo)
  } catch (error) {
    throw error
  }
}

async function verificarExistenciaArchivo(ruta){
  try {
    await fs.access(ruta, fs.constants.F_OK)
    return true
  } catch (error) {
    return false
  }
}

async function copiarArchivo(rutaArchivo, rutaNuevoArchivo){
  try {
    const datos = await fs.readFile(rutaArchivo)
    await fs.writeFile(rutaNuevoArchivo, datos)
    return true
  } catch (error) {
    throw error
  }
}

async function crearArchivo(rutaArchivo, datos){
  try {
    await fs.writeFile(rutaArchivo, datos)
  } catch (error) {
    throw error
  }
}

export { validarYCopiarArchivo, verificarExistenciaArchivo, copiarArchivo, crearArchivo }