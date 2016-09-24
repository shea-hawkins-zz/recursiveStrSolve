const {
    assert,
    expect
} = require('chai');
const computeString = require('../eqnUtils');

describe(`eqnUtils \n-------------------------\n`, () => {
    it(`should handle negative numbers`, () => {
        expect(computeString('-2')).to.equal(-2);
    });
    it(`should handle negative negation`, () => {
        expect(computeString('--2')).to.equal(2);
    });
    it(`should handle order of operations with mult/div`, () => {
        expect(computeString('2-2/2*2')).to.equal(0);
    });
    it(`should handle order of operations with mult, div, and exp`, () => {
        expect(computeString('2-2/2^2*2')).to.equal(1);
    });
    it(`should handle chaining exponent`, () => {
        expect(computeString('2-2^3^2')).to.equal(-510);
    });
    it(`should handle negative exponent`, () => {
        expect(computeString('2-4^2^-1')).to.equal(0);
    });
});