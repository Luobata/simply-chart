/**
 * @description entry core
 */

import Animation from 'canvas-bezier-curve';
import { IConfig, IPoint, IPointList } from 'Lib/interface';

enum enumRenderType {
    none = 'none',
    point = 'point',
    total = 'total',
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
    private renderList: IPointList = { x: [], y: [] };

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
                // console.log(new Animation(200, 400, 2, '.68,0 ,1, 1').getList(60));
            }
            console.log(this.renderList);
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
        }

        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();

        return this;
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

        this.renderList.x = this.renderList.x.concat(x);
        this.renderList.y = this.renderList.y.concat(y);
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
