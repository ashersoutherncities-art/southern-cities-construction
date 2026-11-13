import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { createRequire } from 'node:module'

// Exercise the actual typescript-eslint consumer after the scoped minimatch 11 override.
const require = createRequire(import.meta.url)
const { parseForESLint, clearCaches } = require('@typescript-eslint/parser')
const dir = mkdtempSync(path.join(tmpdir(), 'scc-parser-'))
try {
  mkdirSync(path.join(dir, 'src'))
  writeFileSync(path.join(dir, 'tsconfig.json'), JSON.stringify({ include: ['src/**/*.ts'] }))
  writeFileSync(path.join(dir, 'src/included.ts'), 'export const included = 1')
  for (const name of ['allowed.ts', '.hidden.ts', 'excluded.ts']) writeFileSync(path.join(dir, name), 'const value: number = 1')
  const options = { tsconfigRootDir: dir, projectService: { allowDefaultProject: ['allowed.ts', '.hidden.ts'] } }
  for (const name of ['allowed.ts', '.hidden.ts']) {
    const result = parseForESLint('const value: number = 1', { ...options, filePath: path.join(dir, name) })
    assert(result.services.program, name + ' should use the default project')
  }
  assert.throws(() => parseForESLint('const value: number = 1', { ...options, filePath: path.join(dir, 'excluded.ts') }), /not found by the project service|allowDefaultProject/)
  console.log('PASS: typescript-eslint projectService matches allowed paths and rejects excluded paths')
} finally {
  clearCaches()
  rmSync(dir, { recursive: true, force: true })
}
