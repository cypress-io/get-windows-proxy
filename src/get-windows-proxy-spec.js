const { expect } = require('chai')
const os = require('os')
const registry = require('@cypress/registry-js')
const sinon = require('sinon')

/* eslint-env mocha */
const getWindowsProxy = require('.')

context('getWindowsProxy', () => {
  beforeEach(() => {
    sinon.stub(os, 'platform').returns('win32')
  })

  afterEach(() => {
    sinon.restore()
  })

  it('returns Windows proxy info from registry', () => {
    sinon
    .stub(registry, 'enumerateValues')
    .returns([
      { name: 'ProxyEnable', data: 1 },
      { name: 'ProxyServer', data: 'proxy.foobaz:1234' },
      { name: 'ProxyOverride', data: 'a.com;b.com;<local>' }
    ])

    expect(getWindowsProxy()).to.deep.eq({
      httpProxy: 'http://proxy.foobaz:1234',
      noProxy: 'a.com,b.com,localhost,127.0.0.0/8,::1'
    })
  })

  it('returns undefined if proxy is disabled', () => {
    sinon
    .stub(registry, 'enumerateValues')
    .returns([
      { name: 'ProxyEnable', data: 0 },
      { name: 'ProxyServer', data: 'proxy.foobaz:1234' },
      { name: 'ProxyOverride', data: 'a.com;b.com;<local>' }
    ])

    expect(getWindowsProxy()).to.be.undefined
  })
})
