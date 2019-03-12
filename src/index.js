const debug = require('debug')('get-windows-proxy')
let registry

try {
  registry = require('@cypress/registry-js')
} catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }

  debug('Could not load native extension for Windows registry access. The most likely reason is that your Node version has changed since installing. Try re-installing get-windows-proxy.')
}

const findByName = (values, name) => {
  return values.find((value) => {
    return value && value.name === name
  })
}

module.exports = function getWindowsProxy () {
  if (!registry) {
    return
  }

  debug('scanning Windows registry for proxy setting')

  const values = registry.enumerateValues(
    registry.HKEY.HKEY_CURRENT_USER,
    'Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings'
  )

  const proxyEnabled = findByName(values, 'ProxyEnable')
  const proxyServer = findByName(values, 'ProxyServer')

  if (
    !proxyEnabled ||
    !proxyEnabled.data ||
    !proxyServer ||
    !proxyServer.data
  ) {
    debug('windows proxy disabled or no proxy defined')

    return
  }

  const proxyOverride = findByName(values, 'ProxyOverride')
  let noProxy

  if (proxyOverride && proxyOverride.data) {
    noProxy = proxyOverride.data
    .split(';')
    .join(',')
    // Windows registry inserts <local> if a user indicates to not proxy localhost stuff
    // on Linux/Mac, this is the equivalent
    .replace('<local>', 'localhost,127.0.0.0/8,::1')
  }

  const httpProxy = `http://${proxyServer.data}`

  debug(
    'found HTTP proxy %s and "no proxy" %s from registry key',
    httpProxy,
    noProxy
  )

  return { httpProxy, noProxy }
}
