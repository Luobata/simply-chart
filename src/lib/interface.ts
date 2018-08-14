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
    public renderType?: string = enumRenderType.none;
    public renderTime?: number = 2;
    public renderCurve?: string = 'ease-in-out';
    public framePerSecond?: number = 60;

    // attr line
    public color?: string = 'blue';
    public lineWidth?: number = 5;

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
    renderType?: string;
    renderTime?: number;
    renderCurve?: string;
    framePerSecond?: number;
}

export interface ILineConfig {
    lineWidth?: number;
    color?: string;
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
