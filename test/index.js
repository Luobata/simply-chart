/**
 * @desc test unit entry
 */
const Chart = require('../dist/simply-chart').default;

global.Chart = Chart;

describe('simply chart unit test case', () => {
    describe('shape unit:', () => {
        require('./shape');
    });
});
