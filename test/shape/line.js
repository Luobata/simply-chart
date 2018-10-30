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
        },
        attr: {
            ...attrConifg,
            shadowColor: 'yellow',
        },
    });
    describe('basic confiig', () => {
        it('basic confiig', () => {
            assert.deepEqual(line.config, {
                dom,
                canvas,
                width: 200,
                height: 100,
                padding: 10,
                renderType: 'none',
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

            line.point();
            assert.deepEqual(line.config.point, true);

            line.fill();
            assert.deepEqual(line.config.pointFill, true);
        });

        it('data update:', () => {
            line.update([1, 2.5, 3, 2.5, 1]);
            assert.deepEqual(line.pointList, [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 45,
                    y: 60,
                },
                {
                    x: 90,
                    y: 80,
                },
                {
                    x: 135,
                    y: 60,
                },
                {
                    x: 180,
                    y: 0,
                },
            ]);
        });
    });
});
