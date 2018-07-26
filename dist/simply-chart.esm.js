var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @description entry core
 */
var Chart = function () {
    function Chart(config) {
        _classCallCheck(this, Chart);

        this.margin = 2;
        this.config = config;
        this.defaultValue();
        this.canvasInit();
        this.dom.appendChild(this.canvas);
    }

    _createClass(Chart, [{
        key: 'update',
        value: function update(data) {
            this.data = data;
            return this;
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.canvas.height = this.canvas.height;
        }
    }, {
        key: 'render',
        value: function render() {
            var marginX = (this.config.width - this.margin * 2) / (this.data.length - 1);
            var maxY = Math.max.apply(Math, _toConsumableArray(this.data));
            var minY = Math.min.apply(Math, _toConsumableArray(this.data));
            var rateY = (this.config.height - this.margin * 2) / (maxY - minY);
            this.reset();
            this.ctx.save();
            this.axiesChange();
            this.ctx.lineCap = 'round';
            this.ctx.strokeStyle = this.config.color;
            this.ctx.lineWidth = this.config.lineWidth;
            this.ctx.beginPath();
            // this.ctx.moveTo(0, 0);
            for (var i = 0; i < this.data.length; i = i + 1) {
                this.ctx.lineTo(i * marginX * this.pixelRatio, (this.data[i] - minY) * rateY * this.pixelRatio);
            }
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
            return this;
        }
        // 参数默认值

    }, {
        key: 'defaultValue',
        value: function defaultValue() {
            this.config.color = this.config.color || 'blue';
            this.config.lineWidth = this.config.lineWidth || 5;
        }
    }, {
        key: 'canvasInit',
        value: function canvasInit() {
            if (typeof this.config.dom === 'string') {
                this.dom = document.querySelector(this.config.dom);
            } else {
                this.dom = this.config.dom;
            }
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.pixelRatio = window.devicePixelRatio;
            this.canvas.width = this.config.width * this.pixelRatio;
            this.canvas.height = this.config.height * this.pixelRatio;
            this.canvas.style.width = this.config.width + 'px';
            this.canvas.style.height = this.config.height + 'px';
        }
    }, {
        key: 'axiesChange',
        value: function axiesChange() {
            this.ctx.scale(1, -1);
            this.ctx.translate(this.margin, -this.config.height * this.pixelRatio + this.margin);
        }
    }]);

    return Chart;
}();

export default Chart;
//# sourceMappingURL=simply-chart.esm.js.map
