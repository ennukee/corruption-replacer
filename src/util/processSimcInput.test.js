import processSimcInput from './processSimcInput';

describe('because rye wanted tests', () => {
    it('removes gear from bags', () => {
        expect(
            processSimcInput(`This is valid\n### GEAR FROM BAGS\nThis is not`, {})
        ).toBe(`This is valid\n### GEAR FROM CLONER\n`)
    })
})