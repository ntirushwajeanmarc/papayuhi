import { existsSync, rmSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const viteVersion = '7.3.5'
const requiredChunk = 'node_modules/vite/dist/node/chunks/chunk.js'

if (existsSync(requiredChunk)) {
  process.exit(0)
}

console.warn(`Vite install is missing ${requiredChunk}; reinstalling vite@${viteVersion}.`)

rmSync('node_modules/vite', { recursive: true, force: true })

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const result = spawnSync(
  npmCommand,
  ['install', '--no-save', '--ignore-scripts', '--prefer-online', `vite@${viteVersion}`],
  { stdio: 'inherit' },
)

if (result.status !== 0) {
  process.exit(result.status ?? 1)
}

if (!existsSync(requiredChunk)) {
  console.error(`vite@${viteVersion} was installed, but ${requiredChunk} is still missing.`)
  process.exit(1)
}
