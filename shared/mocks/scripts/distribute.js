#!/usr/bin/env node
/* eslint-env node */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration for which apps should receive which mock files
const DISTRIBUTION_CONFIG = {
  tedrisat: {
    sourceFile: 'src/tedrisat/mock.json',
    targetApps: ['tedris', 'nizam'], // Apps that need this mock data
    targetPath: 'public/mocks/tedrisat.json',
  },
  // Add more mock files here as needed
  // example: {
  //   sourceFile: 'src/another/mock.json',
  //   targetApps: ['app1', 'app2'],
  //   targetPath: 'public/mocks/another.json'
  // }
}

function findProjectRoot() {
  let currentDir = __dirname
  while (currentDir !== path.parse(currentDir).root) {
    if (fs.existsSync(path.join(currentDir, 'package.json'))) {
      const packageJson = JSON.parse(fs.readFileSync(path.join(currentDir, 'package.json'), 'utf8'))
      if (packageJson.workspaces) {
        return currentDir
      }
    }
    currentDir = path.dirname(currentDir)
  }
  throw new Error('Could not find project root with workspaces')
}

function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function copyMockFile(sourceFile, targetFile) {
  try {
    const sourceContent = fs.readFileSync(sourceFile, 'utf8')
    ensureDirectoryExists(targetFile)
    fs.writeFileSync(targetFile, sourceContent)

    console.log(`✓ Copied ${path.basename(sourceFile)} to ${targetFile}`)
    return true
  }
  catch (error) {
    console.error(`✗ Failed to copy ${sourceFile} to ${targetFile}:`, error.message)
    return false
  }
}

function distributeMocks() {
  console.log('🚀 Starting mock distribution...\n')

  const projectRoot = findProjectRoot()
  const mocksRoot = path.join(projectRoot, 'shared', 'mocks')
  const appsRoot = path.join(projectRoot, 'apps')

  let totalCopied = 0
  let totalFailed = 0

  // Process each mock configuration
  Object.entries(DISTRIBUTION_CONFIG).forEach(([mockName, config]) => {
    console.log(`📦 Distributing ${mockName} mock...`)

    const sourceFile = path.join(mocksRoot, config.sourceFile)

    if (!fs.existsSync(sourceFile)) {
      console.error(`✗ Source file not found: ${sourceFile}`)
      totalFailed++
      return
    }

    // Copy to each target app
    config.targetApps.forEach((appName) => {
      const targetFile = path.join(appsRoot, appName, config.targetPath)

      if (copyMockFile(sourceFile, targetFile)) {
        totalCopied++
      }
      else {
        totalFailed++
      }
    })

    console.log() // Empty line for readability
  })

  // Summary

  console.log('📊 Distribution Summary:')

  console.log(`   ✓ Successfully copied: ${totalCopied} files`)
  if (totalFailed > 0) {
    console.log(`   ✗ Failed: ${totalFailed} files`)
    process.exit(1)
  }
  else {
    console.log('   🎉 All mock files distributed successfully!')
  }
}

// Run the distribution
distributeMocks()
