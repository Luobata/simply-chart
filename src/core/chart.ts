/**
 * @desc Chart
 */
import {
    enumRenderType,
    IBase,
    IBaseConfig,
    IConf,
    IConfig,
} from '@/lib/interface';
import { addDebuggerData, hookInstall } from 'Lib/hook';

const baseDefault: IBaseConfig = {
    // dom: '',
    width: 200,
    height: 100,
    padding: 10,
    forceFit: false,
    renderType: enumRenderType.none,
    renderTime: 2,
    renderCurve: 'ease-in-out',
    framePerSecond: 60,
};

let id: number = 0;

/**
 * default class
 */
export default class Chart {
    public id: number;
    public name: string;

    protected dom: HTMLElement;
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected animation: boolean = false;
    protected pixelRatio: number;
    protected config: IConfig;

    constructor(config: IConf, defaultConf: IBase) {
        this.config = {
            ...baseDefault,
            ...defaultConf,
            ...config.base,
            ...config.attr,
        };

        this.start();
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
            this.config.padding * this.pixelRatio,
            (-this.config.height + this.config.padding) * this.pixelRatio,
        );
    }

    private start(): void {
        this.domInit();
        this.boundClinentInit();
        // this.config = new Config(config);
        this.canvasInit();
        this.animation = this.config.renderType !== enumRenderType.none;
        this.insert();

        this.getName();
        hookInstall();
        addDebuggerData(this);
    }

    private boundClinentInit(): void {
        if (this.config.forceFit) {
            this.config.width = this.dom.getBoundingClientRect().width;
        }
        this.config.innerWidth = this.config.width - this.config.padding * 2;
        this.config.innerHeight = this.config.height - this.config.padding * 2;
    }

    private domInit(): void {
        if (this.config.dom === undefined) {
            // for test ?
            this.dom = document.createElement('div');
            document.body.appendChild(this.dom);
        } else if (typeof this.config.dom === 'string') {
            this.dom = document.querySelector(this.config.dom);
        } else {
            this.dom = this.config.dom;
        }
    }

    private canvasInit(): void {
        this.canvas = this.config.canvas || document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.pixelRatio = window.devicePixelRatio;

        this.canvas.width = this.config.width * this.pixelRatio;
        this.canvas.height = this.config.height * this.pixelRatio;

        this.canvas.style.width = `${this.config.width}px`;
        this.canvas.style.height = `${this.config.height}px`;
    }

    private getName(): void {
        this.id = id;
        id = id + 1;
        this.name = `${this.constructor.name}_${this.id}`;
    }
}
