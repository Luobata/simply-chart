import Chart from '../src/';
// import Chart from '../dist/simply-chart';

window.onload = () => {
    const basicConifg = {
        base: {
            width: 200,
            height: 100,
            renderType: 'none',
            renderTime: 200 / 60,
            framePerSecond: 60,
        },
        attr: {
            lineWidth: 2,
        },
    };

    const a = new Chart.line({
        ...basicConifg,
        base: {
            dom: document.getElementById('test'),
            renderType: 'point',
        },
    });
    const b = new Chart.line({
        ...basicConifg,
        base: {
            dom: document.getElementById('test2'),
            renderType: 'total',
        },
    });
    const c = new Chart.line({
        ...basicConifg,
        base: {
            dom: document.getElementById('test3'),
        },
    });

    a.update([1, 2.5, 3, 2.5, 1]).render();
    b.update([4, 2, 1, 2, 1]).render();
    c.update([0, 0, 0, 0, 0]).render();
    // setTimeout(() => {
    //     a.update([4, 2, 1, 2, 1]).render();
    // }, 2000);
};
