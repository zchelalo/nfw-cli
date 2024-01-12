import { program } from 'commander'
import inquirer from 'inquirer'
import fs from 'fs/promises'
import path from 'path'

const prompt = inquirer.createPromptModule()

program.command('init').description('crea la estructura inicial de un proyecto con NFW').action(async () => {
  const responses = await prompt([
    {
      type: 'input',
      message: '¿Cómo se llamará el proyecto?',
      name: 'project_name'
    },
    {
      type: 'input',
      message: '¿Cómo se llamará la base de datos?',
      name: 'db_name'
    }
  ])

  const project_name = responses.project_name.replace(/\s/g, '_')
  const db_name = responses.db_name.replace(/\s/g, '_').replace(/-/g, '_')
  
  // CREANDO LA CARPETA DEL PROYECTO
  // CREANDO LA CARPETA DEL PROYECTO
  // CREANDO LA CARPETA DEL PROYECTO
  if (!await verificarExistenciaDeCarpeta(project_name)) return
  try {
    await crearCarpeta(project_name)
  } catch (error) {
    console.error(error)
    return
  }

  // ARCHIVOS DENTRO DE LA CARPETA RAÍZ
  // ARCHIVOS DENTRO DE LA CARPETA RAÍZ
  // ARCHIVOS DENTRO DE LA CARPETA RAÍZ
  try {
    await crearDockerfile(project_name)
    await crearDockerCompose(project_name, db_name)
    await crearDockerignore(project_name)
    await crearPackageJson(project_name)
    await crearReadme(project_name)
    await crearGitignore(project_name)
    await crearEnvExample(project_name)
    await crearEnv(project_name, db_name)
  } catch (error) {
    console.error('Error:', error.message)
  }

  // ARCHIVOS DENTRO DE SRC
  // ARCHIVOS DENTRO DE SRC
  // ARCHIVOS DENTRO DE SRC
  const src = path.join(project_name, 'src')
  try {
    await crearCarpeta(src)
    await crearIndex(src)
  } catch (error) {
    console.error(error)
    return
  }

  // CREANDO SRC/CONFIG Y SUS ARCHIVOS
  const config = path.join(src, 'config')
  try {
    await crearCarpeta(config)
  } catch (error) {
    console.error(error)
    return
  }

  try {
    await crearConfig(config)
  } catch (error) {
    console.error('Error:', error.message)
  }

  // CREANDO SRC/DATABASE
  const database = path.join(src, 'database')
  try {
    await crearCarpeta(database)
  } catch (error) {
    console.error(error)
    return
  }

  // CREANDO SRC/DATABASE/MIGRATIONS Y SUS ARCHIVOS
  const migrations = path.join(database, 'migrations')
  try {
    await crearCarpeta(migrations)
  } catch (error) {
    console.error(error)
    return
  }

  try {
    await crearMigracionUsuarios(migrations)
  } catch (error) {
    console.error('Error:', error.message)
  }

  // CREANDO SRC/DATABASE/MIGRATIONS/CONF Y SUS ARCHIVOS
  const conf = path.join(migrations, 'conf')
  try {
    await crearCarpeta(conf)
  } catch (error) {
    console.error(error)
    return
  }

  try {
    await crearFlywayConfExample(conf)
    await crearFlywayConf(project_name, db_name, conf)
    await crearRunMigrations(project_name, conf)
  } catch (error) {
    console.error('Error:', error.message)
  }

  // CREANDO SRC/DATABASE/MODELS Y SUS ARCHIVOS
  const models = path.join(database, 'models')
  try {
    await crearCarpeta(models)
  } catch (error) {
    console.error(error)
    return
  }

  try {
    await crearModeloUsuario(models)
    await crearModeloIndex(models)
  } catch (error) {
    console.error('Error:', error.message)
  }

  // CREANDO SRC/LIBS Y SUS ARCHIVOS
  const libs = path.join(src, 'libs')
  try {
    await crearCarpeta(libs)
  } catch (error) {
    console.error(error)
    return
  }

  try {
    await crearSequelize(libs)
  } catch (error) {
    console.error('Error:', error.message)
  }

  // CREANDO SRC/MIDDLEWARES Y SUS ARCHIVOS
  const middlewares = path.join(src, 'middlewares')
  try {
    await crearCarpeta(middlewares)
  } catch (error) {
    console.error(error)
    return
  }

  try {
    await crearAuthHandler(middlewares)
    await crearErrorHandler(middlewares)
    await crearValidatorHandler(middlewares)
  } catch (error) {
    console.error('Error:', error.message)
  }

  // CREANDO SRC/ROUTES Y SUS ARCHIVOS
  const routes = path.join(src, 'routes')
  try {
    await crearCarpeta(routes)
  } catch (error) {
    console.error(error)
    return
  }

  try {
    await crearAuthRouter(routes)
    await crearUsuarioRouter(routes)
    await crearIndexRoutes(routes)
  } catch (error) {
    console.error('Error:', error.message)
  }

  // CREANDO SRC/SCHEMAS Y SUS ARCHIVOS
  const schemas = path.join(src, 'schemas')
  try {
    await crearCarpeta(schemas)
  } catch (error) {
    console.error(error)
    return
  }

  try {
    await crearAuthSchema(schemas)
    await crearUsuarioSchema(schemas)
  } catch (error) {
    console.error('Error:', error.message)
  }

  // CREANDO SRC/SERVICES Y SUS ARCHIVOS
  const services = path.join(src, 'services')
  try {
    await crearCarpeta(services)
  } catch (error) {
    console.error(error)
    return
  }

  try {
    await crearAuthService(services)
    await crearUsuarioService(services)
    await crearCorreoService(services)
  } catch (error) {
    console.error('Error:', error.message)
  }

  // CREANDO SRC/UTILS
  const utils = path.join(src, 'utils')
  try {
    await crearCarpeta(utils)
  } catch (error) {
    console.error(error)
    return
  }

  // CREANDO SRC/UTILS/AUTH Y SUS ARCHIVOS
  const auth = path.join(utils, 'auth')
  try {
    await crearCarpeta(auth)
  } catch (error) {
    console.error(error)
    return
  }

  try {
    await crearIndexAuthUtils(auth)
  } catch (error) {
    console.error('Error:', error.message)
  }

  // CREANDO SRC/UTILS/AUTH/STRATEGIES Y SUS ARCHIVOS
  const strategies = path.join(auth, 'strategies')
  try {
    await crearCarpeta(strategies)
  } catch (error) {
    console.error(error)
    return
  }

  try {
    await crearLocalStrategy(strategies)
    await crearJwtStrategy(strategies)
  } catch (error) {
    console.error('Error:', error.message)
  }
})

async function verificarExistenciaDeCarpeta(project_name){
  try {
    await fs.access(project_name, fs.constants.F_OK)
    console.error(`La carpeta ${project_name} ya existe`)
    return false
  } catch (error){
    return true
  }
}

async function crearCarpeta(ruta){
  try {
    await fs.mkdir(ruta)
  } catch (error) {
    throw new Error(`Hubo un error al generar la carpeta "${ruta}": `, error)
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
async function crearDockerfile(project_name){
  const dockerfile = 
`FROM node:20-alpine

WORKDIR /home/node/app

COPY ./package*.json ./
RUN npm install

COPY ./ ./

CMD [ "npm", "run", "dev" ]`
  
  const rutaDockerfile = path.join(project_name, 'Dockerfile')
  try {
    await fs.writeFile(rutaDockerfile, dockerfile)
    return true
  } catch (error) {
    throw error
  }
}

async function crearDockerCompose(project_name, db_name){
  const dockerCompose =
`version: '3.3'

services:

  ${project_name}_app:
    build: ./
    container_name: ${project_name}_app
    tty: true
    ports:
      - 3000:3000
    environment:
      TZ: America/Hermosillo
    volumes:
      - ./:/home/node/app
      - /home/node/app/node_modules
    depends_on:
      ${project_name}_postgres:
        condition: service_healthy
    command: sh -c "npm run dev"

  ${project_name}_postgres:
    image: postgres:15.2
    container_name: ${project_name}_db_postgres
    environment:
      POSTGRES_DB: ${db_name}
      POSTGRES_PASSWORD: example
      TZ: America/Hermosillo
    ports:
      - 5432:5432
    volumes:
      - ./DB/postgresql:/var/lib/postgresql/data
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -U postgres" ]
      interval: 10s
      timeout: 5s
      retries: 5

  adminer:
    image: adminer
    environment:
      TZ: America/Hermosillo
    ports:
      - 8080:8080
    depends_on:
      ${project_name}_postgres:
        condition: service_started`

  const rutaDockerCompose = path.join(project_name, 'docker-compose.yml')
  try {
    await fs.writeFile(rutaDockerCompose, dockerCompose)
    return true
  } catch (error) {
    throw error
  }
}

async function crearDockerignore(project_name){
  const dockerignore =
`DB
node_modules
npm-debug.log`

  const rutaDockerignore = path.join(project_name, '.dockerignore')
  try {
    await fs.writeFile(rutaDockerignore, dockerignore)
    return true
  } catch (error) {
    throw error
  }
}

async function crearPackageJson(project_name){
  const packageJson =
`{
  "name": "${project_name}",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.js",
  "type": "module",
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "lint": "eslint"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^2.0.12"
  },
  "dependencies": {
    "@faker-js/faker": "^7.6.0",
    "@hapi/boom": "^9.1.4",
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.17.1",
    "joi": "^17.4.2",
    "jsonwebtoken": "^9.0.2",
    "nodemailer": "^6.9.8",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "pg": "^8.11.3",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.35.2"
  }
}`

  const rutaPackageJson = path.join(project_name, 'package.json')
  try {
    await fs.writeFile(rutaPackageJson, packageJson)
    return true
  } catch (error) {
    throw error
  }
}

async function crearIndex(ruta){
  const index =
`import express from 'express'
import cors from 'cors'

import { config } from "./config/config.js"
import { routerApi } from './routes/index.js'
import { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } from './middlewares/error.handler.js'

import passport from 'passport'
import './utils/auth/index.js'

const app = express()
const port = config.PORT

app.use(express.json())

const whitelist = ['http://localhost:3000']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options))

app.use(passport.initialize())

routerApi(app)

app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Aplicación ejecutandose en el puerto', port)
})`

  const rutaIndex = path.join(ruta, 'index.js')
  try {
    await fs.writeFile(rutaIndex, index)
    return true
  } catch (error) {
    throw error
  }
}

async function crearReadme(project_name){
  const readme = 
`# ${project_name}  
  
Aplicación desarrollada con NFW (NodeJS Framework)`
  
  const rutaReadme = path.join(project_name, 'README.md')
  try {
    await fs.writeFile(rutaReadme, readme)
    return true
  } catch (error) {
    throw error
  }
}

async function crearGitignore(project_name){
  const gitignore = 
`# Created by https://www.toptal.com/developers/gitignore/api/node,windows,linux,macos
# Edit at https://www.toptal.com/developers/gitignore?templates=node,windows,linux,macos

### Linux ###
*~

# temporary files which can be created if a process still has a handle open of a deleted file
.fuse_hidden*

# KDE directory preferences
.directory

# Linux trash folder which might appear on any partition or disk
.Trash-*

# .nfs files are created when an open file is removed but is still being accessed
.nfs*

### macOS ###
# General
.DS_Store
.AppleDouble
.LSOverride

# Icon must end with two \r
Icon


# Thumbnails
._*

# Files that might appear in the root of a volume
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns
.com.apple.timemachine.donotpresent

# Directories potentially created on remote AFP share
.AppleDB
.AppleDesktop
Network Trash Folder
Temporary Items
.apdisk

### Node ###
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test
.env.production

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next
out

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*

### Windows ###
# Windows thumbnail cache files
Thumbs.db
Thumbs.db:encryptable
ehthumbs.db
ehthumbs_vista.db

# Dump file
*.stackdump

# Folder config file
[Dd]esktop.ini

# Recycle Bin used on file shares
$RECYCLE.BIN/

# Windows Installer files
*.cab
*.msi
*.msix
*.msm
*.msp

# Windows shortcuts
*.lnk

DB

flyway.conf

# End of https://www.toptal.com/developers/gitignore/api/node,windows,linux,macos`
  
  const rutaGitignore = path.join(project_name, '.gitignore')
  try {
    await fs.writeFile(rutaGitignore, gitignore)
    return true
  } catch (error) {
    throw error
  }
}

async function crearEnvExample(project_name){
  const envExample =
`NODE_ENV='dev'
PORT=3000

PG_HOST='localhost'
PG_PORT=5432
PG_USER='postgres'
PG_PASS=''
PG_DB='db'

JWT_SECRET='myJwtSecret'
JWT_RECOVERY_SECRET='myJwtRecoverySecret'

EMAIL_SERVER='smtp.gmail.com'
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER='user@email.com'
EMAIL_PASS='password'`

  const rutaEnvExample = path.join(project_name, '.env.example')
  try {
    await fs.writeFile(rutaEnvExample, envExample)
    return true
  } catch (error) {
    throw error
  }
}

async function crearEnv(project_name, db_name){
  const env =
`NODE_ENV='dev'
PORT=3000

PG_HOST='${project_name}_postgres'
PG_PORT=5432
PG_USER='postgres'
PG_PASS='example'
PG_DB='${db_name}'

JWT_SECRET='myJwtSecret'
JWT_RECOVERY_SECRET='myJwtRecoverySecret'

EMAIL_SERVER='smtp.gmail.com'
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER='user@email.com'
EMAIL_PASS='password'`

  const rutaEnv = path.join(project_name, '.env')
  try {
    await fs.writeFile(rutaEnv, env)
    return true
  } catch (error) {
    throw error
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
async function crearConfig(ruta){
  const config =
`import { config as conf } from 'dotenv'

conf()

const config = {
  ENV: process.env.NODE_ENV || 'dev',
  PORT: process.env.PORT || 3000,
  PG_HOST: process.env.PG_HOST || 'localhost',
  PG_PORT: process.env.PG_PORT || 5432,
  PG_USER: process.env.PG_USER || 'postgres',
  PG_PASS: process.env.PG_PASS || '',
  PG_DB: process.env.PG_DB || 'db',
  JWT_SECRET: process.env.JWT_SECRET || 'mysecret',
  JWT_RECOVERY_SECRET: process.env.JWT_RECOVERY_SECRET || 'myrecoverysecret',
  EMAIL_SERVER: process.env.EMAIL_SERVER,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_SECURE: process.env.EMAIL_SECURE,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS
}

export { config }`

  const rutaConfig = path.join(ruta, 'config.js')
  try {
    await fs.writeFile(rutaConfig, config)
    return true
  } catch (error) {
    throw error
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
async function crearFlywayConfExample(ruta){
  const flywayConfExample =
`flyway.url=jdbc:postgresql://localhost:5432/db
flyway.user=postgres
flyway.password=example
flyway.baselineOnMigrate=false`

  const rutaFlywayConfExample = path.join(ruta, 'flyway.conf.example')
  try {
    await fs.writeFile(rutaFlywayConfExample, flywayConfExample)
    return true
  } catch (error) {
    throw error
  }
}

async function crearFlywayConf(project_name, db_name, ruta){
  const flywayConf =
`flyway.url=jdbc:postgresql://${project_name}_postgres:5432/${db_name}
flyway.user=postgres
flyway.password=example
flyway.baselineOnMigrate=false`

  const rutaFlywayConf = path.join(ruta, 'flyway.conf')
  try {
    await fs.writeFile(rutaFlywayConf, flywayConf)
    return true
  } catch (error) {
    throw error
  }
}

async function crearRunMigrations(project_name, ruta){
  const runMigrations =
`#!/bin/bash

docker run --rm \
  -v $PWD/src/database/migrations:/flyway/sql \
  -v $PWD/src/database/migrations/conf/flyway.conf:/flyway/conf/flyway.conf \
  --network=${project_name}_default \
  redgate/flyway migrate`

  const rutaRunMigrations = path.join(ruta, 'run_migrations.sh')
  try {
    await fs.writeFile(rutaRunMigrations, runMigrations)
    return true
  } catch (error) {
    throw error
  }
}

async function crearMigracionUsuarios(ruta){
  const migracion =
`CREATE TABLE "usuarios" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "nombre" varchar(255) NOT NULL,
  "correo" varchar(255) UNIQUE NOT NULL,
  "password" text NOT NULL,
  "recovery_token" VARCHAR(255),
  "rol" VARCHAR(50) NOT NULL DEFAULT ('invitado'),
  "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);`

  const rutaMigracion = path.join(ruta, 'V1__Add_Table_Usuarios.sql')
  try {
    await fs.writeFile(rutaMigracion, migracion)
    return true
  } catch (error) {
    throw error
  }
}

async function crearModeloUsuario(ruta){
  const modeloUsuario =
`import { Model, DataTypes, Sequelize } from 'sequelize'
import bcrypt from 'bcrypt'

const USUARIO_TABLE = 'usuarios'

const UsuarioSchema = {
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
  correo: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  recoveryToken: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'recovery_token'
  },
  rol: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'invitado'
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

class Usuario extends Model {
  static associate(models){
    
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: USUARIO_TABLE,
      modelName: 'Usuario',
      timestamps: true,
      hooks: {
        beforeCreate: async (usuario, options) => {
          const password = await bcrypt.hash(usuario.password, 10)
          usuario.password = password
        },
        beforeUpdate: async (usuario, options) => {
          // Verifica si la contraseña ha sido modificada antes de hacer el hash nuevamente
          if (usuario.changed('password')) {
            const password = await bcrypt.hash(usuario.password, 10)
            usuario.password = password
          }
        }
      }
    }
  }
}

export { USUARIO_TABLE, UsuarioSchema, Usuario }`

  const rutaModeloUsuario = path.join(ruta, 'usuario.model.js')
  try {
    await fs.writeFile(rutaModeloUsuario, modeloUsuario)
    return true
  } catch (error) {
    throw error
  }
}

async function crearModeloIndex(ruta){
  const modeloIndex =
`import { Usuario, UsuarioSchema } from './usuario.model.js'

function setupModels(sequelize){
  Usuario.init(UsuarioSchema, Usuario.config(sequelize))

  // Usuario.associate(sequelize.models)
}

export { setupModels }`

  const rutaModeloIndex = path.join(ruta, 'index.js')
  try {
    await fs.writeFile(rutaModeloIndex, modeloIndex)
    return true
  } catch (error) {
    throw error
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
async function crearSequelize(ruta){
  const sequelize =
`import { Sequelize } from "sequelize"
import { config } from "../config/config.js"
import { setupModels } from "../database/models/index.js"

const PG_USER = encodeURIComponent(config.PG_USER)
const PG_PASS = encodeURIComponent(config.PG_PASS)
const URI = \`postgres://\${PG_USER}:\${PG_PASS}@\${config.PG_HOST}:\${config.PG_PORT}/\${config.PG_DB}\`

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: (str) => {
    console.log(str)
  }
})

setupModels(sequelize)

export { sequelize }`

  const rutaSequelize = path.join(ruta, 'sequelize.js')
  try {
    await fs.writeFile(rutaSequelize, sequelize)
    return true
  } catch (error) {
    throw error
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
async function crearAuthHandler(ruta){
  const authHandler =
`import boom from '@hapi/boom'

function checkRoles(...roles){
  return (req, res, next) => {
    const usuario = req.user
    if (roles.includes(usuario.rol)){
      next()
    }
    else{
      next(boom.unauthorized())
    }
  }
}

export { checkRoles }`

  const rutaAuthHandler = path.join(ruta, 'auth.handler.js')
  try {
    await fs.writeFile(rutaAuthHandler, authHandler)
    return true
  } catch (error) {
    throw error
  }
}

async function crearErrorHandler(ruta){
  const errorHandler =
`import { ValidationError } from 'sequelize'

function logErrors (err, req, res, next) {
  console.error(err)
  next(err)
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  })
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError){
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    })
  }

  next(err)
}

export { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }`

  const rutaErrorHandler = path.join(ruta, 'error.handler.js')
  try {
    await fs.writeFile(rutaErrorHandler, errorHandler)
    return true
  } catch (error) {
    throw error
  }
}

async function crearValidatorHandler(ruta){
  const validatorHandler =
`import boom from '@hapi/boom'

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property]
    const { error } = schema.validate(data, { abortEarly: false })
    if (error) {
      next(boom.badRequest(error))
    }
    next()
  }
}

export { validatorHandler }`

  const rutaValidatorHandler = path.join(ruta, 'validator.handler.js')
  try {
    await fs.writeFile(rutaValidatorHandler, validatorHandler)
    return true
  } catch (error) {
    throw error
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
async function crearAuthRouter(ruta){
  const authRouter =
`import express from 'express'
import passport from 'passport'
import { validatorHandler } from '../middlewares/validator.handler.js'
import { loginSchema, recoverySchema, changePasswordSchema } from '../schemas/auth.schema.js'
import { AuthService } from '../services/auth.service.js'
import { CorreoService } from '../services/correo.service.js'

const router = express.Router()
const service = new AuthService()
const correoService = new CorreoService()

router.post('/login', validatorHandler(loginSchema, 'body'), passport.authenticate('local', { session: false }), async (req, res, next) => {
  try {
    const token = await service.signToken(req.user)

    res.json({ 'token': token })
  } catch (error) {
    next(error)
  }
})

router.post('/recuperar', validatorHandler(recoverySchema, 'body'), async (req, res, next) => {
  try {
    const { correo } = req.body
    const respuesta = await correoService.sendRecovery(correo)
    res.json(respuesta)
  } catch (error) {
    next(error)
  }
})

router.post('/cambiar-password', validatorHandler(changePasswordSchema, 'body'), async (req, res, next) => {
  try {
    const { token, newPassword } = req.body
    const respuesta = await service.changePassword(token, newPassword)
    res.json(respuesta)
  } catch (error) {
    next(error)
  }
})

export { router }`

  const rutaAuthRouter = path.join(ruta, 'auth.router.js')
  try {
    await fs.writeFile(rutaAuthRouter, authRouter)
    return true
  } catch (error) {
    throw error
  }
}

async function crearUsuarioRouter(ruta){
  const usuarioRouter =
`import express from 'express'

import { UsuarioService } from '../services/usuario.service.js'
import { validatorHandler } from '../middlewares/validator.handler.js'
import { updateUsuarioSchema, createUsuarioSchema, getUsuarioSchema } from '../schemas/usuario.schema.js'

const router = express.Router()
const service = new UsuarioService()

router.get('/', async (req, res, next) => {
  try {
    const usuarios = await service.find()
    res.json(usuarios)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', validatorHandler(getUsuarioSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const usuario = await service.findOne(id)
    res.json(usuario)
  } catch (error) {
    next(error)
  }
})

router.post('/', validatorHandler(createUsuarioSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const newUsuario = await service.create(body)
    res.status(201).json(newUsuario)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', validatorHandler(getUsuarioSchema, 'params'), validatorHandler(updateUsuarioSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const usuario = await service.update(id, body)
    res.json(usuario)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', validatorHandler(getUsuarioSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    await service.delete(id)
    res.status(201).json({id})
  } catch (error) {
    next(error)
  }
})

export { router }`

  const rutaUsuarioRouter = path.join(ruta, 'usuario.router.js')
  try {
    await fs.writeFile(rutaUsuarioRouter, usuarioRouter)
    return true
  } catch (error) {
    throw error
  }
}

async function crearIndexRoutes(ruta){
  const index =
`import express from 'express'
import passport from 'passport'

import { checkRoles } from '../middlewares/auth.handler.js'

import { router as authRouter } from './auth.router.js'
import { router as usuarioRouter } from './usuario.router.js'

function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/auth', authRouter)
  router.use('/usuarios', passport.authenticate('jwt', { session: false }), usuarioRouter)
}

export { routerApi }`

  const rutaIndex = path.join(ruta, 'index.js')
  try {
    await fs.writeFile(rutaIndex, index)
    return true
  } catch (error) {
    throw error
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
async function crearAuthSchema(ruta){
  const authSchema =
`import Joi from 'joi'

const correo = Joi.string().email()
const password = Joi.string().min(8)
const token = Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
const newPassword = Joi.string().min(8)

const loginSchema = Joi.object({
  correo: correo.required(),
  password: password.required()
})

const recoverySchema = Joi.object({
  correo: correo.required()
})

const changePasswordSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required()
})

export { loginSchema, recoverySchema, changePasswordSchema }
`

  const rutaAuthSchema = path.join(ruta, 'auth.schema.js')
  try {
    await fs.writeFile(rutaAuthSchema, authSchema)
    return true
  } catch (error) {
    throw error
  }
}

async function crearUsuarioSchema(ruta){
  const usuarioSchema =
`import Joi from 'joi'

const id = Joi.number().integer()
const correo = Joi.string().email()
const password = Joi.string().min(8)
const rol = Joi.string().min(5)

const createUsuarioSchema = Joi.object({
  correo: correo.required(),
  password: password.required(),
  rol: rol.required()
})

const updateUsuarioSchema = Joi.object({
  correo: correo,
  rol: rol,
})

const getUsuarioSchema = Joi.object({
  id: id.required(),
})

export { createUsuarioSchema, updateUsuarioSchema, getUsuarioSchema }`

  const rutaUsuarioSchema = path.join(ruta, 'usuario.schema.js')
  try {
    await fs.writeFile(rutaUsuarioSchema, usuarioSchema)
    return true
  } catch (error) {
    throw error
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
async function crearAuthService(ruta){
  const authService =
`import boom from '@hapi/boom'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { config } from '../config/config.js'
import { UsuarioService } from './usuario.service.js'

const service = new UsuarioService()

class AuthService {
  constructor(){}

  async getUsuario(correo, password) {
    const usuario = await service.findByCorreo(correo)

    if (!usuario){
      throw boom.unauthorized()
    }

    const passwordValida = await bcrypt.compare(password, usuario.password)

    if (!passwordValida){
      throw boom.unauthorized()
    }

    delete usuario.dataValues.password
    return usuario
  }

  async signToken(usuario){
    const payload = {
      sub: usuario.id,
      role: usuario.rol
    }
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '2h' })
    return token
  }

  async changePassword(token, newPassword){
    try {
      const payload = jwt.verify(token, config.JWT_RECOVERY_SECRET)
      const usuario = await service.findOneWithRecovery(payload.sub)
      if (usuario.recoveryToken !== token){
        throw boom.unauthorized()
      }
      const usuarioUpdated = await service.update(usuario.id, { recoveryToken: null, password: newPassword })
      return { message: 'Contraseña actualizada correctamente' }
    } catch (error) {
      throw boom.unauthorized()
    }
  }

}

export { AuthService }`

  const rutaAuthService = path.join(ruta, 'auth.service.js')
  try {
    await fs.writeFile(rutaAuthService, authService)
    return true
  } catch (error) {
    throw error
  }
}

async function crearUsuarioService(ruta){
  const usuarioService =
`import boom from '@hapi/boom'

import { sequelize } from '../libs/sequelize.js'

const UsuarioModel = sequelize.models.Usuario

class UsuarioService {
  constructor(){}

  async create(data) {
    const newUsuario = await UsuarioModel.create(data)
    delete newUsuario.dataValues.password

    return newUsuario
  }

  async find() {
    const response = await UsuarioModel.findAll({
      // include: ['customer'],
      // attributes: ['id', 'email', 'role', 'createdAt']
      attributes: { exclude: ['password', 'recoveryToken'] }
    })
    return response
  }

  async findOne(id) {
    const usuario = await UsuarioModel.findByPk(id, {
      attributes: { exclude: ['password', 'recoveryToken'] }
    })
    if (!usuario){
      throw boom.notFound('Usuario no encontrado')
    }
    return usuario
  }

  async findOneWithRecovery(id) {
    const usuario = await UsuarioModel.findByPk(id, {
      attributes: { exclude: ['password'] }
    })
    if (!usuario){
      throw boom.notFound('Usuario no encontrado')
    }
    return usuario
  }

  async findByCorreo(correo) {
    const usuario = await UsuarioModel.findOne({
      where: { correo }
    })
    return usuario
  }

  async update(id, changes) {
    const usuario = await this.findOne(id)
    const response = await usuario.update(changes)
    return response
  }

  async delete(id) {
    const usuario = await this.findOne(id)
    await usuario.destroy()
    return { id }
  }
}

export { UsuarioService }`

  const rutaUsuarioService = path.join(ruta, 'usuario.service.js')
  try {
    await fs.writeFile(rutaUsuarioService, usuarioService)
    return true
  } catch (error) {
    throw error
  }
}

async function crearCorreoService(ruta){
  const correoService =
`import boom from '@hapi/boom'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

import { config } from '../config/config.js'
import { UsuarioService } from './usuario.service.js'

const service = new UsuarioService()

class CorreoService {
  constructor(){}

  async sendRecovery(correo){
    const usuario = await service.findByCorreo(correo)

    if (!usuario){
      throw boom.unauthorized()
    }

    const payload = { sub: usuario.id }
    const token = jwt.sign(payload, config.JWT_RECOVERY_SECRET, { expiresIn: '10m' })
    const link = \`http://myfrontend.com/recuperar?\${token}\`

    const usuarioUpdated = await service.update(usuario.id, { recoveryToken: token })

    let info = {
      from: \`"Aplicación" <\${config.EMAIL_USER}>\`, // sender address
      to: \`\${usuario.correo}\`, // list of receivers
      subject: "Correo de recuperación de contraseña", // Subject line
      html: \`<b>Recupere su contraseña ingresando al siguiente link</b><br /><a href="\${link}">Recovery</a>\`, // html body
    }

    const respuesta = await this.sendCorreo(info)
    return respuesta
  }

  async sendCorreo(infoCorreo){
    const transporter = nodemailer.createTransport({
      host: config.EMAIL_SERVER,
      port: config.EMAIL_PORT,
      secure: config.EMAIL_SECURE,
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
      }
    })

    let info = await transporter.sendMail(infoCorreo)

    // console.log("Message sent: %s", info.messageId)
    return { msg: 'Correo enviado' }
  }

}

export { CorreoService }`

  const rutaCorreoService = path.join(ruta, 'correo.service.js')
  try {
    await fs.writeFile(rutaCorreoService, correoService)
    return true
  } catch (error) {
    throw error
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
async function crearIndexAuthUtils(ruta){
  const index =
`import passport from 'passport'
import { LocalStrategy } from './strategies/local.strategy.js'
import { JwtStrategy } from './strategies/jwt.strategy.js'

passport.use(LocalStrategy)
passport.use(JwtStrategy)`

  const rutaIndex = path.join(ruta, 'index.js')
  try {
    await fs.writeFile(rutaIndex, index)
    return true
  } catch (error) {
    throw error
  }
}

async function crearLocalStrategy(ruta){
  const localStrategy =
`import { Strategy } from 'passport-local'
import { AuthService } from '../../../services/auth.service.js'

const service = new AuthService()

const LocalStrategy = new Strategy({ usernameField: 'correo', passwordField: 'password' }, async (correo, password, done) => {
  try {
    const usuario = await service.getUsuario(correo, password)
    done(null, usuario)
  } catch (error) {
    done(error, false)
  }
})

export { LocalStrategy }`

  const rutaLocalStrategy = path.join(ruta, 'local.strategy.js')
  try {
    await fs.writeFile(rutaLocalStrategy, localStrategy)
    return true
  } catch (error) {
    throw error
  }
}

async function crearJwtStrategy(ruta){
  const jwtStrategy =
`import { Strategy, ExtractJwt } from 'passport-jwt'
import { config } from '../../../config/config.js'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload)
})

export { JwtStrategy }`

  const rutaJwtStrategy = path.join(ruta, 'jwt.strategy.js')
  try {
    await fs.writeFile(rutaJwtStrategy, jwtStrategy)
    return true
  } catch (error) {
    throw error
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////

export { program }