jest.mock('googleapis', () => {
    return {
        auth: {
            JWT: jest.fn()
        }
    }
})

const helper = require('../../../lib/helpers/google-analytics'),
    faker = require('faker'),
    gapi = require('googleapis')

describe('analytics retriever', () => {
    it("login to google api returns token", async () => {
        let token = faker.random.uuid()
        jwtMock = {
            authorize: (callback) => {callback(undefined, token)}
        }
        gapi.auth.JWT.mockImplementation(() => {return jwtMock } )
        let email = faker.internet.email(),
            path = `/some/file/path/${faker.random.uuid()}.conf`
            scope = ['https://www.googleapis.com/auth/analytics.readonly']
        
        let result = await helper.login(email, path)
        
        expect(gapi.auth.JWT).toBeCalledWith(email, path, null, scope)
        expect(result).toBe(jwtMock)
    })
    
    it("login to google api fails", async () => {
        let error = faker.random.uuid()
        jwtMock = {
            authorize: (callback) => {callback(error, undefined)}
        }
        gapi.auth.JWT.mockImplementation(() => {return jwtMock } )

        await expect(helper.login("", "")).rejects.toMatch(`unable to authorize to googleapi (${error})`)
    })
})