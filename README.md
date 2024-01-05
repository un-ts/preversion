# preversion

[![GitHub Actions](https://github.com/un-ts/preversion/workflows/CI/badge.svg)](https://github.com/un-ts/preversion/actions/workflows/ci.yml)
[![Codecov](https://img.shields.io/codecov/c/github/un-ts/preversion.svg)](https://codecov.io/gh/un-ts/preversion)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fun-ts%2Flib-boilerplate%2Fmain%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![npm](https://img.shields.io/npm/v/preversion.svg)](https://www.npmjs.com/package/preversion)
[![GitHub Release](https://img.shields.io/github/release/un-ts/preversion)](https://github.com/un-ts/preversion/releases)

[![Conventional Commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![changesets](https://img.shields.io/badge/maintained%20with-changesets-176de3.svg)](https://github.com/changesets/changesets)

> A tiny cli helps you to publish alpha/beta versions to npm before releasing the final latest version

## TOC <!-- omit in toc -->

- [Usage](#usage)
  - [Install](#install)
  - [CLI](#cli)
  - [API](#api)
- [Sponsors](#sponsors)
- [Backers](#backers)
- [Changelog](#changelog)
- [License](#license)

## Usage

### Install

```sh
# pnpm
pnpm add -D preversion

# yarn
yarn add -D preversion

# npm
npm i -D preversion
```

### CLI

```log
Usage: preversion [options]

A tiny cli helps you to publish alpha/beta versions to npm before releasing the final latest version

Options:
  -V, --version              output the version number
  -b, --branch [string]      optional specified branch to be pushed after releasing successfully
  -m, --message [string]     optional commit message when `branch` option enabled (default: "chore: release preversion v{{version}}")
  -v, --preversion [string]  optional specified version to be released
  -t, --tag [string]         optional specified npm tag to be released
  -h, --help                 display help for command
```

### API

```ts
import { getPreversionTag, getPreversion, preversion } from 'preversion'
```

## Sponsors

| 1stG                                                                                                                               | RxTS                                                                                                                               | UnTS                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [![1stG Open Collective backers and sponsors](https://opencollective.com/1stG/organizations.svg)](https://opencollective.com/1stG) | [![RxTS Open Collective backers and sponsors](https://opencollective.com/rxts/organizations.svg)](https://opencollective.com/rxts) | [![UnTS Open Collective backers and sponsors](https://opencollective.com/unts/organizations.svg)](https://opencollective.com/unts) |

## Backers

[![Backers](https://raw.githubusercontent.com/1stG/static/master/sponsors.svg)](https://github.com/sponsors/JounQin)

| 1stG                                                                                                                             | RxTS                                                                                                                             | UnTS                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [![1stG Open Collective backers and sponsors](https://opencollective.com/1stG/individuals.svg)](https://opencollective.com/1stG) | [![RxTS Open Collective backers and sponsors](https://opencollective.com/rxts/individuals.svg)](https://opencollective.com/rxts) | [![UnTS Open Collective backers and sponsors](https://opencollective.com/unts/individuals.svg)](https://opencollective.com/unts) |

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[jounqin]: https://GitHub.com/JounQin
[mit]: http://opensource.org/licenses/MIT
