import { program } from 'commander'
import inquirer from 'inquirer'

const prompt = inquirer.createPromptModule()

program.command('test <nombre> <descripcion>').action((nombre, descripcion) => {
  console.info('Probando...')
  console.info(nombre)
  console.info(descripcion)
})

program.command('test2').action(async () => {
  const responses = await prompt([
    {
      type: 'input',
      message: 'Escribe un nombre',
      name: 'nombre'
    },
    {
      type: 'input',
      message: 'Escribe una descripcion',
      name: 'descripcion'
    }
  ])

  console.log(responses)
  console.log(responses.nombre)
  console.log(responses.descripcion)
})

export { program }