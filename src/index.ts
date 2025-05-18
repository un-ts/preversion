/* eslint-disable sonarjs/os-command */

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import { homedir } from 'node:os'
import path from 'node:path'

import { findUp } from '@pkgr/core'
import semver from 'semver'

import type {
  DistTags,
  PackageJson,
  PreversionOptions,
  StdioError,
} from './types.js'

export * from './types.js'

const PREVERSION_TAGS = ['alpha', 'beta'] as const

export const getPreversionTag = (version: string) =>
  PREVERSION_TAGS.find(
    tag =>
      version === tag || new RegExp(`[._-]${tag}[._-]?\\d*$`).test(version),
  )

const pkgPath = findUp(process.cwd())

const pkgContent = fs.readFileSync(pkgPath, 'utf8')

export const pkg = JSON.parse(pkgContent) as PackageJson

// eslint-disable-next-line regexp/no-super-linear-backtracking, sonarjs/slow-regex
const jsonRegex = /[[{](?:[\d\t\n\r +,.:[\]aeflnr-u{}-]|".*?")+[\]}]/gis

const createStdioError = (error: StdioError) =>
  new Error(
    error.stderr?.toString() || error.stdout?.toString() || error.message,
    { cause: error },
  )

// eslint-disable-next-line sonarjs/cognitive-complexity
export const getPreversion = (tag: string, version = tag) => {
  if (version.startsWith('v')) {
    version = version.slice(1)
  } else if (version === tag) {
    let distTags: DistTags | undefined

    try {
      distTags = JSON.parse(
        execSync(`npm info ${pkg.name} dist-tags --json`).toString(),
      ) as DistTags
    } catch (err) {
      const error = err as StdioError

      if (error.stdout) {
        const content = error.stdout.toString()
        const matched = content.match(jsonRegex)
        if (matched?.[0]) {
          const { error: { code } = {} } = JSON.parse(matched[0]) as {
            error?: { code?: string }
          }
          if (code === 'E404') {
            distTags = {}
          }
        }
      }

      if (!distTags) {
        throw createStdioError(error)
      }
    }

    const { [tag]: preTag, latest } = distTags

    if (preTag != null && latest != null && semver.gt(preTag, latest)) {
      version = preTag.endsWith(`-${tag}`)
        ? preTag + '.0'
        : preTag.replace(
            new RegExp(`(-${tag}\\.)(\\d+)$`),
            (_, $0: string, $1: string) => $0 + (+$1 + 1),
          )
    } else {
      version =
        (latest == null ? '0.0.0' : semver.minVersion(`>${latest}`)!.format()) +
        `-${tag}`
    }
  }
  return version
}

export const preversion = ({
  branch,
  message,
  preversion,
  tag,
}: PreversionOptions) => {
  tag ??= (preversion && getPreversionTag(preversion)) || PREVERSION_TAGS[1]

  if (tag === 'latest') {
    console.error('Publish `latest` tag via this script is not permitted.')
    process.exitCode = 1
    return
  }

  const { HOME = homedir(), NPM_TOKEN } = process.env

  const npmrcPath = path.resolve(HOME, '.npmrc')

  if (fs.existsSync(npmrcPath)) {
    console.log('Found existing `.npmrc` file')
  } else if (NPM_TOKEN) {
    console.log('No `.npmrc` file found, creating one')
    fs.writeFileSync(npmrcPath, `//registry.npmjs.org/:_authToken=${NPM_TOKEN}`)
  } else {
    console.error(
      'No `.npmrc` found nor `NPM_TOKEN` provided, unable to publish packages',
    )
    process.exitCode = 1
    return
  }

  const newPkg = { ...pkg }
  newPkg.version = preversion = getPreversion(tag, preversion)
  fs.writeFileSync(pkgPath, JSON.stringify(newPkg, null, 2))

  try {
    // eslint-disable-next-line sonarjs/no-os-command-from-path
    execSync('npx clean-pkg-json')
    execSync(
      `npm publish ${
        pkg.publishConfig?.directory ? `./${pkg.publishConfig.directory}` : ''
      } --tag ${tag}`,
    )
  } catch (err) {
    const error = err as StdioError
    fs.writeFileSync(pkgPath, pkgContent)
    throw createStdioError(error)
  }

  if (!branch) {
    fs.writeFileSync(pkgPath, pkgContent)
    return
  }

  // eslint-disable-next-line regexp/strict
  const commitMessage = message.replaceAll(/{{\s*version\s*}}/g, preversion)

  execSync(`git commit -am "${commitMessage}"`)

  execSync(`git push --follow-tags origin "${branch}"`)
}
