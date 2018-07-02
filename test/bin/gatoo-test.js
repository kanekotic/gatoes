jest.mock('commander', () => {
    const jestFn = {
            default: this,
            version: jest.fn(() => jestFn),
            command: jest.fn(() => jestFn),
            description: jest.fn(() => jestFn),
            action: jest.fn(action => {
                let input = ["GOOD","BAD"]
                action(input)
                return jestFn
            }),
            parse: jest.fn(() => jestFn)
        }
    return jestFn
})

jest.mock('../../lib/index', () => {
    let impFun = (param) => {
        if(param=="BAD")
            throw "Boon"
        return "OK"
      }
      return {
        importer: jest.fn().mockImplementation(impFun),
      }
})

jest.mock('../../package.json', () => {
    const randomNumber = () => Math.floor((Math.random() * 10) + 1)
    return {
        version: `${randomNumber()}.${randomNumber()}.${randomNumber()}`
    }
})

const commander = require('commander'),
    gatoo = require('../../bin/gatoo'),
    index = require('../../lib/index'),
    packageJson = require('../../package.json')

describe('command line', () => {
    it("is version from package.json", () => {
        expect(commander.version.mock.calls[0][0]).toBe(packageJson.version)
    })

    it("is has command to convert in consol with correct description", () => {
        expect(commander.command.mock.calls[0][0]).toBe("console")
        expect(commander.description.mock.calls[0][0]).toBe("get data to console from google analytics")
        expect(commander.action.mock.calls[0][0]).toBeInstanceOf(Function)
    })

})