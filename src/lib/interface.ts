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
    dom?: string | HTMLElement;
    canvas?: HTMLCanvasElement;
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

type ChartConf<T> = {
    base: IBaseConfig;
    attr: T;
};

type ChartConfig<T> = IBaseConfig & T;

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
export type ILineConf = ChartConf<ILine>;

// line conifg for module Line
export type ILineConfig = ChartConfig<ILine>;

// bar config
export interface IBar {
    barWidth?: number;
    barRadius?: number;
    colors?: string[];
}

// bar cofnig for input
export type IBarConf = ChartConf<IBar>;

// bar config for module Bar
export type IBarConfig = ChartConfig<IBar>;

export interface IPie {
    // 颜色
    colors?: string[];
    // 是否实心 true 实心
    fill?: boolean;
}

export type IPieConf = ChartConf<IPie>;

export type IPieConfig = ChartConfig<IPie>;

export interface IRadius {
    // 颜色
    color: string;
    // 圈颜色
    pieColor: string;
}

export type IRadiusConf = ChartConf<IRadius>;

export type IRadiusConfig = ChartConfig<IRadius>;

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

export type IConfig = ILineConfig | IBarConfig | IPieConfig | IRadiusConfig;
export type IConf = ILineConf | IBarConf | IPieConf | IRadiusConf;
export type IBase = ILine | IBar | IPie | IRadius;
