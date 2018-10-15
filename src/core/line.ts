/**
 * @description line chart (折线图)
 */

import Chart from '@/core/chart';
import { getLength, getTotal } from '@/lib/help';
import { enumRenderType, IConfig, IPoint, IRender } from '@/lib/interface';
import Animation from 'canvas-bezier-curve';
import bezierSmooth from 'Lib/geometric/bezier-smooth';
import catmullRom from 'Lib/geometric/catmull-rom';

enum smoothType {
    catumulRom = 'catumulRom',
    bezierSmooth = 'bezierSmooth',
}

export default class Line extends Chart {
    private data: number[];

    private pointList: IPoint[] = [];
    private renderAttr: IRender = {
        lengthList: [],
        frameList: [],
    };

    private smoothType: smoothType = smoothType.catumulRom;

    constructor(config: IConfig) {
        super(config);
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

    public render(): Line {
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
            const min: number = 0;
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
            this.ctx.moveTo(0, 0);

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
