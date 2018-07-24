// import Chart from '../src/';
import Chart from '../dist/simply-chart';

// document.ready = () => {
window.onload = () => {
    const a = new Chart({
        dom: '#test',
        width: 200,
        height: 100,
    });

    a.update([1, 2, 3, 2, 1]).render();
};
