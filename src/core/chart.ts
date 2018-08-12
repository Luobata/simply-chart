/**
 * @desc Chart
 */
import { Config, IConfig, IRender } from '@/lib/interface';

export default class Chart {
    protected dom: HTMLElement;
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected animation: boolean = false;
    protected pixelRatio: number;
    protected margin: number = 2;
    protected config: Config;

    protected renderAttr: IRender = {
        lengthList: [],
        frameList: [],
    };

    constructor(config: IConfig) {
        this.config = new Config(config);
        this.canvasInit();
    }

    protected insert(): void {
        this.dom.appendChild(this.canvas);
    }

    protected reset(): void {
        this.canvas.height = this.canvas.height;
    }

    protected axiesChange(): void {
        this.ctx.scale(1, -1);
        this.ctx.translate(
            this.margin,
            -this.config.height * this.pixelRatio + this.margin,
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
