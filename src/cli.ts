#!/usr/bin/env node

import { fileURLToPath } from 'node:url'

import { cjsRequire } from '@pkgr/core'
import { program } from 'commander'

import type { PackageJson } from './types.js'

import { pkg, preversion } from './index.js'

const {
  PREVERSION_BRANCH,
  PREVERSION_MESSAGE,
  PREVERSION_VERSION,
  PREVERSION_TAG,
} = process.env

const { name, description, version } = cjsRequire<PackageJson>(
  fileURLToPath(new URL('../package.json', import.meta.url)),
)

program
  .name(name)
  .description(description!)
  .version(version)
  .option(
    '-b, --branch [string]',
    'optional specified branch to be pushed after releasing successfully',
    PREVERSION_BRANCH,
  )
  .option(
    '-m, --message [string]',
    'optional commit message when `branch` option enabled',
    PREVERSION_MESSAGE || `chore: release ${pkg.name} v{{version}}`,
  )
  .option(
    '-v, --preversion [string]',
    'optional specified version to be released',
    PREVERSION_VERSION,
  )
  .option(
    '-t, --tag [string]',
    'optional specified npm tag to be released',
    PREVERSION_TAG,
  )
  .action(preversion)
  .parse(process.argv)
