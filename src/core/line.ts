/**
 * @description line chart (折线图)
 */

import Chart from '@/core/chart';
import { getLength, getTotal } from '@/lib/help';
import {
    enumRenderType,
    ILineConf,
    ILineConfig,
    IPoint,
    IRender,
} from '@/lib/interface';
import Animation from 'canvas-bezier-curve';
import bezierSmooth from 'Lib/geometric/bezier-smooth';
import catmullRom from 'Lib/geometric/catmull-rom';

enum smoothType {
    catumulRom = 'catumulRom',
    bezierSmooth = 'bezierSmooth',
}

interface IPositionAttr {
    marginX: number;
    minY: number;
    maxY: number;
    rateY: number;
}

/**
 * default class
 */
export default class Line extends Chart {
    public config: ILineConfig;
    private data: number[];

    private pointList: IPoint[] = [];
    private renderAttr: IRender = {
        lengthList: [],
        frameList: [],
    };

    // 用来暂存update之后的内容，resize的时候参考
    private positionAttr: IPositionAttr;

    private smoothType: smoothType = smoothType.catumulRom;

    constructor(config: ILineConf) {
        super(config, {
            color: 'blue',
            lineWidth: 5,
            point: false,
            pointRadius: 3,
            pointFill: false,
            smooth: false,
            shadowColor: '',
        });
    }

    public eventBind(): void {
        // 所需要的事件绑定 只在绘制动画完成之后绑定，过程中不进行重复绑定
        this.mouseEvent.on('mouse-move', (): void => {
            // 判断是否出tooltip
        });
    }

    public eventOff(): void {
        // TODO
    }

    public onChart(): boolean {
        return true;
    }

    public renderToolTip(): void {
        // TODO
    }

    public reRender(): void {
        // TODO
        let isReRenderAnimation: boolean = true;
        if (this.renderAttr.frameList.length) {
            this.reset();
            isReRenderAnimation = false;
        }
        this.stopRender();

        if (isReRenderAnimation) {
            // 说明已经绘制完了 那就增量变化
            this.resizeUpdate();
            // this.update(this.data);
            // this.render();
        }
    }

    public stopRender(): void {
        this.renderAttr = {
            frameList: [],
            lengthList: [],
        };
        this.stopAnimation = true;
    }

    public point(): Line {
        this.config.point = true;

        return this;
    }

    public fill(): Line {
        this.config.pointFill = true;

        return this;
    }

    public update(data: number[]): Line {
        this.data = data;
        // 长度为1 默认打开point
        if (this.data.length === 1) {
            this.point();
            this.fill();
        }

        const marginX: number =
            this.data.length !== 1
                ? this.config.innerWidth / (this.data.length - 1)
                : this.config.innerWidth / 2;
        const maxY: number = Math.max(...this.data);
        const minY: number = Math.min(...this.data);
        const rateY: number =
            maxY !== minY ? this.config.innerHeight / (maxY - minY) : 1;
        this.positionAttr = {
            marginX,
            maxY,
            minY,
            rateY,
        };
        const pointList: IPoint[] = [];
        const lengthList: number[] = [];
        let frameList: number[] = [];
        let last: number = 0;

        for (let i: number = 0; i < this.data.length; i = i + 1) {
            const p: IPoint = {
                x: i * marginX * this.pixelRatio,
                y: (this.data[i] - minY) * rateY * this.pixelRatio,
            };
            pointList.push(p);
        }

        if (this.animation) {
            for (let i: number = 1; i < pointList.length; i = i + 1) {
                lengthList.push(getLength(pointList[i - 1], pointList[i]));
                if (this.config.renderType === enumRenderType.point) {
                    frameList = frameList.concat(
                        new Animation(
                            last,
                            lengthList[i - 1] + last,
                            this.config.renderTime / pointList.length,
                            this.config.renderCurve,
                        ).getList(this.config.framePerSecond),
                    );
                    last += lengthList[i - 1];
                }
            }
            if (this.config.renderType === enumRenderType.total) {
                frameList = new Animation(
                    0,
                    getTotal(lengthList),
                    this.config.renderTime,
                    this.config.renderCurve,
                ).getList(this.config.framePerSecond);
            }
            this.renderAttr.lengthList = lengthList;
            this.renderAttr.frameList = frameList;
        }

        this.pointList = pointList;

        return this;
    }

    // 用来在resize的时候触发的更新
    public resizeUpdate(): void {
        // 长度为1 默认打开point
        if (this.data.length === 1) {
            this.point();
            this.fill();
        }

        const marginX: number =
            this.data.length !== 1
                ? this.config.innerWidth / (this.data.length - 1)
                : this.config.innerWidth / 2;

        const marginXList: number[] = new Animation(
            this.positionAttr.marginX,
            marginX,
            this.config.renderTime / 10,
            this.config.renderCurve,
        ).getList(this.config.framePerSecond);

        const pointListFrameList: IPoint[][] = [];

        for (const j of marginXList) {
            const pointList: IPoint[] = [];
            for (let i: number = 0; i < this.data.length; i = i + 1) {
                const p: IPoint = {
                    x: i * j * this.pixelRatio,
                    y:
                        (this.data[i] - this.positionAttr.minY) *
                        this.positionAttr.rateY *
                        this.pixelRatio,
                };
                pointList.push(p);
            }
            pointListFrameList.push(pointList);
        }
        this.pointList = pointListFrameList[pointListFrameList.length - 1];
        this.positionAttr.marginX = marginX;

        this.stopAnimation = false;
        this.renderResize(pointListFrameList);
    }

    public render(): Line {
        this.stopAnimation = false;
        if (this.config.renderType === enumRenderType.none) {
            this.renderNoAnimation();
        } else if (this.config.renderType === enumRenderType.point) {
            this.frameRender(this.renderAttr);
        } else if (this.config.renderType === enumRenderType.total) {
            this.frameRender(this.renderAttr);
        }

        return this;
    }

    private renderStrike(pL: IPoint[]): void {
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = this.config.lineWidth;

        if (this.config.shadowColor) {
            // 补齐三条边
            // 最低点取决于线条宽度，如果线条宽度过粗，可能会导致最低点跳出页面
            const min: number = 1 - this.config.lineWidth;
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
        for (let i: number = 1; i < pL.length; i = i + 1) {
            const p: IPoint = pL[i];
            // for (const p of pL) {
            this.ctx.lineTo(p.x, p.y);
        }

        this.ctx.stroke();
        this.ctx.closePath();
    }

    private renderFill(pL: IPoint[]): void {
        if (!this.config.shadowColor) {
            return;
        }
        this.ctx.beginPath();
        this.ctx.fillStyle = this.config.shadowColor;
        this.ctx.moveTo(0, 0);
        for (const p of pL) {
            this.ctx.lineTo(p.x, p.y);
        }
        this.ctx.lineTo(pL[pL.length - 1].x, 0);
        this.ctx.fill();
        this.ctx.closePath();
    }

    private renderNoAnimation(): void {
        this.reset();
        this.axiesChange();
        this.ctx.save();
        this.ctx.beginPath();
        let pList!: IPoint[];
        if (this.config.smooth) {
            const pL: IPoint[] = catmullRom(this.pointList, 100);
            pList = pL;
        } else {
            pList = this.pointList;
        }

        // render border 与fill区域 区分为了边界没有border
        this.renderFill(pList);
        this.renderStrike(pList);

        this.ctx.closePath();
        this.ctx.restore();
        for (const p of this.pointList) {
            this.renderPoint(p);
        }
    }

    private frameRender(obj: IRender): void {
        requestAnimationFrame(() => {
            if (this.stopAnimation) {
                this.stopAnimation = false;

                return;
            }
            if (!obj.frameList.length) {
                return;
            }
            const len: number = obj.frameList.shift();
            const p: IPoint[] = this.getPointByFrame(len, obj.lengthList);
            let pList!: IPoint[];

            this.reset();
            this.axiesChange();
            this.ctx.save();
            this.ctx.beginPath();

            if (this.config.smooth) {
                // catmull-rom geomatric is smooth but becauese the chage of the last point
                // the line will change with time
                if (this.smoothType === smoothType.catumulRom) {
                    const pL: IPoint[] = catmullRom(p, 100);
                    pList = pL;
                } else if (this.smoothType === smoothType.bezierSmooth) {
                    const pL: IPoint[][] = bezierSmooth(p);
                    this.ctx.moveTo(p[0].x, p[0].y);
                    for (const i of pL) {
                        this.ctx.bezierCurveTo(
                            i[1].x,
                            i[1].y,
                            i[2].x,
                            i[2].y,
                            i[3].x,
                            i[3].y,
                        );
                    }
                    // pList = pL;
                }
            } else {
                pList = p;
            }

            this.renderFill(pList);
            this.renderStrike(pList);

            this.ctx.closePath();
            this.ctx.restore();
            for (const i of p) {
                this.renderPoint(i);
            }
            if (obj.frameList.length) {
                this.frameRender(obj);
            }
        });
    }

    private renderPoint(p: IPoint): void {
        if (!this.config.point) {
            return;
        }
        const radius: number = this.config.pointRadius * this.pixelRatio;
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

    private renderResize(obj: IPoint[][]): void {
        requestAnimationFrame(() => {
            if (this.stopAnimation) {
                this.stopAnimation = false;

                return;
            }
            if (!obj.length) {
                return;
            }
            // const pList: IPoint[] = obj.shift();
            // 因为是完整的平移 所以不需要根据lengthList来获取点，一定都是所有的点
            const p: IPoint[] = obj.shift();
            let pList!: IPoint[];

            this.reset();
            this.axiesChange();
            this.ctx.save();
            this.ctx.beginPath();

            if (this.config.smooth) {
                // catmull-rom geomatric is smooth but becauese the chage of the last point
                // the line will change with time
                if (this.smoothType === smoothType.catumulRom) {
                    const pL: IPoint[] = catmullRom(p, 100);
                    pList = pL;
                } else if (this.smoothType === smoothType.bezierSmooth) {
                    const pL: IPoint[][] = bezierSmooth(p);
                    this.ctx.moveTo(p[0].x, p[0].y);
                    for (const i of pL) {
                        this.ctx.bezierCurveTo(
                            i[1].x,
                            i[1].y,
                            i[2].x,
                            i[2].y,
                            i[3].x,
                            i[3].y,
                        );
                    }
                    // pList = pL;
                }
            } else {
                pList = p;
            }

            this.renderFill(pList);
            this.renderStrike(pList);

            this.ctx.closePath();
            this.ctx.restore();
            for (const i of p) {
                this.renderPoint(i);
            }
            if (obj.length) {
                this.renderResize(obj);
            }
        });
    }

    private getPointByFrame(len: number, list: number[]): IPoint[] {
        let index!: number;
        let last: number = 0;

        // 找到对应的片段 比如 找到 index 0 那这个点就在 Point 0 1 之间
        for (let i: number = 0; i < list.length; i = i + 1) {
            if (len <= list[i] + last) {
                index = i;
                break;
            } else {
                last += list[i];
            }
        }

        const val: number = list[index];
        const rate: number = (len - last) / val;

        return this.pointList.slice(0, index + 1).concat({
            x:
                this.pointList[index].x +
                (this.pointList[index + 1].x - this.pointList[index].x) * rate,
            y:
                this.pointList[index].y +
                (this.pointList[index + 1].y - this.pointList[index].y) * rate,
        });
    }
}
