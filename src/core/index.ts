/**
 * @description entry core
 */

import { IConfig } from 'Lib/interface';

export default class {
    private config: IConfig;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private pixelRatio: number;

    constructor(config: IConfig) {
        this.config = config;
        this.default();

        this.canvasInit();
    }

    // 参数默认值
    private default(): void {
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

    private screenInit(): void {}
}
