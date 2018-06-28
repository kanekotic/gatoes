jest.mock('googleapis', () => {
    let analytics = {
        data:{
            realtime:{
                get: jest.fn()
            }
        }
    }  
    return {
        auth: {
            JWT: jest.fn()
        },
        analytics: jest.fn(() => analytics)
    }
})

const helper = require('../../../lib/helpers/google-analytics'),
    faker = require('faker'),
    gapi = require('googleapis')

describe('google authorization', () => {
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

describe('analytics', () => {
    let configuration = { 
        jwtClient: faker.random.uuid(),
        viewId: faker.random.uuid(), 
        rt_metrics: faker.random.uuid(), 
        rt_dimensions: faker.random.uuid(), 
        maxResults: faker.random.uuid()
    },
        jwtClient = { client: faker.random.uuid() }

    it('uses analytics v3', async () => {
        helper.realtime(jwtClient, configuration)
        expect(gapi.analytics).toBeCalledWith('v3')
    })
    
    it('calls realtime api with correct configuration', async () => {
        let expectedResult = faker.random.uuid()
        let expectParams = {
            auth: jwtClient,
            ids: `ga:${configuration.viewId}`,
            metrics: configuration.rt_metrics,
            dimensions: configuration.rt_dimensions,
            'max-results': configuration.maxResults
        }
        gapi.analytics('v3').data.realtime.get.mockImplementation((_, fun) =>fun(expectedResult))
        
        let result = await helper.realtime(jwtClient, configuration)
        expect(gapi.analytics('v3').data.realtime.get.mock.calls[0][0]).toEqual(expectParams)
        expect(result).toBe(expectedResult)
    })
})