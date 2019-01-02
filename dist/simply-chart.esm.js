/**
 * @description interface
 */
var enumRenderType;
(function (enumRenderType) {
    enumRenderType["none"] = "none";
    enumRenderType["point"] = "point";
    enumRenderType["total"] = "total";
})(enumRenderType || (enumRenderType = {}));

/**
 * @description hook
 */
var hookName = '__DATA_DEBUGGER_DEVTOOLS_GLOBAL_HOOK__';
var hook = window ? window[hookName] : '';
var hasInstall = false;
var debuggerMode = true;
var debuggerData = [];

var hookInstall = function hookInstall() {
    if (hook && !hasInstall) {
        hook.emit('install');
        hasInstall = true;
    }
};
var setDebuggerData = function setDebuggerData() {
    if (debuggerMode || !window) {
        if (window.__Canvas_Screen_Data) {
            return;
        }
        window.__Canvas_Screen_Data = debuggerData;
    }
};
var hookDispatch = function hookDispatch() {
    if (!debuggerMode || !hook) {
        return;
    }
    setDebuggerData();
    hook.emit('refresh');
};
var addDebuggerData = function addDebuggerData(obj) {
    var item = obj;
    var fItem = debuggerData.find(function (v) {
        return v.id === item.id;
    });
    if (!fItem) {
        debuggerData.push(item);
    } else {
        fItem = obj;
    }
    hookDispatch();
};

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @desc Chart
 */
var baseDefault = {
    // dom: '',
    width: 200,
    height: 100,
    padding: 10,
    renderType: enumRenderType.none,
    renderTime: 2,
    renderCurve: 'ease-in-out',
    framePerSecond: 60
};
var id = 0;
/**
 * default class
 */

var Chart = function () {
    function Chart(config, defaultConf) {
        _classCallCheck$1(this, Chart);

        this.animation = false;
        this.config = Object.assign({}, baseDefault, defaultConf, config.base, config.attr);
        this.config.innerWidth = this.config.width - this.config.padding * 2;
        this.config.innerHeight = this.config.height - this.config.padding * 2;
        // this.config = new Config(config);
        this.canvasInit();
        this.animation = this.config.renderType !== enumRenderType.none;
        this.insert();
        this.getName();
        hookInstall();
        addDebuggerData(this);
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
            // 重新处理这段 没有居中
            this.ctx.scale(1, -1);
            this.ctx.translate(this.config.padding * this.pixelRatio, (-this.config.height + this.config.padding) * this.pixelRatio);
        }
    }, {
        key: 'canvasInit',
        value: function canvasInit() {
            if (this.config.dom === undefined) {
                // for test ?
                this.dom = document.createElement('div');
                document.body.appendChild(this.dom);
            } else if (typeof this.config.dom === 'string') {
                this.dom = document.querySelector(this.config.dom);
            } else {
                this.dom = this.config.dom;
            }
            this.canvas = this.config.canvas || document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.pixelRatio = window.devicePixelRatio;
            this.canvas.width = this.config.width * this.pixelRatio;
            this.canvas.height = this.config.height * this.pixelRatio;
            this.canvas.style.width = this.config.width + 'px';
            this.canvas.style.height = this.config.height + 'px';
        }
    }, {
        key: 'getName',
        value: function getName() {
            this.id = id;
            id = id + 1;
            this.name = this.constructor.name + '_' + this.id;
        }
    }]);

    return Chart;
}();

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * default class Vector
 */
var Vector = function () {
    function Vector(vector) {
        _classCallCheck$2(this, Vector);

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

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

        _classCallCheck$3(this, Animation);

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

/**
 * @desc smooth line generator wit beziur
 * doc: https://wenku.baidu.com/view/19682071f242336c1eb95e47.html
 */
var bezierSmooth = (function (path) {
    return getBezierList(path);
});
function getControl(P0, P1, P2, P3) {
    var rate1 = 0.25;
    var rate2 = 0.25;
    return [P1, {
        x: P1.x + rate1 * (P2.x - P0.x),
        y: P1.y + rate1 * (P2.y - P0.y)
    }, {
        x: P2.x - rate2 * (P3.x - P1.x),
        y: P2.y - rate2 * (P3.y - P1.y)
    }, P2];
}
function getBezierList(path) {
    var length = path.length;
    var outPath = [];
    for (var i = 0; i < length - 1; i += 1) {
        var controlP = getControl(path[Math.max(0, i - 1)], // safe array steps
        path[i], path[Math.min(i + 1, length - 1)], // safe Array steps
        path[Math.min(i + 2, length - 1)]);
        outPath.push(controlP); //store each value
    }
    return outPath;
}

/**
 * @desc Splines, Catmull-Rom algorithm for smooth movement
 * wiki: http://www.dxstudio.com/guide_content.aspx?id=70a2b2cf-193e-4019-859c-28210b1da81f
 * for get smooth line points
 */
var catmullRom = (function (path, frame) {
    return savePathCatmullRom(path, frame).map(function (v) {
        return v.vector;
    });
});
function interpolatedPosition(P0, P1, P2, P3, u) {
    // exp: Catmull-Rom interpolation
    var u3 = u * u * u;
    var u2 = u * u;
    var f1 = u3 * -0.5 + u2 - u * 0.5;
    var f2 = u3 * 1.5 - u2 * 2.5 + 1;
    var f3 = u3 * -1.5 + u2 * 2 + u * 0.5;
    var f4 = u3 * 0.5 - u2 * 0.5;
    var x = P0.x * f1 + P1.x * f2 + P2.x * f3 + P3.x * f4;
    var y = P0.y * f1 + P1.y * f2 + P2.y * f3 + P3.y * f4;
    return new Vector({
        x: x,
        y: y
    });
}
var nodesLeft = 0;
// main function to calculate the Path
function savePathCatmullRom(path, frame) {
    if (!path) {
        return;
    }
    var length = path.length;
    var outPath = [];
    for (var i = 0; i < length - 1; i += 1) {
        // var ui = 0;
        for (var u = 0; u < 1; u += 1 / frame) {
            // var vec = new Vector();
            var vec = interpolatedPosition(
            //call to Catmull-Rom
            path[Math.max(0, i - 1)], // safe array steps
            path[i], path[Math.min(i + 1, length - 1)], // safe Array steps
            path[Math.min(i + 2, length - 1)], // safe Array steps
            u);
            outPath.push(vec); //store each value
            nodesLeft += 1; // increment node counter
            // ui++;
        }
    }
    return outPath;
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @description line chart (折线图)
 */
var smoothType;
(function (smoothType) {
    smoothType["catumulRom"] = "catumulRom";
    smoothType["bezierSmooth"] = "bezierSmooth";
})(smoothType || (smoothType = {}));
/**
 * default class
 */

var Line = function (_Chart) {
    _inherits(Line, _Chart);

    function Line(config) {
        _classCallCheck(this, Line);

        var _this = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, config, {
            color: 'blue',
            lineWidth: 5,
            point: false,
            pointRadius: 3,
            pointFill: false,
            smooth: false,
            shadowColor: ''
        }));

        _this.pointList = [];
        _this.renderAttr = {
            lengthList: [],
            frameList: []
        };
        _this.smoothType = smoothType.catumulRom;
        return _this;
    }

    _createClass(Line, [{
        key: 'point',
        value: function point() {
            this.config.point = true;
            return this;
        }
    }, {
        key: 'fill',
        value: function fill() {
            this.config.pointFill = true;
            return this;
        }
    }, {
        key: 'update',
        value: function update(data) {
            this.data = data;
            // 长度为1 默认打开point
            if (this.data.length === 1) {
                this.point();
                this.fill();
            }
            var marginX = this.data.length !== 1 ? this.config.innerWidth / (this.data.length - 1) : this.config.innerWidth / 2;
            var maxY = Math.max.apply(Math, _toConsumableArray(this.data));
            var minY = Math.min.apply(Math, _toConsumableArray(this.data));
            var rateY = maxY !== minY ? this.config.innerHeight / (maxY - minY) : 1;
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
            if (this.config.renderType === enumRenderType.none) {
                this.renderNoAnimation();
            } else if (this.config.renderType === enumRenderType.point) {
                this.frameRender(this.renderAttr);
            } else if (this.config.renderType === enumRenderType.total) {
                this.frameRender(this.renderAttr);
            }
            return this;
        }
    }, {
        key: 'renderStrike',
        value: function renderStrike(pL) {
            this.ctx.lineCap = 'round';
            this.ctx.lineWidth = this.config.lineWidth;
            if (this.config.shadowColor) {
                // 补齐三条边
                // 最低点取决于线条宽度，如果线条宽度过粗，可能会导致最低点跳出页面
                var min = 1 - this.config.lineWidth;
                this.ctx.beginPath();
                this.ctx.strokeStyle = this.config.shadowColor;
                this.ctx.moveTo(pL[0].x, pL[0].y);
                this.ctx.lineTo(0, min);
                this.ctx.lineTo(pL[pL.length - 1].x, min);
                this.ctx.lineTo(pL[pL.length - 1].x, pL[pL.length - 1].y);
                this.ctx.stroke();
                this.ctx.closePath();
            }
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.config.color;
            this.ctx.moveTo(pL[0].x, pL[0].y);
            for (var i = 1; i < pL.length; i = i + 1) {
                var p = pL[i];
                // for (const p of pL) {
                this.ctx.lineTo(p.x, p.y);
            }
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }, {
        key: 'renderFill',
        value: function renderFill(pL) {
            if (!this.config.shadowColor) {
                return;
            }
            this.ctx.beginPath();
            this.ctx.fillStyle = this.config.shadowColor;
            this.ctx.moveTo(0, 0);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = pL[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

            this.ctx.lineTo(pL[pL.length - 1].x, 0);
            this.ctx.fill();
            this.ctx.closePath();
        }
    }, {
        key: 'renderNoAnimation',
        value: function renderNoAnimation() {
            this.reset();
            this.axiesChange();
            this.ctx.save();
            this.ctx.beginPath();
            var pList = void 0;
            if (this.config.smooth) {
                var pL = catmullRom(this.pointList, 100);
                pList = pL;
            } else {
                pList = this.pointList;
            }
            // render border 与fill区域 区分为了边界没有border
            this.renderFill(pList);
            this.renderStrike(pList);
            this.ctx.closePath();
            this.ctx.restore();
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.pointList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var p = _step2.value;

                    this.renderPoint(p);
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
                var pList = void 0;
                _this2.reset();
                _this2.axiesChange();
                _this2.ctx.save();
                _this2.ctx.beginPath();
                if (_this2.config.smooth) {
                    // catmull-rom geomatric is smooth but becauese the chage of the last point
                    // the line will change with time
                    if (_this2.smoothType === smoothType.catumulRom) {
                        var pL = catmullRom(p, 100);
                        pList = pL;
                    } else if (_this2.smoothType === smoothType.bezierSmooth) {
                        var _pL = bezierSmooth(p);
                        _this2.ctx.moveTo(p[0].x, p[0].y);
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = _pL[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var i = _step3.value;

                                _this2.ctx.bezierCurveTo(i[1].x, i[1].y, i[2].x, i[2].y, i[3].x, i[3].y);
                            }
                            // pList = pL;
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }
                    }
                } else {
                    pList = p;
                }
                _this2.renderFill(pList);
                _this2.renderStrike(pList);
                _this2.ctx.closePath();
                _this2.ctx.restore();
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = p[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var _i2 = _step4.value;

                        _this2.renderPoint(_i2);
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                if (obj.frameList.length) {
                    _this2.frameRender(obj);
                }
            });
        }
    }, {
        key: 'renderPoint',
        value: function renderPoint(p) {
            if (!this.config.point) {
                return;
            }
            var radius = this.config.pointRadius * this.pixelRatio;
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
            if (this.config.pointFill) {
                this.ctx.fillStyle = this.config.color;
                this.ctx.fill();
            } else {
                this.ctx.lineWidth = this.config.lineWidth;
                this.ctx.strokeStyle = this.config.color;
                this.ctx.stroke();
                this.ctx.fillStyle = '#fff';
                this.ctx.fill();
            }
            this.ctx.closePath();
            this.ctx.restore();
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

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @desc bar chart (柱状图)
 */
/**
 * default class
 */

var Bar = function (_Chart) {
    _inherits$1(Bar, _Chart);

    function Bar(config) {
        _classCallCheck$4(this, Bar);

        var _this = _possibleConstructorReturn$1(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).call(this, config, {
            barRadius: 5,
            colors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple']
        }));

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
            var maxBarWidth = (this.config.innerWidth - data.length - 1) / data.length;
            var aveBarWidth = this.config.innerWidth / (data.length * 2 + 1);
            if (this.config.barWidth) {
                if (this.config.barWidth > maxBarWidth) {
                    this.config.barWidth = maxBarWidth;
                }
            } else {
                this.config.barWidth = aveBarWidth;
            }
            var maxY = Math.max.apply(Math, _toConsumableArray$1(this.data));
            var minY = 0;
            var rateY = maxY !== minY ? this.config.innerHeight / (maxY - minY) : 1;
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
                this.renderRadius(this.config.barWidth * (i * 2 + 1) * this.pixelRatio, 0, this.config.barWidth * this.pixelRatio, this.heightList[i] * this.pixelRatio);
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
                    _this2.renderRadius(_this2.config.barWidth * (i * 2 + 1) * _this2.pixelRatio, 0, _this2.config.barWidth * _this2.pixelRatio, _this2.renderAttr.frameList[i].shift() * _this2.pixelRatio);
                    _this2.ctx.closePath();
                }
                _this2.ctx.restore();
                if (_this2.renderAttr.frameList[0].length) {
                    _this2.renderWidthFrame();
                }
            });
        }
    }, {
        key: 'renderRadius',
        value: function renderRadius(x, y, width, height) {
            var min = Math.min(width, height);
            var radius = this.config.barRadius > min / 2 ? min / 2 : this.config.barRadius;
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, y + height - radius);
            this.ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0, Math.PI * 0.5, true);
            this.ctx.lineTo(x + width - radius, y + height);
            this.ctx.arc(x + width - radius, y + height - radius, radius, Math.PI * 1.5, Math.PI * 2, true);
            this.ctx.lineTo(x + width, y);
            this.ctx.fill();
        }
    }]);

    return Bar;
}(Chart);

var _createClass$5 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @desc pie chart (饼图)
 */
/**
 * default class
 */

var Pie = function (_Chart) {
    _inherits$2(Pie, _Chart);

    function Pie(config) {
        _classCallCheck$5(this, Pie);

        var _this = _possibleConstructorReturn$2(this, (Pie.__proto__ || Object.getPrototypeOf(Pie)).call(this, config, {
            colors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple'],
            fill: false
        }));

        _this.data = [];
        _this.renderData = [];
        _this.renderFrameData = [];
        _this.pieCircularWidth = 10;
        return _this;
    }

    _createClass$5(Pie, [{
        key: 'update',
        value: function update(data) {
            var _this2 = this;

            this.data = data;
            this.renderData = [];
            this.renderFrameData = [];
            this.center = {
                x: (this.config.width / 2 - this.config.padding) * this.pixelRatio,
                y: (this.config.height / 2 - this.config.padding) * this.pixelRatio
            };
            this.pieWidth = (Math.min(this.config.width, this.config.height) / 2 - this.config.padding) * this.pixelRatio;
            // 如果pieCircleWidh比pieWidth小 取其一半
            this.pieCircularWidth = (this.pieWidth < this.pieCircularWidth ? this.pieWidth / 2 : this.pieCircularWidth) * this.pixelRatio;
            var total = data.reduce(function (a, b) {
                return a + b;
            });
            var items = [];
            data.map(function (v) {
                var last = _this2.renderData.length ? _this2.renderData[_this2.renderData.length - 1] : null;
                var start = last ? last.end : 0;
                var end = start + v / total * Math.PI * 2;
                _this2.renderData.push({
                    start: start,
                    end: end,
                    x: !last ? _this2.center.x + _this2.pieWidth : _this2.center.x + _this2.pieWidth * Math.cos(last.end),
                    y: !last ? _this2.center.y : _this2.center.y + _this2.pieWidth * Math.sin(last.end)
                });
                if (_this2.config.renderType === enumRenderType.point) {
                    var item = new Animation(start, end, _this2.config.renderTime, _this2.config.renderCurve).getList(_this2.config.framePerSecond);
                    items.push(item);
                }
            });
            if (items.length) {
                // enumRenderType.point
                for (var j = 0; j < items[0].length; j = j + 1) {
                    var item = [];
                    for (var i = 0; i < items.length; i = i + 1) {
                        item.push(Object.assign({}, this.renderData[i], { end: items[i][j] }));
                    }
                    this.renderFrameData.push(item);
                }
            }
            if (this.config.renderType === enumRenderType.total) {
                var _item = new Animation(0, Math.PI * 2, this.config.renderTime, this.config.renderCurve).getList(this.config.framePerSecond);
                _item.map(function (v) {
                    var t = [];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = _this2.renderData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _i = _step.value;

                            if (_i.end <= v) {
                                t.push(_i);
                            } else {
                                t.push(Object.assign({}, _i, { end: v }));
                                break;
                            }
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

                    _this2.renderFrameData.push(t);
                });
            }
            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.config.renderType === enumRenderType.none) {
                this.renderWithNoFrame();
            } else if (this.config.renderType === enumRenderType.point) {
                this.renderWithFrame();
            } else if (this.config.renderType === enumRenderType.total) {
                this.renderWithFrame();
            }
            return this;
        }
    }, {
        key: 'renderWithNoFrame',
        value: function renderWithNoFrame() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.renderData;
            var fn = arguments[1];

            this.reset();
            this.ctx.save();
            this.axiesChange();
            for (var i = 0; i < data.length; i = i + 1) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.center.x, this.center.y);
                var color = this.config.colors[i];
                var item = data[i];
                this.ctx.lineTo(item.x, item.y);
                this.ctx.fillStyle = color;
                this.ctx.arc(this.center.x, this.center.y, this.pieWidth, item.start, item.end, false);
                this.ctx.fill();
                this.ctx.closePath();
            }
            this.renderFill();
            this.ctx.restore();
            if (fn) {
                fn.call(this);
            }
        }
    }, {
        key: 'renderWithFrame',
        value: function renderWithFrame() {
            var _this3 = this;

            requestAnimationFrame(function () {
                if (_this3.renderFrameData.length) {
                    _this3.renderWithNoFrame(_this3.renderFrameData.shift(), _this3.renderWithFrame);
                }
            });
        }
        /**
         * 绘制饼图中心区域
         */

    }, {
        key: 'renderFill',
        value: function renderFill() {
            if (!this.config.fill) {
                return;
            }
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.fillStyle = 'white';
            this.ctx.arc(this.center.x, this.center.y, this.pieWidth - this.pieCircularWidth, 0, Math.PI * 2, false);
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.restore();
        }
    }]);

    return Pie;
}(Chart);

var _createClass$6 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @desc 比例图
 */
/**
 * default class
 */

var Radius = function (_Chart) {
    _inherits$3(Radius, _Chart);

    function Radius(config) {
        _classCallCheck$6(this, Radius);

        var _this = _possibleConstructorReturn$3(this, (Radius.__proto__ || Object.getPrototypeOf(Radius)).call(this, Object.assign({}, config), {
            color: 'red',
            pieColor: '#ccc'
        }));

        _this.ankle = 0;
        _this.pieCircularWidth = 10;
        return _this;
    }

    _createClass$6(Radius, [{
        key: 'update',
        value: function update(data) {
            this.data = data;
            this.ankle = data / 100 * Math.PI * 2;
            this.center = {
                x: (this.config.width / 2 - this.config.padding) * this.pixelRatio,
                y: (this.config.height / 2 - this.config.padding) * this.pixelRatio
            };
            this.pieWidth = (Math.min(this.config.width, this.config.height) / 2 - this.config.padding) * this.pixelRatio;
            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.config.renderType === enumRenderType.none) {
                this.renderWithNoFrame();
            }
            return this;
        }
    }, {
        key: 'renderWithNoFrame',
        value: function renderWithNoFrame() {
            this.reset();
            this.ctx.save();
            this.axiesChange();
            this.ctx.beginPath();
            this.ctx.moveTo(this.center.x, this.center.y);
            this.ctx.fillStyle = this.config.pieColor;
            this.ctx.arc(this.center.x, this.center.y, this.pieWidth, 0, Math.PI * 2, false);
            this.ctx.fill();
            this.ctx.closePath();
            this.renderColor();
            this.renderFill();
            this.ctx.restore();
        }
    }, {
        key: 'renderColor',
        value: function renderColor() {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.moveTo(this.center.x, this.center.y);
            this.ctx.fillStyle = this.config.color;
            this.ctx.arc(this.center.x, this.center.y, this.pieWidth, 0, this.ankle, false);
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.restore();
        }
        /**
         * 绘制中心区域
         */

    }, {
        key: 'renderFill',
        value: function renderFill() {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.fillStyle = 'white';
            this.ctx.arc(this.center.x, this.center.y, this.pieWidth - this.pieCircularWidth, 0, Math.PI * 2, false);
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.restore();
        }
    }]);

    return Radius;
}(Chart);

/**
 * @description entry
 */
var index = {
    line: Line,
    bar: Bar,
    pie: Pie,
    radius: Radius,
    Line: Line,
    Bar: Bar,
    Pie: Pie,
    Radius: Radius
};

export default index;
//# sourceMappingURL=simply-chart.esm.js.map
