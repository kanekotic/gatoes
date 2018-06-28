jest.mock('../../lib/helpers/google-analytics', () => {
    return {
        login: jest.fn(),
        realtime: jest.fn()
    }
})

const importer = require('../../lib/importer-realtime'),
    analytics = require('../../lib/helpers/google-analytics'),
    faker = require('faker')

describe('import realtime', () => {
    it('import from google analytics',async () => {
        const email = faker.internet.email(),
            path = `/some/file/path/${faker.random.uuid()}.conf`,
            jwtClient = { client: faker.random.uuid() },
            config = { config: faker.random.uuid() },
            expectedResult = faker.random.uuid()

        analytics.login.mockImplementation(() => jwtClient)
        analytics.realtime.mockImplementation(() => Promise.resolve(expectedResult))
        
        let result = await importer(email, path, config)

        expect(analytics.login).toBeCalledWith(email, path)
        expect(analytics.realtime).toBeCalledWith(jwtClient, config)
        expect(result).toEqual(expectedResult)
    })
})