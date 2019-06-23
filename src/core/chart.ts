/**
 * @desc Chart
 */
// import IResize from '@/@types/resize';
import {
    enumRenderType,
    IBase,
    IBaseConfig,
    IConf,
    IConfig,
} from '@/lib/interface';
import { addDebuggerData, hookInstall } from 'Lib/hook';
import { delay } from 'Lib/util';

// import { addResizeListener } from 'Lib/resize.js';
// tslint:disable-next-line
const resizeEvent = require('Lib/resize.js');

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
export default abstract class Chart {
    public id: number;
    public name: string;

    protected dom: HTMLElement;
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected animation: boolean = false;
    // 停止动画 用来控制动画中途变化
    protected stopAnimation: boolean = false;
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

    public abstract reRender(): void;

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
        this.resizeEvent();
    }

    private resizeEvent(): void {
        if (this.config.forceFit) {
            // TODO 这里有个逻辑，第一次一定会先触发一次，是不是先hack掉 第二次再触发
            let isFirst: boolean = true;
            resizeEvent.addResizeListener(
                this.dom,
                delay(
                    500,
                    (): void => {
                        if (isFirst) {
                            isFirst = false;

                            return;
                        }
                        this.boundClinentInit();
                        this.setCanvas();
                        this.reRender();
                        //  TODO re-render
                        console.log(1);
                    },
                ),
            );
            // window.addEventListener(
            //     'resize',
            //     throttle(
            //         2000,
            //         (): void => {
            //             console.log(2);
            //             this.reRender();
            //         },
            //     ),
            // );
        }
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

        this.setCanvas();
    }

    private setCanvas(): void {
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
