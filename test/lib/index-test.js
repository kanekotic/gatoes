jest.mock('../../lib/importer', () => jest.fn())
jest.mock('../../lib/exporter', () => jest.fn())

const index = require('../../lib/index')
    importer = require('../../lib/importer'),
    exporter = require('../../lib/exporter')

describe('index', () => {
    it('exports the importer',async () => {
        expect(index.importer).toBe(importer)
    })
    it('exports the exporter',async () => {
        expect(index.exporter).toBe(exporter)
    })
})