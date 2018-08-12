/**
 * @description line chart (折线图)
 */

import Chart from '@/core/chart';
import { getLength, getTotal } from '@/lib/help';
import { enumRenderType, IConfig, IPoint, IRender } from '@/lib/interface';
import Animation from 'canvas-bezier-curve';

export default class Line extends Chart {
    private data: number[];

    private pointList: IPoint[] = [];

    constructor(config: IConfig) {
        super(config);
    }

    public update(data: number[]): Chart {
        this.data = data;

        const marginX: number =
            (this.config.width - this.margin * 2) / (this.data.length - 1);
        const maxY: number = Math.max(...this.data);
        const minY: number = Math.min(...this.data);
        const rateY: number =
            maxY !== minY
                ? (this.config.height - this.margin * 2) / (maxY - minY)
                : 1;
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
                            'ease-in-out',
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
                    'ease-in-out',
                ).getList(this.config.framePerSecond);
            }
            this.renderAttr.lengthList = lengthList;
            this.renderAttr.frameList = frameList;
        }

        this.pointList = pointList;

        return this;
    }

    public render(): Chart {
        this.reset();
        this.ctx.save();
        this.axiesChange();
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = this.config.color;
        this.ctx.lineWidth = this.config.lineWidth;
        this.ctx.beginPath();
        if (this.config.renderType === enumRenderType.none) {
            for (const p of this.pointList) {
                this.ctx.lineTo(p.x, p.y);
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

    private frameRender(obj: IRender): void {
        requestAnimationFrame(() => {
            if (!obj.frameList.length) {
                return;
            }
            const len: number = obj.frameList.shift();
            const p: IPoint[] = this.getPointByFrame(len, obj.lengthList);

            this.reset();
            this.ctx.lineCap = 'round';
            this.ctx.strokeStyle = this.config.color;
            this.ctx.lineWidth = this.config.lineWidth;
            this.axiesChange();
            this.ctx.beginPath();

            for (const i of p) {
                this.ctx.lineTo(i.x, i.y);
            }
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
            if (obj.frameList.length) {
                this.frameRender(obj);
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
