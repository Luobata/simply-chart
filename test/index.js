import Chart from '../src/';
// import Chart from '../dist/simply-chart';

// document.ready = () => {
window.onload = () => {
    const a = new Chart({
        // dom: '#test',
        dom: document.getElementById('test'),
        width: 200,
        height: 100,
        lineWidth: 2,
    });

    // a.update([0, 0, 0, 0, 0]).render();
    a.update([1, 2, 3, 2, 1]).render();
    setTimeout(() => {
        a.update([4, 2, 1, 2, 1]).render();
    }, 2000);
};
