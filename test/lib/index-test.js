jest.mock('../../lib/importer', () => jest.fn())

const index = require('../../lib/index')
    importer = require('../../lib/importer')

describe('index', () => {
    it('exports the importer',async () => {
        expect(index.importer).toBe(importer)
    })
})