/*
  TESTS FOR THE ELECTRUMX.JS LIBRARY

  This test file uses the environment variable TEST to switch between unit
  and integration tests. By default, TEST is set to 'unit'. Set this variable
  to 'integration' to run the tests against BCH mainnet.

  To-Do:
*/

'use strict'

const chai = require('chai')
const assert = chai.assert

const sinon = require('sinon')

let originalUrl // Used during transition from integration to unit tests.

// Set default environment variables for unit tests.
if (!process.env.TEST) process.env.TEST = 'unit'
if (process.env.TEST === 'unit') {
  process.env.BLOCKBOOK_URL = 'http://fakeurl/api/'
}

// Only load blockbook library after setting BLOCKBOOK_URL env var.
const ElecrumxRoute = require('../../src/routes/v3/electrumx')
const electrumxRoute = new ElecrumxRoute()

// Mocking data.
const { mockReq, mockRes } = require('./mocks/express-mocks')
// const mockData = require('./mocks/blockbook-mock')

// Used for debugging.
const util = require('util')
util.inspect.defaultOptions = { depth: 1 }

describe('#Blockbook Router', () => {
  let req, res
  let sandbox
  before(() => {
    // console.log(`Testing type is: ${process.env.TEST}`)

    if (!process.env.NETWORK) process.env.NETWORK = 'testnet'
  })

  // Setup the mocks before each test.
  beforeEach(() => {
    // Mock the req and res objects used by Express routes.
    req = mockReq
    res = mockRes

    // Explicitly reset the parmas and body.
    req.params = {}
    req.body = {}
    req.query = {}

    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  after(() => {
    process.env.BLOCKBOOK_URL = originalUrl
  })

  describe('#root', () => {
    // root route handler.
    const root = electrumxRoute.root

    it('should respond to GET for base route', async () => {
      const result = root(req, res)

      assert.equal(result.status, 'electrumx', 'Returns static string')
    })
  })

  describe('#addressToScripthash', () => {
    it('should accurately return a scripthash', () => {
      const addr = 'bitcoincash:qpr270a5sxphltdmggtj07v4nskn9gmg9yx4m5h7s4'

      const scripthash = electrumxRoute.addressToScripthash(addr)

      const expectedOutput = 'bce4d5f2803bd1ed7c1ba00dcb3edffcbba50524af7c879d6bb918d04f138965'

      assert.equal(scripthash, expectedOutput)
    })
  })

  describe('#UTXO', () => {
    // details route handler.
    // const balanceSingle = blockbookRoute.balanceSingle

    // it('should throw 400 if address is empty', async () => {
    //   const result = await blockbookRoute.balanceSingle(req, res)
    //   // console.log(`result: ${util.inspect(result)}`)
    //
    //   assert.hasAllKeys(result, ['error'])
    //   assert.include(result.error, 'address can not be empty')
    // })

    // it('should error on an array', async () => {
    //   req.params.address = ['qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c']
    //
    //   const result = await blockbookRoute.balanceSingle(req, res)
    //
    //   assert.equal(res.statusCode, 400, 'HTTP status code 400 expected.')
    //   assert.include(
    //     result.error,
    //     'address can not be an array',
    //     'Proper error message'
    //   )
    // })

    // it('should throw an error for an invalid address', async () => {
    //   req.params.address =
    //     '02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c'
    //
    //   const result = await blockbookRoute.balanceSingle(req, res)
    //
    //   assert.equal(res.statusCode, 400, 'HTTP status code 400 expected.')
    //   assert.include(
    //     result.error,
    //     'Invalid BCH address',
    //     'Proper error message'
    //   )
    // })

    // it('should detect a network mismatch', async () => {
    //   req.params.address =
    //     'bchtest:qq89kjkeqz9mngp8kl3dpmu43y2wztdjqu500gn4c4'
    //
    //   const result = await blockbookRoute.balanceSingle(req, res)
    //
    //   assert.equal(res.statusCode, 400, 'HTTP status code 400 expected.')
    //   assert.include(result.error, 'Invalid network', 'Proper error message')
    // })

    // it('should throw 500 when network issues', async () => {
    //   const savedUrl = process.env.BLOCKBOOK_URL
    //
    //   try {
    //     req.params.address = 'qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c'
    //
    //     // Switch the Insight URL to something that will error out.
    //     process.env.BLOCKBOOK_URL = 'http://fakeurl/api/'
    //
    //     const result = await blockbookRoute.balanceSingle(req, res)
    //
    //     // Restore the saved URL.
    //     process.env.BLOCKBOOK_URL = savedUrl
    //
    //     assert.equal(res.statusCode, 500, 'HTTP status code 500 expected.')
    //     assert.include(result.error, 'ENOTFOUND', 'Error message expected')
    //   } catch (err) {
    //     // Restore the saved URL.
    //     process.env.BLOCKBOOK_URL = savedUrl
    //   }
    // })

    // it('returns proper error when downstream service stalls', async () => {
    //   req.params.address =
    //     'bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf'
    //
    //   // Mock the timeout error.
    //   sandbox.stub(blockbookRoute.axios, 'request').throws({
    //     code: 'ECONNABORTED'
    //   })
    //
    //   const result = await blockbookRoute.balanceSingle(req, res)
    //   // console.log(`result: ${JSON.stringify(result, null, 2)}`)
    //
    //   assert.isAbove(res.statusCode, 499, 'HTTP status code 503 expected.')
    //   assert.include(
    //     result.error,
    //     'Could not communicate with full node',
    //     'Error message expected'
    //   )
    // })

    // it('returns proper error when downstream service is down', async () => {
    //   req.params.address =
    //     'bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf'
    //
    //   // Mock the timeout error.
    //   sandbox.stub(blockbookRoute.axios, 'request').throws({
    //     code: 'ECONNREFUSED'
    //   })
    //
    //   const result = await blockbookRoute.balanceSingle(req, res)
    //   // console.log(`result: ${JSON.stringify(result, null, 2)}`)
    //
    //   assert.isAbove(res.statusCode, 499, 'HTTP status code 503 expected.')
    //   assert.include(
    //     result.error,
    //     'Could not communicate with full node',
    //     'Error message expected'
    //   )
    // })

    it('should get balance for a single address', async () => {
      req.params.address =
        'bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf'

      // console.log(`process.env.BLOCKBOOK_URL: ${process.env.BLOCKBOOK_URL}`)

      // Mock the Insight URL for unit tests.
      // if (process.env.TEST === 'unit') {
      //   sandbox.stub(blockbookRoute.axios, 'request').resolves({
      //     data: mockData.mockBalance
      //   })
      // }

      // Call the details API.
      const result = await electrumxRoute.getUtxos(req, res)
      console.log(`result: ${util.inspect(result)}`)
    })
  })
})
