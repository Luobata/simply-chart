/**
 * @description entry core
 */

import { IConfig } from 'Lib/interface';

export default class Chart {
    private dom: HTMLElement;
    private config: IConfig;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private pixelRatio: number;
    private data: number[];

    constructor(config: IConfig) {
        this.config = config;
        this.defaultValue();

        this.canvasInit();

        this.dom.appendChild(this.canvas);
    }

    public update(data: number[]): Chart {
        this.data = data;

        return this;
    }

    public reset(): void {
        this.canvas.height = this.canvas.height;
    }

    public render(): Chart {
        const marginX: number = this.config.width / (this.data.length - 1);
        const maxY: number = Math.max(...this.data);
        const rateY: number = this.config.height / maxY;
        this.reset();
        this.ctx.save();
        this.ctx.fillStyle = this.config.color;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);

        for (let i: number = 0; i < this.data.length; i = i + 1) {
            this.ctx.lineTo(i * marginX, this.data[i] * rateY);
        }

        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();

        return this;
    }

    // 参数默认值
    private defaultValue(): void {
        this.config.color = this.config.color || 'blue';
    }

    private canvasInit(): void {
        this.dom = document.querySelector(this.config.dom);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.pixelRatio = window.devicePixelRatio;

        this.canvas.width = this.config.width * this.pixelRatio;
        this.canvas.height = this.config.height * this.pixelRatio;

        this.canvas.style.width = `${this.config.width}px`;
        this.canvas.style.height = `${this.config.height}px`;
    }
}
