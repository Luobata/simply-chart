/**
 * @desc Char.line test case
 */

const expect = require('chai').expect;

describe('line unit:', () => {
    const basicConifg = {
        width: 200,
        height: 100,
        padding: 10,
        renderType: 'none',
        renderTime: 200 / 60,
        framePerSecond: 60,
    };
    const attrConifg = {
        lineWidth: 2,
    };
    const line = new Chart.line({
        base: {
            ...basicConifg,
            dom: document.createElement('canvas'),
            renderType: 'point',
        },
        attr: {
            ...attrConifg,
            shadowColor: 'yellow',
        },
    });

    expect(line.config, {
        width: 200,
        height: 100,
        padding: 10,
        renderType: 'none',
        renderTime: 200 / 60,
        framePerSecond: 60,
    });
});
