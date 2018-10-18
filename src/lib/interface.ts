/**
 * @description interface
 */
export enum enumRenderType {
    none = 'none',
    point = 'point',
    total = 'total',
}

// basic chart cofnig
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

// line config
export interface ILine {
    lineWidth?: number;
    color?: string;
    point?: boolean;
    pointRadius?: number;
    pointFill?: boolean;
    smooth?: boolean;
    shadowColor?: string;
}

// line config for input
export interface ILineConf {
    base: IBaseConfig;
    attr: ILine;
}

// line conifg for module Line
export type ILineConfig = IBaseConfig & ILine;

// bar config
export interface IBar {
    barWidth?: number;
    barRadius?: number;
    colors?: string[];
}

// bar cofnig for input
export interface IBarConf {
    base: IBaseConfig;
    attr: IBar;
}

// bar config for module Bar
export type IBarConfig = IBaseConfig & IBar;

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
