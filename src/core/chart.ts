/**
 * @desc Chart
 */
import { Config, enumRenderType, IConfig } from '@/lib/interface';

export default class Chart {
    protected dom: HTMLElement;
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected animation: boolean = false;
    protected pixelRatio: number;
    protected config: Config;

    constructor(config: IConfig) {
        this.config = new Config(config);
        this.canvasInit();
        this.animation = this.config.renderType !== enumRenderType.none;
        this.insert();
    }

    protected insert(): void {
        this.dom.appendChild(this.canvas);
    }

    protected reset(): void {
        this.canvas.height = this.canvas.height;
    }

    protected axiesChange(): void {
        // 重新处理这段 没有居中
        this.ctx.scale(1, -1);
        this.ctx.translate(
            this.config.padding,
            -this.config.height * this.pixelRatio + this.config.padding,
        );
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
}
