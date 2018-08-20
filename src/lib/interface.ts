/**
 * @description interface
 */
export enum enumRenderType {
    none = 'none',
    point = 'point',
    total = 'total',
}

export class Config {
    // basic
    public dom: HTMLElement;
    public width?: number = 200;
    public height?: number = 100;
    public innerWidth: number;
    public innerHeight: number;
    public padding?: number = 10;
    public renderType?: string = enumRenderType.none;
    public renderTime?: number = 2;
    public renderCurve?: string = 'ease-in-out';
    public framePerSecond?: number = 60;

    // attr line
    public color?: string = 'blue';
    public lineWidth?: number = 5;
    public point?: boolean = false;
    public pointRadius?: number = 3;
    public pointFill?: boolean = false;

    // attr bar
    public barWidth?: number; // bar width is computed
    public barRadius?: number = 5;
    public colors?: string[] = [
        'red',
        'orange',
        'yellow',
        'green',
        'cyan',
        'blue',
        'purple',
    ]; // 定义其中颜色 如果再多 考虑随机

    constructor(config: IConfig) {
        Object.assign(this, config.base);
        Object.assign(this, config.attr);
        this.innerWidth = this.width - this.padding * 2;
        this.innerHeight = this.height - this.padding * 2;
    }
}

export interface IConfig {
    base: IBaseConfig;
    attr: ILineConfig | IBarConfig;
}

export interface IBaseConfig {
    dom: string | HTMLElement;
    width?: number;
    height?: number;
    innerWidth?: number;
    innerHeight?: number;
    padding?: number;
    renderType?: string;
    renderTime?: number;
    renderCurve?: string;
    framePerSecond?: number;
}

export interface ILineConfig {
    lineWidth?: number;
    color?: string;
    point?: boolean;
    pointRadius?: number;
    pointFill?: boolean;
}

export interface IBarConfig {
    barWidth?: number;
    barRadius?: number;
    colors?: string[];
}

export interface IPoint {
    x: number;
    y: number;
}

export interface IPointList {
    x: number[];
    y: number[];
}

export interface IRender {
    lengthList: number[];
    frameList: number[];
}
