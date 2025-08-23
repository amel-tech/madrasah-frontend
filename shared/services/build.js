import esbuild from 'esbuild'
import { exec } from 'child_process'

const entryPoints = [
  'src/core/index.ts',
  'src/api/index.ts',
  'src/api/client.ts',
]

const sharedConfig = {
  entryPoints,
  bundle: true,
  minify: false,
  sourcemap: true,
  external: [],
  platform: 'node',
  target: 'esnext',
}

const generateTypes = () => {
  return new Promise((resolve, reject) => {
    exec('tsc --emitDeclarationOnly --outDir dist', (error, stdout, stderr) => {
      if (error) {
        console.error('TypeScript d.ts generation failed:', stderr)
        return reject(error)
      }
      resolve(stdout)
    })
  })
}

async function runBuild() {
  try {
    await generateTypes()

    const esmContext = await esbuild.context({
      ...sharedConfig,
      format: 'esm',
      outdir: 'dist/esm',
      outExtension: { '.js': '.mjs' },
    })

    const cjsContext = await esbuild.context({
      ...sharedConfig,
      format: 'cjs',
      outdir: 'dist/cjs',
      outExtension: { '.js': '.js' },
    })

    const isWatchMode = process.argv.includes('--watch')

    if (isWatchMode) {
      await Promise.all([esmContext.watch(), cjsContext.watch()])
      console.log('Watching for changes...')
    }
    else {
      await Promise.all([esmContext.rebuild(), cjsContext.rebuild()])
      await Promise.all([esmContext.dispose(), cjsContext.dispose()])
      console.log('Build finished successfully!')
    }
  }
  catch (e) {
    console.error('Build failed:', e)
    process.exit(1)
  }
}

runBuild()
