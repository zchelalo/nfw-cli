#!/usr/bin/env node
import { program } from 'commander'
import * as test from './commands/test.js'
import * as init from './commands/init.js'
import * as create_envs from './commands/create_envs.js'
import * as create_migration from './commands/create_migration.js'
import * as create_model from './commands/create_model.js'
import * as create_router from './commands/create_router.js'
import * as create_schema from './commands/create_schema.js'
import * as create_service from './commands/create_service.js'
import * as run_migrations from './commands/run_migrations.js'
import * as run_project from './commands/run_project.js'

program.version('0.0.1').description('CLI (command line interface) para el desarrollo con NFW (NodeJS Framework)')
program.parse(process.argv)