import esbuild from 'esbuild'
import minimist from 'minimist'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const args = minimist(process.argv.slice(2))
const target = args._[0]
const format = args.f

const require = createRequire(import.meta.url)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const pkg = require(`../packages/${target}/src/package.json`)


const entry = resolve(__dirname, `../packages/${target}/src/index.ts`)

esbuild.context({
  entryPoints: [entry],
  outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`),
  bundle: true,
  platform: 'browser',
  sourcemap: true,
  format,
  globalName: pkg.buildOptions?.name
}).then(ctx => {
  console.log('start dev')
  return ctx.watch()
})
