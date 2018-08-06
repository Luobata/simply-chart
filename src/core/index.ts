/**
 * @description entry core
 */

import Animation from 'canvas-bezier-curve';
import { IConfig } from 'Lib/interface';

enum enumRenderType {
    'point',
    'total',
}

export default class Chart {
    private dom: HTMLElement;
    private config: IConfig;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private pixelRatio: number;
    private data: number[];
    private margin: number = 2;
    private renderType: enumRenderType;

    constructor(config: IConfig) {
        this.config = config;
        this.defaultValue();

        this.canvasInit();

        this.dom.appendChild(this.canvas);

        console.log(new Animation(200, 400, 2, '.68,0 ,1, 1').getList(60));
    }

    public update(data: number[]): Chart {
        this.data = data;

        return this;
    }

    public reset(): void {
        this.canvas.height = this.canvas.height;
    }

    public render(): Chart {
        const marginX: number =
            (this.config.width - this.margin * 2) / (this.data.length - 1);
        const maxY: number = Math.max(...this.data);
        const minY: number = Math.min(...this.data);
        const rateY: number =
            maxY !== minY
                ? (this.config.height - this.margin * 2) / (maxY - minY)
                : 1;
        this.reset();
        this.ctx.save();
        this.axiesChange();
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = this.config.color;
        this.ctx.lineWidth = this.config.lineWidth;
        this.ctx.beginPath();
        // this.ctx.moveTo(0, 0);

        for (let i: number = 0; i < this.data.length; i = i + 1) {
            this.ctx.lineTo(
                i * marginX * this.pixelRatio,
                (this.data[i] - minY) * rateY * this.pixelRatio,
            );
        }

        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();

        return this;
    }

    // 参数默认值
    private defaultValue(): void {
        this.config.color = this.config.color || 'blue';
        this.config.lineWidth = this.config.lineWidth || 5;
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
