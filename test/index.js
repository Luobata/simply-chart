import Chart from '../src/';
// import Chart from '../dist/simply-chart';

// document.ready = () => {
window.onload = () => {
    const basicConifg = {
        width: 200,
        height: 100,
        lineWidth: 2,
        renderType: 'total',
        renderTime: 200 / 60,
        framePerSecond: 60,
    };

    const a = new Chart({
        // dom: '#test',
        ...basicConifg,
        dom: document.getElementById('test'),
        renderType: 'point',
    });
    const b = new Chart({
        // dom: '#test',
        ...basicConifg,
        dom: document.getElementById('test2'),
        renderType: 'total',
    });

    // a.update([0, 0, 0, 0, 0]).render();
    a.update([1, 2.5, 3, 2.5, 1]).render();
    b.update([4, 2, 1, 2, 1]).render();
    // setTimeout(() => {
    //     a.update([4, 2, 1, 2, 1]).render();
    // }, 2000);
};
