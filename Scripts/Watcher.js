import { watch } from 'fs'
import { spawn } from 'child_process'
import path, { dirname, join } from 'path'
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const watchDir = join(__dirname, '../Source')
const scriptToRun = join(__dirname, './GenerateIndex.js')

let debounceTimer = null

const watcher = watch(watchDir, { recursive: true }, (eventType, filename) => {

    if (!filename) return

    const baseName = path.basename(filename)

    if (baseName === 'index.ts') return

    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
        console.log(`\n[watcher] ${filename} → ${eventType}. Dispatching script...\n`)

        const child = spawn('node', [scriptToRun], { stdio: 'inherit' })

        child.on('error', err => {
            console.error('[watcher] Error on script execution:', err)
        })
    }, 500)
})

watcher.on('error', err => {
    console.error('[watcher] Error:', err)
})

console.log(`[watcher] Running: ${watchDir}`)
