/**
 * @desc Char.line test case
 */

const assert = require('assert');
const { createCanvas } = require('canvas');

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
    const canvas = createCanvas(200, 100);
    const dom = document.createElement('div');
    canvas.style = {};
    dom.appendChild = () => {};
    const line = new Chart.line({
        base: {
            ...basicConifg,
            dom,
            canvas,
            renderType: 'point',
        },
        attr: {
            ...attrConifg,
            shadowColor: 'yellow',
        },
    });

    assert.deepEqual(line.config, {
        dom,
        canvas,
        width: 200,
        height: 100,
        padding: 10,
        renderType: 'point',
        renderTime: 200 / 60,
        framePerSecond: 60,
        renderCurve: 'ease-in-out',
        color: 'blue',
        lineWidth: 2,
        point: false,
        pointRadius: 3,
        pointFill: false,
        smooth: false,
        shadowColor: 'yellow',
        innerWidth: 180,
        innerHeight: 80,
    });
});
