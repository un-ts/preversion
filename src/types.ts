export interface PreversionOptions {
  branch?: string
  message: string
  preversion?: string
  tag?: string
}

export interface PackageJson {
  name: string
  version: string
  description?: string
  publishConfig?: {
    directory?: string
  }
}

export type DistTags = Partial<Record<string, string>>

export interface StdioError extends Error {
  stderr?: Buffer
  stdout?: Buffer
}
