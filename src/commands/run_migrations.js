import { program } from 'commander'
import { exec } from 'child_process'
import path from 'path'

program.command('run:migrations')
.description('ejecuta todas las migraciones creadas con flyway')
.action(() => {
  const rutaArchivo = path.join('./src', 'database', 'migrations', 'conf', 'run_migrations.sh')

  exec(`chmod +x ${rutaArchivo}`, (errorChmod) => {
    if (errorChmod) {
      console.error(`Error al asignar permisos de ejecución: ${errorChmod}`)
      return
    }
  
    exec(`bash ${rutaArchivo}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar el archivo Bash: ${error}`)
        return
      }

      console.info(`Salida estándar: ${stdout}`)
      console.error(`Salida de error: ${stderr}`)
    })
  })
})

export { program }