/**
 * Runs once when the Node server starts, before any route loads Payload.
 *
 * Some hosts (Hostinger's managed Node.js hosting among them) start the app
 * with a file descriptor 0 that Node cannot open, so reading `process.stdin`
 * throws `open EEXIST`. Nothing here reads stdin on purpose, but Payload
 * imports `node:process` as an ES module, and building that module makes
 * Node touch every property of `process` - stdin included. The throw then
 * takes down every request that initialises Payload (/admin, dynamic pages)
 * with a 500, while prerendered pages keep working.
 *
 * If stdin cannot be opened, replace it with an empty stream. A server never
 * reads stdin, so nothing is lost, and the import then succeeds.
 */
export function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  try {
    void process.stdin
  } catch {
    // getBuiltinModule rather than an import: webpack swaps `node:stream`
    // for a browser polyfill inside this file, and its Readable is unusable.
    const { Readable } = process.getBuiltinModule('node:stream')
    Object.defineProperty(process, 'stdin', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: new Readable({ read() {} }),
    })
  }
}
