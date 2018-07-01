jest.mock('googleapis', () => {
    let analytics = {
        reports:{
            batchGet: jest.fn()
        }
    }  
    return {
        google: {
            auth: {
                JWT: jest.fn()
            },
            analyticsreporting :  jest.fn(() => analytics)
        }
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
        gapi.google.auth.JWT.mockImplementation(() => {return jwtMock } )
        let email = faker.internet.email(),
            path = `/some/file/path/${faker.random.uuid()}.conf`
            scope = ['https://www.googleapis.com/auth/analytics.readonly']
        
        let result = await helper.login(email, path)
        
        expect(gapi.google.auth.JWT).toBeCalledWith(email, path, null, scope)
        expect(result).toBe(jwtMock)
    })
    
    it("login to google api fails", async () => {
        let error = faker.random.uuid()
        jwtMock = {
            authorize: (callback) => {callback(error, undefined)}
        }
        gapi.google.auth.JWT.mockImplementation(() => {return jwtMock } )

        await expect(helper.login("", "")).rejects.toMatch(`unable to authorize to googleapi (${error})`)
    })
})

describe('analytics', () => {
    let configuration = { 
            jwtClient: faker.random.uuid(),
            viewId: faker.random.uuid(), 
            metrics: faker.random.uuid(), 
            dimensions: faker.random.uuid(),
            daterange: {
                startDate: '2018-03-17',
                endDate: '2018-03-24'
            }
        },
        jwtClient = { client: faker.random.uuid() },
        expectSetup = {
            version: 'v4',
            auth: jwtClient
        }

    it('uses analytics v4', async () => {
        helper.get(jwtClient, configuration)
        expect(gapi.google.analyticsreporting).toBeCalledWith(expectSetup)
    })
    
    it('calls report api with correct configuration', async () => {
        let expectedResult = faker.random.uuid()
        let expectedRequest = {
            "viewId":configuration.viewId,
            "dateRanges":[configuration.daterange],
            "metrics":[
              {
                "expression":configuration.metrics
              }],
            "dimensions": [
              {
                "name":configuration.dimensions
              }]
          }
        gapi.google.analyticsreporting(expectSetup).reports.batchGet.mockImplementation(() =>Promise.resolve(expectedResult))
        
        let result = await helper.get(jwtClient, configuration)

        expect(gapi.google.analyticsreporting(expectSetup).reports.batchGet.mock.calls[0][0]).toEqual(expectedRequest)
        expect(result).toBe(expectedResult)
    })
})