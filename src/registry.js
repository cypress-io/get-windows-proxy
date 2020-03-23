'use strict'

const os = require('os')
const debug = require('debug')('get-windows-proxy')

let registry

try {
  // @ts-ignore
  registry = require('registry-js')
} catch (err) {
  if (os.platform() === 'win32') {
    debug(
      'Could not load native extension for Windows registry access. The most likely reason is that your Node version has changed since installing. Try re-installing get-windows-proxy.'
    )
  } else {
    debug(
      'Skipping loading registry-js because your platform is not win32.'
    )

    registry = {
      enumerateValues () {
        return []
      },
      HKEY: {
        HKEY_CURRENT_USER: null
      }
    }
  }
}

module.exports = registry
