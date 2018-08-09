/**
 * @description entry core
 */

import Animation from 'canvas-bezier-curve';
import { getLength, getTotal } from 'Lib/help';
import { IConfig, IPoint, IPointList } from 'Lib/interface';
import Vector from '@/lib/Vector';

enum enumRenderType {
    none = 'none',
    point = 'point',
    total = 'total',
}

interface IRenderTotal {
    lengthList: number[];
    frameList: number[];
}

export default class Chart {
    private dom: HTMLElement;
    private config: IConfig;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private pixelRatio: number;
    private data: number[];
    private margin: number = 2;
    // private renderType: enumRenderType = enumRenderType.none;
    // private renderTime: number = 2; // 动画执行时间 单位s

    private pointList: IPoint[] = [];
    // private renderList: IPointList = { x: [], y: [] };
    private renderList: IPoint[] = [];

    private renderTotal: IRenderTotal = {
        lengthList: [],
        frameList: [],
    };

    constructor(config: IConfig) {
        this.config = config;
        this.defaultValue();

        this.canvasInit();

        this.dom.appendChild(this.canvas);

        // console.log(new Animation(200, 400, 2, '.68,0 ,1, 1').getList(60));
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

        for (let i: number = 0; i < this.data.length; i = i + 1) {
            const p: IPoint = {
                x: i * marginX * this.pixelRatio,
                y: (this.data[i] - minY) * rateY * this.pixelRatio,
            };
            pointList.push(p);
        }

        if (this.config.renderType === enumRenderType.point) {
            for (let i: number = 1; i < pointList.length; i = i + 1) {
                this.getList(pointList[i - 1], pointList[i]);
            }
        } else if (this.config.renderType === enumRenderType.total) {
            // 把所有的一起list
            const lengthList: number[] = [];
            for (let i: number = 1; i < pointList.length; i = i + 1) {
                lengthList.push(getLength(pointList[i - 1], pointList[i]));
            }
            this.renderTotal.lengthList = lengthList;
            this.renderTotal.frameList = new Animation(
                0,
                getTotal(lengthList),
                this.config.renderTime,
                'ease-in',
            ).getList(this.config.framePerSecond);
        }

        this.pointList = pointList;

        return this;
    }

    public reset(): void {
        this.canvas.height = this.canvas.height;
    }

    public render(): Chart {
        this.reset();
        this.ctx.save();
        this.axiesChange();
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = this.config.color;
        this.ctx.lineWidth = this.config.lineWidth;
        this.ctx.beginPath();
        // this.ctx.moveTo(0, 0);
        if (this.config.renderType === enumRenderType.none) {
            for (const p of this.pointList) {
                this.ctx.lineTo(p.x, p.y);
            }
        } else if (this.config.renderType === enumRenderType.point) {
            this.frameRender();
        } else if (this.config.renderType === enumRenderType.total) {
            this.totalFrameRender();
        }

        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();

        return this;
    }

    private totalFrameRender(): void {
        requestAnimationFrame(() => {
            const len: number = this.renderTotal.frameList.shift();
            const p: IPoint = this.getPointByFrame(len);

            this.ctx.lineCap = 'round';
            this.ctx.strokeStyle = this.config.color;
            this.ctx.lineWidth = this.config.lineWidth;
            // this.ctx.beginPath();
            this.ctx.lineTo(p.x, p.y);
            this.ctx.stroke();
            // this.ctx.closePath();
            this.ctx.restore();
            if (this.renderTotal.frameList.length) {
                this.totalFrameRender();
            }
        });
    }

    private frameRender(): void {
        requestAnimationFrame(() => {
            const p: IPoint = this.renderList.shift();
            this.ctx.lineCap = 'round';
            this.ctx.strokeStyle = this.config.color;
            this.ctx.lineWidth = this.config.lineWidth;
            // this.ctx.beginPath();
            this.ctx.lineTo(p.x, p.y);
            this.ctx.stroke();
            // this.ctx.closePath();
            this.ctx.restore();
            if (this.renderList.length) {
                this.frameRender();
            }
        });
    }

    private getPointByFrame(len: number): IPoint {
        let index!: number;
        let last: number = 0;

        // 找到对应的片段 比如 找到 index 0 那这个点就在 Point 0 1 之间
        for (
            let i: number = 0;
            i < this.renderTotal.lengthList.length;
            i = i + 1
        ) {
            if (len <= this.renderTotal.lengthList[i] + last) {
                index = i;
                break;
            } else {
                last += this.renderTotal.lengthList[i];
            }
        }

        const val: number = this.renderTotal.lengthList[index];
        const rate: number = (len - last) / val;

        return {
            x:
                this.pointList[index].x +
                (this.pointList[index + 1].x - this.pointList[index].x) * rate,
            y:
                this.pointList[index].y +
                (this.pointList[index + 1].y - this.pointList[index].y) * rate,
        };
    }

    private getList(p1: IPoint, p2: IPoint): void {
        const time: number = 2;
        const frame: number = 60;
        const x: number[] = new Animation(p1.x, p2.x, time, 'liner').getList(
            frame,
        );
        const y: number[] = new Animation(p1.y, p2.y, time, 'liner').getList(
            frame,
        );

        for (let i: number = 0; i < x.length; i = i + 1) {
            this.renderList.push({ x: x[i], y: y[i] });
        }

        // this.renderList.x = this.renderList.x.concat(x);
        // this.renderList.y = this.renderList.y.concat(y);
    }

    // 参数默认值
    private defaultValue(): void {
        this.config.color = this.config.color || 'blue';
        this.config.lineWidth = this.config.lineWidth || 5;
        this.config.renderType = this.config.renderType || enumRenderType.none;
        this.config.renderTime = this.config.renderTime || 2;
        this.config.framePerSecond = this.config.framePerSecond || 60;
    }

    private canvasInit(): void {
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

        this.canvas.style.width = `${this.config.width}px`;
        this.canvas.style.height = `${this.config.height}px`;
    }

    private axiesChange(): void {
        this.ctx.scale(1, -1);
        this.ctx.translate(
            this.margin,
            -this.config.height * this.pixelRatio + this.margin,
        );
    }
}
