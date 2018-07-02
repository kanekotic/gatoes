jest.mock('../../lib/importer', () => jest.fn())
jest.mock('../../lib/exporter', () => jest.fn())
jest.mock('../../lib/exporter', () => jest.fn())

const index = require('../../lib/index'),
    faker = require('faker')
    importer = require('../../lib/importer'),
    exporter = require('../../lib/exporter'),
    consoleAdapter = require('../../lib/adapters/console')

describe('index', () => {
    it('exports the importer',async () => {
        expect(index.importer).toBe(importer)
    })
    it('exports the exporter',async () => {
        expect(index.exporter).toBe(exporter)
    })
    it('exports outputs to console',async () => {
        const email = faker.internet.email(),
        path = `/some/file/path/${faker.random.uuid()}.conf`,
        config = { config: faker.random.uuid() }

        index.outputTo.console(email, path, config)
        
        expect(index.exporter).toBeCalledWith(email,path, config, consoleAdapter)
    })
})