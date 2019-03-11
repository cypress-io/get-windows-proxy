# get-windows-proxy

> Node.js module that finds a user&#39;s system proxy settings from their Windows registry settings.

[![NPM][npm-icon]][npm-url]

[![Build status][ci-image]][ci-url]

[![semantic-release][semantic-image]][semantic-url]

## Install

Requires [Node](https://nodejs.org/en/) version 6 or above.

```sh
npm install --save @cypress/get-windows-proxy
```

## Usage

```js
const getWindowsProxy = require('@cypress/get-windows-proxy')

const proxy = getWindowsProxy()

if (typeof proxy !== undefined) {
    console.log('HTTP Proxy: ', proxy.httpProxy)
    console.log('Proxy exclusions: ', proxy.noProxy)

    // Sample output:
    // HTTP Proxy: http://192.168.122.1:1337
    // Proxy exclusions: corporate-intranet.com,other-stuff.local,localhost,127.0.0.0/8,::1
}
```

## How does it work?

Windows generally stores proxy settings in the registry under
`HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Internet Settings`.
This module uses [registry-js][registry-js] to read those values out. Then, if
`ProxyEnable` is set to `1`, we know that the proxy is enabled. From there, we
read the proxy server from `ProxyServer` and the proxy bypass list from
`ProxyOverride`. Finally, these values are converted to values compatible with
the `HTTP_PROXY` and `NO_PROXY` environment variables that most applications are
compatible with, and returned to the user.

### Small print

Author: [Cypress.io](https://www.cypress.io) &copy; 2019

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/cypress-io/get-windows-proxy/issues) on Github

## MIT License

Copyright (c) 2019 Cypress.io

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/@cypress/get-windows-proxy.svg?downloads=true
[npm-url]: https://npmjs.org/package/@cypress/get-windows-proxy
[ci-image]: https://img.shields.io/circleci/project/github/cypress-io/get-windows-proxy/develop.svg
[ci-url]: https://circleci.com/gh/cypress-io/workflows/get-windows-proxy/tree/develop
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[registry-js]: https://github.com/desktop/registry-js/
