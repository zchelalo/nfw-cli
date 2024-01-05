import { program } from 'commander'
import { spawn } from 'child_process'

program.command('run:project')
.description('ejecuta los contenedores de docker para poner a funcionar el proyecto')
.action(() => {
  const dockerComposeProcess = spawn('docker', ['compose', 'up', '--build'])

  // Manejar la salida estándar
  dockerComposeProcess.stdout.on('data', (data) => {
    console.log(`${data}`)
  })

  dockerComposeProcess.stderr.on('data', (data) => {
    console.error(`${data}`)
  })

  // Manejar el cierre del proceso
  dockerComposeProcess.on('close', (code) => {
    if (code === 0) {
      console.log('Contenedores de Docker ejecutados exitosamente.')
    } else {
      console.error(`Código de salida: ${code}`)
    }
  })

  // Manejar la señal SIGINT (Ctrl+C)
  process.on('SIGINT', () => {
    console.log('Deteniendo los contenedores de Docker...')

    const dockerComposeDownProcess = spawn('docker', ['compose', 'down'])

    dockerComposeProcess.stdout.on('data', (data) => {
      console.log(`${data}`)
    })
    dockerComposeProcess.stderr.on('data', (data) => {
      console.error(`${data}`)
    })

    dockerComposeDownProcess.on('close', (downCode) => {
      if (downCode === 0) {
        console.log('Contenedores de Docker detenidos correctamente.')
        process.exit(0)
      } else {
        console.error(`Error al detener los contenedores de Docker. Código de salida: ${downCode}`)
        process.exit(1)
      }
    })
  })
})

export { program }