function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @description interface
 */
var enumRenderType;
(function (enumRenderType) {
    enumRenderType["none"] = "none";
    enumRenderType["point"] = "point";
    enumRenderType["total"] = "total";
})(enumRenderType || (enumRenderType = {}));
var Config = function Config(config) {
    _classCallCheck$2(this, Config);

    this.width = 200;
    this.height = 100;
    this.renderType = enumRenderType.none;
    this.renderTime = 2;
    this.renderCurve = 'ease-in-out';
    this.framePerSecond = 60;
    // attr line
    this.color = 'blue';
    this.lineWidth = 5;
    this.colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple']; // 定义其中颜色 如果再多 考虑随机
    Object.assign(this, config.base);
    Object.assign(this, config.attr);
};

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @desc Chart
 */
var Chart = function () {
    function Chart(config) {
        _classCallCheck$1(this, Chart);

        this.animation = false;
        this.margin = 2;
        this.config = new Config(config);
        this.canvasInit();
        this.animation = this.config.renderType !== enumRenderType.none;
        this.insert();
    }

    _createClass$1(Chart, [{
        key: 'insert',
        value: function insert() {
            this.dom.appendChild(this.canvas);
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.canvas.height = this.canvas.height;
        }
    }, {
        key: 'axiesChange',
        value: function axiesChange() {
            this.ctx.scale(1, -1);
            this.ctx.translate(this.margin, -this.config.height * this.pixelRatio + this.margin);
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
    }]);

    return Chart;
}();

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * default class Vector
 */
var Vector = function () {
    function Vector(vector) {
        _classCallCheck$3(this, Vector);

        this.vector = vector;
        this.value = this.getValue(this);
    }
    // 向量加


    _createClass$2(Vector, [{
        key: "add",
        value: function add(vec) {
            return new Vector({
                x: this.vector.x + vec.vector.x,
                y: this.vector.y + vec.vector.y
            });
        }
        // 向量减

    }, {
        key: "minus",
        value: function minus(vec) {
            return new Vector({
                x: this.vector.x - vec.vector.x,
                y: this.vector.y - vec.vector.y
            });
        }
        // 向量点积
        // 物理含义 可以用来vec 在当前向量上的投影
        // 或者用来求两个向量的夹角

    }, {
        key: "dot",
        value: function dot(vec) {
            return this.vector.x * vec.vector.x + this.vector.y * vec.vector.y;
        }
        // 向量叉积 的值
        // 向量叉积的返回值应该是一个向量而非值，只是方向为垂直当前二维平面，所以在二维平面中，忽略他的方向
        // 物理含义 用来求向量围成的平行四边形的面积

    }, {
        key: "cross",
        value: function cross(vec) {
            return this.vector.x * vec.vector.y - this.vector.y * vec.vector.x;
        }
        // 向量模

    }, {
        key: "mod",
        value: function mod() {
            var isSqrt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (isSqrt) {
                return Math.sqrt(Math.pow(this.vector.x, 2) + Math.pow(this.vector.y, 2));
            } else {
                return Math.pow(this.vector.x, 2) + Math.pow(this.vector.y, 2);
            }
        }
        // 垂直向量 默认返回单位向量

    }, {
        key: "vertical",
        value: function vertical() {
            return new Vector({
                x: this.vector.y,
                y: -this.vector.x
            }).normaliz();
        }
        // 向量之间夹角

    }, {
        key: "ankle",
        value: function ankle(vec) {
            var result = Math.acos(this.dot(vec) / (this.mod() * vec.mod())) * 180 / Math.PI;
            return result > 180 ? result - 180 : result;
        }
        // 转化为法向量

    }, {
        key: "normaliz",
        value: function normaliz() {
            var x = Math.sqrt(1 / (Math.pow(this.vector.y, 2) / Math.pow(this.vector.x, 2) + 1));
            return new Vector({
                x: x,
                y: x === 0 ? 1 : this.vector.y / this.vector.x * x
            });
        }
    }, {
        key: "getValue",
        value: function getValue(vec) {
            return Math.sqrt(Math.pow(vec.vector.x, 2) + Math.pow(vec.vector.y, 2));
        }
    }]);

    return Vector;
}();

/**
 * @desc common help util
 */
function getLength(p1, p2) {
    return new Vector({
        x: p2.x - p1.x,
        y: p2.y - p1.y
    }).value;
}
function getTotal(arr) {
    var n = 0;
    arr.map(function (v) {
        return n += v;
    });
    return n;
}

var _createClass$1$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import bezierEasing from 'bezier-easing';
var bezierEasing = require('bezier-easing');
// 3次贝塞尔曲线

var Bezier = function () {
    function Bezier(p1, p2) {
        _classCallCheck$1$1(this, Bezier);

        this.p0 = {
            x: 0,
            y: 0
        };
        this.p3 = {
            x: 1,
            y: 1
        };
        this.p1 = p1;
        this.p2 = p2;
        this.bezierStr = p1.x + ', ' + p1.y + ', ' + p2.x + ', ' + p2.y;
        this.easing = bezierEasing(p1.x, p1.y, p2.x, p2.y);
    }

    _createClass$1$1(Bezier, [{
        key: 'getPoint',
        value: function getPoint(t) {
            return {
                x: this.p0.x * Math.pow(1 - t, 3) + this.p1.x * t * Math.pow(1 - t, 2) * 3 + this.p2.x * Math.pow(t, 2) * (1 - t) * 3 + this.p3.x * Math.pow(t, 3),
                y: this.p0.y * Math.pow(1 - t, 3) + this.p1.y * t * Math.pow(1 - t, 2) * 3 + this.p2.y * Math.pow(t, 2) * (1 - t) * 3 + this.p3.y * Math.pow(t, 3)
            };
        }
    }, {
        key: 'getYByTime',
        value: function getYByTime(t) {
            return this.easing(t);
        }
    }]);

    return Bezier;
}();

var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @description animation module
 */
var Animation = function () {
    /**
     *
     * @param begin 初始value
     * @param end 最终value
     * @param time 持续时间
     * @param animationType 运动类型 etc:ease-in ease-out
     */
    function Animation(begin, end, time) {
        var animationType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'liner';

        _classCallCheck$4(this, Animation);

        this.begin = begin;
        this.end = end;
        this.time = time;
        this.animationType = animationType;
        this.getBazier();
    }

    _createClass$3(Animation, [{
        key: 'getValue',
        value: function getValue(t) {
            return this.begin + (this.end - this.begin) * this.bezier.getYByTime(t);
        }
    }, {
        key: 'getList',
        value: function getList() {
            var framePerSecond = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 60;

            var list = [];
            for (var i = 0; i <= framePerSecond * this.time; i = i + 1) {
                list.push(this.getValue(i / (this.time * framePerSecond)));
            }
            return list;
        }
    }, {
        key: 'getBazier',
        value: function getBazier() {
            var p1 = void 0;
            var p2 = void 0;
            switch (this.animationType) {
                case 'liner':
                    p1 = {
                        x: 0,
                        y: 0
                    };
                    p2 = {
                        x: 1,
                        y: 1
                    };
                    break;
                case 'ease':
                    p1 = {
                        x: 0.25,
                        y: 0.1
                    };
                    p2 = {
                        x: 0.25,
                        y: 1
                    };
                    break;
                case 'ease-in':
                    p1 = {
                        x: 0.42,
                        y: 0
                    };
                    p2 = {
                        x: 1,
                        y: 1
                    };
                    break;
                case 'ease-out':
                    p1 = {
                        x: 0,
                        y: 0
                    };
                    p2 = {
                        x: 0.58,
                        y: 1
                    };
                    break;
                case 'ease-in-out':
                    p1 = {
                        x: 0.42,
                        y: 0
                    };
                    p2 = {
                        x: 0.58,
                        y: 1
                    };
                    break;
                case 'in-back-out':
                    p1 = {
                        x: 0.68,
                        y: -0.55
                    };
                    p2 = {
                        x: 0.27,
                        y: 1.55
                    };
                    break;
                default:
                    // point str
                    var strArr = this.animationType.split(',');
                    if (!strArr || strArr.length !== 4) {
                        throw new Error('The animation type is not right');
                    }
                    p1 = {
                        x: parseFloat(strArr[0]),
                        y: parseFloat(strArr[1])
                    };
                    p2 = {
                        x: parseFloat(strArr[2]),
                        y: parseFloat(strArr[3])
                    };
            }
            this.bezier = new Bezier(p1, p2);
        }
    }]);

    return Animation;
}();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @description line chart (折线图)
 */
var Line = function (_Chart) {
    _inherits(Line, _Chart);

    function Line(config) {
        _classCallCheck(this, Line);

        var _this = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, config));

        _this.pointList = [];
        _this.renderAttr = {
            lengthList: [],
            frameList: []
        };
        return _this;
    }

    _createClass(Line, [{
        key: 'update',
        value: function update(data) {
            this.data = data;
            var marginX = (this.config.width - this.margin * 2) / (this.data.length - 1);
            var maxY = Math.max.apply(Math, _toConsumableArray(this.data));
            var minY = Math.min.apply(Math, _toConsumableArray(this.data));
            var rateY = maxY !== minY ? (this.config.height - this.margin * 2) / (maxY - minY) : 1;
            var pointList = [];
            var lengthList = [];
            var frameList = [];
            var last = 0;
            for (var i = 0; i < this.data.length; i = i + 1) {
                var p = {
                    x: i * marginX * this.pixelRatio,
                    y: (this.data[i] - minY) * rateY * this.pixelRatio
                };
                pointList.push(p);
            }
            if (this.animation) {
                for (var _i = 1; _i < pointList.length; _i = _i + 1) {
                    lengthList.push(getLength(pointList[_i - 1], pointList[_i]));
                    if (this.config.renderType === enumRenderType.point) {
                        frameList = frameList.concat(new Animation(last, lengthList[_i - 1] + last, this.config.renderTime / pointList.length, this.config.renderCurve).getList(this.config.framePerSecond));
                        last += lengthList[_i - 1];
                    }
                }
                if (this.config.renderType === enumRenderType.total) {
                    frameList = new Animation(0, getTotal(lengthList), this.config.renderTime, this.config.renderCurve).getList(this.config.framePerSecond);
                }
                this.renderAttr.lengthList = lengthList;
                this.renderAttr.frameList = frameList;
            }
            this.pointList = pointList;
            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            this.reset();
            this.ctx.save();
            this.axiesChange();
            this.ctx.lineCap = 'round';
            this.ctx.strokeStyle = this.config.color;
            this.ctx.lineWidth = this.config.lineWidth;
            this.ctx.beginPath();
            if (this.config.renderType === enumRenderType.none) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.pointList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var p = _step.value;

                        this.ctx.lineTo(p.x, p.y);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            } else if (this.config.renderType === enumRenderType.point) {
                this.frameRender(this.renderAttr);
            } else if (this.config.renderType === enumRenderType.total) {
                this.frameRender(this.renderAttr);
            }
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
            return this;
        }
    }, {
        key: 'frameRender',
        value: function frameRender(obj) {
            var _this2 = this;

            requestAnimationFrame(function () {
                if (!obj.frameList.length) {
                    return;
                }
                var len = obj.frameList.shift();
                var p = _this2.getPointByFrame(len, obj.lengthList);
                _this2.reset();
                _this2.ctx.lineCap = 'round';
                _this2.ctx.strokeStyle = _this2.config.color;
                _this2.ctx.lineWidth = _this2.config.lineWidth;
                _this2.axiesChange();
                _this2.ctx.beginPath();
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = p[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var i = _step2.value;

                        _this2.ctx.lineTo(i.x, i.y);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                _this2.ctx.stroke();
                _this2.ctx.closePath();
                _this2.ctx.restore();
                if (obj.frameList.length) {
                    _this2.frameRender(obj);
                }
            });
        }
    }, {
        key: 'getPointByFrame',
        value: function getPointByFrame(len, list) {
            var index = void 0;
            var last = 0;
            // 找到对应的片段 比如 找到 index 0 那这个点就在 Point 0 1 之间
            for (var i = 0; i < list.length; i = i + 1) {
                if (len <= list[i] + last) {
                    index = i;
                    break;
                } else {
                    last += list[i];
                }
            }
            var val = list[index];
            var rate = (len - last) / val;
            return this.pointList.slice(0, index + 1).concat({
                x: this.pointList[index].x + (this.pointList[index + 1].x - this.pointList[index].x) * rate,
                y: this.pointList[index].y + (this.pointList[index + 1].y - this.pointList[index].y) * rate
            });
        }
    }]);

    return Line;
}(Chart);

var _createClass$4 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @desc bar chart (柱状图)
 */
var Bar = function (_Chart) {
    _inherits$1(Bar, _Chart);

    function Bar(config) {
        _classCallCheck$5(this, Bar);

        var _this = _possibleConstructorReturn$1(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).call(this, config));

        _this.data = [];
        _this.heightList = [];
        _this.renderAttr = {
            frameList: []
        };
        return _this;
    }

    _createClass$4(Bar, [{
        key: 'update',
        value: function update(data) {
            this.data = data;
            var maxBarWidth = (this.config.width - data.length - 1) / data.length;
            var aveBarWidth = this.config.width / (data.length * 2 + 1);
            if (this.config.barWidth) {
                if (this.config.barWidth > maxBarWidth) {
                    this.config.barWidth = maxBarWidth;
                }
            } else {
                this.config.barWidth = aveBarWidth;
            }
            var maxY = Math.max.apply(Math, _toConsumableArray$1(this.data));
            var minY = 0;
            var rateY = maxY !== minY ? (this.config.height - this.margin * 2) / (maxY - minY) : 1;
            // tslint:disable prefer-for-of
            for (var i = 0; i < this.data.length; i = i + 1) {
                if (rateY === 1 && maxY === 0) {
                    // this.heightList.push((this.config.height - minY) / 2);
                    this.heightList.push(1);
                } else {
                    this.heightList.push((this.data[i] - minY) * rateY);
                }
                if (this.config.renderType === enumRenderType.total) {
                    this.renderAttr.frameList.push(new Animation(0, this.heightList[i], this.config.renderTime, this.config.renderCurve).getList(this.config.framePerSecond));
                }
            }
            // tslint:enable prefer-for-of
            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.config.renderType === enumRenderType.none) {
                this.renderWidthNoFrame();
            } else if (this.config.renderType === enumRenderType.total) {
                this.renderWidthFrame();
            }
            return this;
        }
    }, {
        key: 'renderWidthNoFrame',
        value: function renderWidthNoFrame() {
            this.reset();
            this.ctx.save();
            this.axiesChange();
            for (var i = 0; i < this.heightList.length; i = i + 1) {
                this.ctx.beginPath();
                this.ctx.fillStyle = this.config.colors[i];
                this.ctx.fillRect(this.config.barWidth * (i * 2 + 1) * this.pixelRatio, 0, this.config.barWidth * this.pixelRatio, this.heightList[i] * this.pixelRatio);
                this.ctx.closePath();
            }
            this.ctx.restore();
        }
    }, {
        key: 'renderWidthFrame',
        value: function renderWidthFrame() {
            var _this2 = this;

            requestAnimationFrame(function () {
                _this2.reset();
                _this2.ctx.save();
                _this2.axiesChange();
                for (var i = 0; i < _this2.heightList.length; i = i + 1) {
                    _this2.ctx.beginPath();
                    _this2.ctx.fillStyle = _this2.config.colors[i];
                    _this2.ctx.fillRect(_this2.config.barWidth * (i * 2 + 1) * _this2.pixelRatio, 0, _this2.config.barWidth * _this2.pixelRatio, _this2.renderAttr.frameList[i].shift() * _this2.pixelRatio);
                    _this2.ctx.closePath();
                }
                _this2.ctx.restore();
                if (_this2.renderAttr.frameList[0].length) {
                    _this2.renderWidthFrame();
                }
            });
        }
    }]);

    return Bar;
}(Chart);

/**
 * @description entry
 */
var index = {
  line: Line,
  bar: Bar
};

export default index;
//# sourceMappingURL=simply-chart.esm.js.map
