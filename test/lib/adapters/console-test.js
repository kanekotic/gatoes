global.console = {log: jest.fn()}

const faker = require('faker')
    adapter = require('../../../lib/adapters/console')

describe('console adapter', () => {
    it('exports console.log',async () => {
        let output = faker.random.uuid()
        adapter(output)
        expect(console.log).toBeCalledWith(output)
    })
})