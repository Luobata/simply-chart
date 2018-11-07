import Chart from '../src/';
import radius from './demo/radius';
// import Chart from '../dist/simply-chart';

window.onload = () => {
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

    const a = new Chart.line({
        base: {
            ...basicConifg,
            dom: document.getElementById('test'),
            renderType: 'point',
        },
        attr: {
            ...attrConifg,
            shadowColor: 'yellow',
        },
    });
    const b = new Chart.line({
        base: {
            ...basicConifg,
            dom: document.getElementById('test2'),
            smooth: true,
            renderType: 'total',
            shadowColor: 'yellow',
        },
        attr: {
            ...attrConifg,
            point: true,
            pointFill: true,
        },
    });
    const c = new Chart.line({
        base: {
            ...basicConifg,
            dom: document.getElementById('test3'),
        },
        attr: {
            ...attrConifg,
        },
    });
    const d = new Chart.bar({
        base: {
            ...basicConifg,
            dom: document.getElementById('test4'),
        },
    });
    const e = new Chart.bar({
        base: {
            ...basicConifg,
            dom: document.getElementById('test5'),
            renderType: 'total',
        },
    });
    const f = new Chart.bar({
        base: {
            ...basicConifg,
            dom: document.getElementById('test6'),
            // renderType: 'total',
        },
    });
    const g = new Chart.bar({
        base: {
            ...basicConifg,
            dom: document.getElementById('test7'),
            renderType: 'total',
        },
    });
    const h = new Chart.line({
        base: {
            ...basicConifg,
            dom: document.getElementById('test8'),
        },
        attr: {
            ...attrConifg,
            // shadowColor: 'yellow',
            point: false,
        },
    });
    const i = new Chart.line({
        base: {
            ...basicConifg,
            dom: document.getElementById('test9'),
        },
        attr: {
            ...attrConifg,
            smooth: true,
            shadowColor: '#3B8BF7',
            point: false,
        },
    });
    const j = new Chart.pie({
        base: {
            ...basicConifg,
            dom: document.getElementById('test10'),
        },
        // attr: {
        //     ...attrConifg,
        //     smooth: true,
        //     shadowColor: '#3B8BF7',
        //     point: false,
        // },
    });
    const k = new Chart.pie({
        base: {
            ...basicConifg,
            dom: document.getElementById('test11'),
        },
        attr: {
            renderType: 'point',
        },
    });
    const l = new Chart.pie({
        base: {
            ...basicConifg,
            dom: document.getElementById('test12'),
        },
        attr: {
            renderType: 'total',
        },
    });

    a.update([1, 2.5, 3, 2.5, 1])
        .point()
        .render();
    b.update([4, 2, 1, 2, 1]).render();
    c.update([0, 0, 0, 0, 0]).render();
    // c.update([0]).render();
    d.update([10, 20, 35, 5]).render();
    e.update([10, 20, 35, 5]).render();
    // f.update([0, 0, 0, 0]).render();
    f.update([8]).render();
    g.update([8, 8, 8, 8]).render();
    h.update([2, 1, 3, 2.5, 1.5]).render();
    i.update([2, 1, 3, 2.5, 1.5]).render();
    j.update([2, 1, 3, 2.5, 1.5]).render();
    k.update([2, 1, 3, 2.5, 1.5]).render();
    l.update([2, 1, 3, 2.5, 1.5]).render();

    radius(Chart);
    // setTimeout(() => {
    //     a.update([4, 2, 1, 2, 1]).render();
    // }, 2000);
};
