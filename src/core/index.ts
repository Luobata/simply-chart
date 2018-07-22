/**
 * @description entry core
 */

import { IConfig } from 'Lib/interface';

export default class {
    private config: IConfig;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private pixelRatio: number;
    private data: number[];

    constructor(config: IConfig) {
        this.config = config;
        this.defaultValue();

        this.canvasInit();
    }

    public update(data: number[]): void {
        this.data = data;
    }

    public reset(): void {
        this.canvas.height = this.canvas.height;
    }

    public render(): void {
        const marginX: number = this.config.width / (this.data.length - 1);
        const maxY: number = Math.max(...this.data);
        const rateY: number = this.config.height / maxY;
        this.reset();
        this.ctx.save();
        this.ctx.fillStyle = this.config.color;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);

        for (let i: nubmer = 0; i < this.data.length; i = i + 1) {
            this.ctx.lineTo(i * marginX, this.data[i] * rateY);
        }

        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }

    // 参数默认值
    private defaultValue(): void {
        this.config.color = this.config.color || 'blue';
    }

    private canvasInit(): void {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.pixelRatio = window.devicePixelRatio;

        this.canvas.width = this.config.width * this.pixelRatio;
        this.canvas.height = this.config.height * this.pixelRatio;

        this.canvas.style.width = `${this.config.width}px`;
        this.canvas.style.height = `${this.config.height}px`;
    }
}
